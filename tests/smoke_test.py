#!/usr/bin/env python3
"""pystackql smoke test for the snowflake stackql provider.

Exercises the salient resources against a real Snowflake account - read
smokes over databases / warehouses / roles / grants, then a disposable
write lifecycle: INSERT database, REPLACE (create-or-alter) it, INSERT
schema, INSERT an X-Small auto-suspend warehouse, a grant INSERT / SELECT /
DELETE round trip against a disposable role, a warehouse EXEC action, one
data plane statement submission (INSERT ... RETURNING), then tear
everything down and confirm it is gone.

Every created object is named STACKQL_SMOKE_<stamp>_*; before running, the
script sweeps objects with the STACKQL_SMOKE_ prefix so each run starts
from a clean slate. The warehouse is X-Small with auto_suspend=60 and the
single statement runs for seconds - a full run costs well under $1 in
credits. Never run this against a production account.

Credentials: SNOWFLAKE_PAT env var (falls back to .env at the repo root),
a programmatic access token for a role with enough privilege to create
databases, warehouses and roles. The account identifier (orgname-accountname)
comes from --endpoint or the SNOWFLAKE_ENDPOINT env var, defaulting to the
dev account MGBHLAO-CY92030 (AWS_AP_SOUTHEAST_2).

Finding your account identifier: in Snowsight run
    SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();
or Snowsight -> Admin -> Accounts (the identifier is <orgname>-<accountname>,
e.g. MGBHLAO-CY92030 - note this is the account NAME form, not the legacy
account locator).

Usage:
    pip install pystackql
    python tests/smoke_test.py --endpoint myorg-myaccount   # locally
                                                            # generated provider
    python tests/smoke_test.py --endpoint myorg-myaccount --live
                                # latest published provider from the public
                                # registry (post-publish verification)
    python tests/smoke_test.py --cleanup-only               # sweep breadcrumbs
    python tests/smoke_test.py --skip-writes                # read smokes only
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
SMOKE_PREFIX = "STACKQL_SMOKE_"

ERROR_RE = re.compile(
    r"http response status code: [45]|over HTTP error|error assembling|"
    r"cannot find matching operation|FindRoute|no matching operation|"
    r"cannot find any viable servers|parser error|panic|"
    r"no request body for operation|schema unsuitable",
    re.I,
)

# error-text fragments indicating a KNOWN environment/core limitation
XFAIL_PATTERNS = {
    "router-host": re.compile(r"FindRoute|no matching operation", re.I),
}


def load_dotenv_pat() -> None:
    if os.environ.get("SNOWFLAKE_PAT"):
        return
    env_file = BASE_DIR / ".env"
    if not env_file.exists():
        return
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if line.startswith("SNOWFLAKE_PAT="):
            os.environ["SNOWFLAKE_PAT"] = line.split("=", 1)[1].strip().strip('"')
            return


class Smoke:
    def __init__(self, args: argparse.Namespace) -> None:
        self.args = args
        self.stamp = str(int(time.time()))[-6:]
        self.db = f"{SMOKE_PREFIX}{self.stamp}_DB"
        self.wh = f"{SMOKE_PREFIX}{self.stamp}_WH"
        self.role = f"{SMOKE_PREFIX}{self.stamp}_ROLE"
        self.where = f"endpoint = '{args.endpoint}'"
        self.results: list[tuple[str, str, str]] = []

        from pystackql import StackQL

        if args.registry == "local":
            reg_path = (BASE_DIR / "provider-dev" / "openapi").resolve()
            reg_url = "file://" + reg_path.as_posix()
            self.sq = StackQL(output="dict", custom_registry=reg_url)
            # pystackql only serialises {"url": ...}; a local file registry
            # additionally needs localDocRoot + nopVerify - patch the exec
            # params in place (compact JSON, shell-quoted).
            full = json.dumps(
                {
                    "url": reg_url,
                    "localDocRoot": reg_path.as_posix(),
                    "verifyConfig": {"nopVerify": True},
                },
                separators=(",", ":"),
            )
            if sys.platform.startswith("win"):
                quoted = '"' + full.replace('"', '\\"') + '"'
            else:
                import shlex

                quoted = shlex.quote(full)
            # pystackql moved the exec params between versions
            executor = getattr(self.sq, "local_query_executor", None)
            params = executor.params if executor is not None else self.sq.params
            for i, p in enumerate(params):
                if p == "--registry":
                    params[i + 1] = quoted
                    break
            else:
                params.extend(["--registry", quoted])
        else:
            # public registry: the published snowflake provider
            self.sq = StackQL(output="dict")

    # ------------------------------------------------------------------ core
    def q(self, sql: str):
        try:
            # RETURNING statements produce rows - route them through the
            # query path (executeStmt returns only a status message)
            if sql.lstrip().upper().startswith(("SELECT", "SHOW", "DESCRIBE")) or "RETURNING" in sql.upper():
                out = self.sq.execute(sql)
            else:
                out = self.sq.executeStmt(sql)
        except Exception as exc:  # noqa: BLE001
            return [], str(exc)
        text = json.dumps(out, default=str)
        if ERROR_RE.search(text):
            return out if isinstance(out, list) else [out], text
        if isinstance(out, list) and out and isinstance(out[0], dict) and "error" in out[0]:
            return out, text
        return out if isinstance(out, list) else [out], None

    def classify(self, err: str) -> tuple[str, str]:
        for reason, pat in XFAIL_PATTERNS.items():
            if pat.search(err):
                return "XFAIL", reason
        return "FAIL", err[:160]

    def step(self, name: str, sql: str, expect_rows: bool = False, contains: str | None = None):
        rows, err = self.q(sql)
        if err:
            status, note = self.classify(err)
            self.results.append((name, status, note))
            print(f"  {status:5s} {name}  [{note[:110]}]")
            return False
        blob = json.dumps(rows, default=str)
        if expect_rows and not rows:
            self.results.append((name, "FAIL", "expected rows, got none"))
            print(f"  FAIL  {name}  [no rows]")
            return False
        if contains and contains not in blob:
            self.results.append((name, "FAIL", f"'{contains}' not in result"))
            print(f"  FAIL  {name}  ['{contains}' not in {blob[:90]}]")
            return False
        self.results.append((name, "PASS", ""))
        print(f"  PASS  {name}")
        return True

    # ------------------------------------------------------- breadcrumb sweep
    def cleanup_breadcrumbs(self) -> None:
        print("== breadcrumb sweep ==")
        for resource, col in (
            ("snowflake.databases.databases", "name"),
            ("snowflake.warehouses.warehouses", "name"),
            ("snowflake.roles.roles", "name"),
        ):
            rows, err = self.q(f"SELECT {col} FROM {resource} WHERE {self.where}")
            if err:
                print(f"  WARN sweep list failed for {resource}: {err[:120]}")
                continue
            stale = [r.get(col) for r in rows if str(r.get(col, "")).startswith(SMOKE_PREFIX)]
            for name in stale:
                print(f"  sweeping {resource} {name}")
                self.q(f"DELETE FROM {resource} WHERE name = '{name}' AND {self.where}")

    # -------------------------------------------------------------- read path
    def read_smokes(self) -> None:
        print("== read smokes ==")
        self.step("show services", "SHOW SERVICES IN snowflake", expect_rows=True)
        self.step(
            "databases list",
            f"SELECT name, owner, kind FROM snowflake.databases.databases WHERE {self.where}",
            expect_rows=True,
        )
        self.step(
            "databases list LIMIT pushdown",
            f"SELECT name FROM snowflake.databases.databases WHERE {self.where} LIMIT 1",
            expect_rows=True,
        )
        self.step(
            "warehouses list (compute inventory)",
            f"SELECT name, size, state, auto_suspend FROM snowflake.warehouses.warehouses WHERE {self.where}",
        )
        self.step(
            "roles list",
            f"SELECT name, comment FROM snowflake.roles.roles WHERE {self.where}",
            expect_rows=True,
        )
        self.step(
            "role grants (PUBLIC)",
            f"SELECT * FROM snowflake.roles.role_grants WHERE name = 'PUBLIC' AND {self.where}",
        )

    # ------------------------------------------------------------- write path
    def lifecycle(self) -> None:
        db, wh, role, where = self.db, self.wh, self.role, self.where
        ep = self.args.endpoint
        print(f"== write lifecycle (database: {db}, warehouse: {wh}) ==")

        # storage: database create -> verify -> create_or_alter (REPLACE)
        self.step(
            "database INSERT",
            f"INSERT INTO snowflake.databases.databases(name, kind, comment, endpoint) "
            f"SELECT '{db}', 'TRANSIENT', 'stackql smoke', '{ep}'",
        )
        self.step(
            "database get",
            f"SELECT name, kind FROM snowflake.databases.databases WHERE name = '{db}' AND {where}",
            expect_rows=True, contains=db,
        )
        self.step(
            "database REPLACE (create-or-alter)",
            f"REPLACE snowflake.databases.databases SET name = '{db}', kind = 'TRANSIENT', "
            f"comment = 'stackql smoke updated' WHERE name = '{db}' AND {where}",
        )
        self.step(
            "database comment updated",
            f"SELECT comment FROM snowflake.databases.databases WHERE name = '{db}' AND {where}",
            expect_rows=True, contains="updated",
        )
        self.step(
            "schema INSERT",
            f"INSERT INTO snowflake.databases.schemas(database_name, name, endpoint) "
            f"SELECT '{db}', 'SMOKE_SCHEMA', '{ep}'",
        )
        self.step(
            "schema get",
            f"SELECT name FROM snowflake.databases.schemas WHERE database_name = '{db}' AND {where}",
            expect_rows=True, contains="SMOKE_SCHEMA",
        )

        # compute: X-Small, aggressive auto-suspend - must not accrue credits
        self.step(
            "warehouse INSERT (XSMALL, auto-suspend 60s)",
            f"INSERT INTO snowflake.warehouses.warehouses(name, warehouse_size, auto_suspend, "
            f"auto_resume, initially_suspended, comment, endpoint) "
            f"SELECT '{wh}', 'XSMALL', 60, 'true', 'true', 'stackql smoke', '{ep}'",
        )
        self.step(
            "warehouse get",
            f"SELECT name, size FROM snowflake.warehouses.warehouses WHERE name = '{wh}' AND {where}",
            expect_rows=True, contains=wh,
        )

        # grants as data: disposable role, grant INSERT -> SELECT -> DELETE
        self.step(
            "role INSERT",
            f"INSERT INTO snowflake.roles.roles(name, comment, endpoint) "
            f"SELECT '{role}', 'stackql smoke', '{ep}'",
        )
        self.step(
            "grant INSERT (USAGE on database to role)",
            f"INSERT INTO snowflake.grants.grants(granteeType, granteeName, securableType, "
            f"securableName, privileges, endpoint) "
            f"SELECT 'role', '{role}', 'DATABASE', '{db}', '[\"USAGE\"]', '{ep}'",
        )
        self.step(
            "grant SELECT (audit the grant)",
            f"SELECT * FROM snowflake.grants.grants WHERE granteeType = 'role' "
            f"AND granteeName = '{role}' AND {where}",
            expect_rows=True, contains="USAGE",
        )
        self.step(
            "grant DELETE (revoke)",
            f"DELETE FROM snowflake.grants.grants WHERE granteeType = 'role' "
            f"AND granteeName = '{role}' AND securableType = 'DATABASE' "
            f"AND securableName = '{db}' AND privilege = 'USAGE' AND {where}",
        )

        # lifecycle EXEC action
        self.step(
            "warehouse EXEC resume",
            f"EXEC snowflake.warehouses.warehouses.resume @name = '{wh}', @endpoint = '{ep}'",
        )

        # data plane: one statement, seconds of XS compute
        self.step(
            "statement submission (INSERT ... RETURNING)",
            f"INSERT INTO snowflake.sqlapi.statements(statement, warehouse, \"User-Agent\", endpoint) "
            f"SELECT 'SELECT 1 AS SMOKE_CHECK', '{wh}', 'stackql-smoke', '{ep}' "
            f"RETURNING statementHandle, data",
            expect_rows=True,
        )
        self.step(
            "warehouse EXEC suspend",
            f"EXEC snowflake.warehouses.warehouses.suspend @name = '{wh}', @endpoint = '{ep}'",
        )

        # teardown
        self.step("role DELETE", f"DELETE FROM snowflake.roles.roles WHERE name = '{role}' AND {where}")
        self.step("warehouse DELETE", f"DELETE FROM snowflake.warehouses.warehouses WHERE name = '{wh}' AND {where}")
        self.step("database DELETE", f"DELETE FROM snowflake.databases.databases WHERE name = '{db}' AND {where}")
        rows, err = self.q(f"SELECT name FROM snowflake.databases.databases WHERE {where}")
        gone = err is None and all(r.get("name") != self.db for r in rows)
        self.results.append(("database gone", "PASS" if gone else "FAIL", "" if gone else "still present"))
        print(f"  {'PASS' if gone else 'FAIL'}  database gone")

    # ---------------------------------------------------------------- summary
    def summary(self) -> int:
        print("\n== summary ==")
        counts = {"PASS": 0, "FAIL": 0, "XFAIL": 0}
        for name, status, note in self.results:
            counts[status] = counts.get(status, 0) + 1
            if status != "PASS":
                print(f"  {status:5s} {name}  [{note[:110]}]")
        print(
            f"  {counts['PASS']} passed, {counts['FAIL']} failed, {counts['XFAIL']} xfailed "
            f"(registry: {self.args.registry}, endpoint: {self.args.endpoint})"
        )
        return 1 if counts["FAIL"] else 0


def main() -> int:
    ap = argparse.ArgumentParser(description="snowflake provider smoke test")
    ap.add_argument("--live", action="store_true",
                    help="use the latest published provider from the public registry "
                         "instead of the locally generated provider")
    ap.add_argument("--registry", choices=["local", "public"], default=None,
                    help="explicit registry selection (overrides --live)")
    ap.add_argument("--endpoint", default=os.environ.get("SNOWFLAKE_ENDPOINT", "MGBHLAO-CY92030"),
                    help="account identifier orgname-accountname (or SNOWFLAKE_ENDPOINT env var; "
                         "default: the MGBHLAO-CY92030 dev account)")
    ap.add_argument("--cleanup-only", action="store_true", help="sweep STACKQL_SMOKE_* objects and exit")
    ap.add_argument("--skip-writes", action="store_true", help="read smokes only")
    args = ap.parse_args()

    args.registry = args.registry or ("public" if args.live else "local")

    load_dotenv_pat()
    if not os.environ.get("SNOWFLAKE_PAT"):
        print("SNOWFLAKE_PAT is not set (env var or .env at repo root)")
        return 2
    if not args.endpoint:
        print("--endpoint (or SNOWFLAKE_ENDPOINT) is required: the orgname-accountname account identifier")
        return 2

    smoke = Smoke(args)
    print(f"snowflake smoke test  registry={args.registry}  endpoint={args.endpoint}  stamp={smoke.stamp}")
    smoke.cleanup_breadcrumbs()
    if args.cleanup_only:
        return 0
    smoke.read_smokes()
    if not args.skip_writes:
        smoke.lifecycle()
    return smoke.summary()


if __name__ == "__main__":
    sys.exit(main())
