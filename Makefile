# StackQL snowflake provider build pipeline.
#
# Every step is deterministic and re-runnable; manual mapping decisions live
# in provider-dev/scripts, never in hand-edited artifacts. `make all` runs
# the full chain: vendor specs -> split service specs -> mappings ->
# normalized specs -> generated provider -> tests -> docs.
#
# Requirements: Node >= 20, a stackql binary ($STACKQL, ./stackql or on
# PATH), Python 3 + pystackql for the smoke suite, yarn for the website.

SHELL := bash
.DEFAULT_GOAL := help

PROVIDER := snowflake
SERVICES_DIR := provider-dev/openapi/src/$(PROVIDER)
SERVERS := [{"url": "https://{endpoint}.snowflakecomputing.com", "variables": {"endpoint": {"default": "orgname-accountname", "description": "Organization and account identifier (orgname-accountname)"}}}]
PROVIDER_CONFIG := {"auth": {"type": "bearer", "credentialsenvvar": "SNOWFLAKE_PAT"}, "snake_case_aliases": true}
# NOTE: no pagination config is shipped. The vendor specs declare RFC 5988
# Link headers on list responses, but the live control plane does not emit
# them (verified against a real account), and any-sdk (stackql v0.10.582)
# hangs when a header responseToken is configured without a requestToken.
# Re-evaluate on the next any-sdk release - see NOTES.md.

.PHONY: help deps pre-process split pre-normalize mappings normalize generate post-process build \
        test-offline test-meta test-integration test smoke smoke-live docs website website-start clean all

help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-18s %s\n", $$1, $$2}'

deps: ## install node dependencies
	npm install

pre-process: ## copy vendor specs into provider-dev/source, inject shared schemas, record spec pin
	npm run pre-process

split: ## regroup pre-processed specs into consolidated service specs
	node bin/split.mjs --provider-name $(PROVIDER) --overwrite

pre-normalize: ## snowflake-specific spec adjustments (operationId dedupe)
	npm run pre-normalize

mappings: ## regenerate all_services.csv from scratch and apply the mechanical verb mappings
	rm -f provider-dev/config/all_services.csv
	npm run generate-mappings -- --provider-name $(PROVIDER) --input-dir provider-dev/source --output-dir provider-dev/config
	npm run map-operations

normalize: ## normalize the split service specs (allOf flatten, bare-array wrap, ...)
	npm run normalize -- --api-dir provider-dev/source

generate: ## generate the provider with pagination + naive request body translation
	rm -rf provider-dev/openapi/*
	npm run generate-provider -- \
	  --provider-name $(PROVIDER) \
	  --input-dir provider-dev/source \
	  --output-dir $(SERVICES_DIR) \
	  --config-path provider-dev/config/all_services.csv \
	  --servers '$(SERVERS)' \
	  --provider-config '$(PROVIDER_CONFIG)' \
	  --naive-req-body-translate \
	  --overwrite
	npm run post-process

post-process: ## re-apply generated-provider fixes (LIMIT pushdown, result schema binding)
	npm run post-process

build: pre-process split pre-normalize mappings normalize generate ## full spec -> provider pipeline

test-offline: ## quick offline validation against the local file registry
	node tests/offline_validation.mjs

test-meta: ## meta-route suite against a local stackql server
	npm run start-server
	npm run test-meta-routes -- $(PROVIDER) || (npm run stop-server; exit 1)
	npm run stop-server

test-integration: ## row-level integration tests against the mock Snowflake REST server
	npm run test-integration

test: test-offline test-integration test-meta ## all non-live test layers

smoke: ## live smoke suite with the locally generated provider (needs SNOWFLAKE_PAT)
	python tests/smoke_test.py

smoke-live: ## live smoke suite against the latest published provider
	python tests/smoke_test.py --live

docs: ## generate the website docs from the generated provider
	npm run generate-docs -- \
	  --provider-name $(PROVIDER) \
	  --provider-dir ./$(SERVICES_DIR)/v00.00.00000 \
	  --output-dir ./website \
	  --provider-data-dir ./provider-dev/docgen/provider-data
	node provider-dev/docgen/sanitize_docs.mjs

website: ## build the docusaurus microsite (vendors shared config first)
	cd website && yarn install && yarn build

website-start: ## run the docusaurus dev server
	cd website && yarn install && yarn start

clean: ## remove generated artifacts (provider output, website build)
	rm -rf provider-dev/openapi/* website/build website/.docusaurus

all: build test docs website ## everything: pipeline, tests, docs, site build
