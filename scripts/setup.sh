#!/usr/bin/env bash
# Requires bash >= 4.0 (uses associative arrays)
set -euo pipefail

if ((BASH_VERSINFO[0] < 4)); then
  echo "This script requires bash >= 4.0 (found ${BASH_VERSION})" >&2
  exit 1
fi

echo "Setting up dependencies and environment..."
npm install
if npm run | grep -q 'build'; then
  npm run build
fi
