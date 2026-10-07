#!/usr/bin/env bash
# Builds the files the on-device SQLite database needs in the browser:
#   web/db_worker.js  - web worker hosting the database
#   web/sqlite3.wasm  - SQLite compiled to WebAssembly (official release)
# Both are committed, so you only need this when upgrading Serverpod/sqlite3.
set -euo pipefail
cd "$(dirname "$0")/.."

SQLITE3_VERSION="3.7.0"

dart compile js -O4 tool/db_worker.dart -o web/db_worker.js
rm -f web/db_worker.js.deps web/db_worker.js.map

curl -fsSL -o web/sqlite3.wasm \
  "https://github.com/simolus3/sqlite3.dart/releases/download/sqlite3-${SQLITE3_VERSION}/sqlite3.wasm"
ls -lh web/db_worker.js web/sqlite3.wasm
