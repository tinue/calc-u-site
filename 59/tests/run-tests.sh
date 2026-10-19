#!/usr/bin/env bash
# Playwright tests for the Calc-U-59 site (/59/). Serves the repository root
# on port 8000, so the site is at http://localhost:8000/59/ as on calc-u.org.
# Build first: node .seo/build.js (from 59/).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
PORT=8000
SERVER_PID=""

if ! lsof -ti:$PORT > /dev/null 2>&1; then
  echo "Starting HTTP server on port $PORT serving $ROOT_DIR..."
  # A larger listen backlog than http.server's default of 5, which resets
  # connections when parallel test pages each fetch the calculator's ROM files.
  python3 - "$ROOT_DIR" "$PORT" 2>/dev/null <<'PY' &
import functools, http.server, sys
class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 128
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=sys.argv[1])
Server(("", int(sys.argv[2])), handler).serve_forever()
PY
  SERVER_PID=$!
  trap 'kill "$SERVER_PID" 2>/dev/null' EXIT
  sleep 1
else
  echo "Port $PORT already in use — using the existing server."
fi

cd "$SCRIPT_DIR"
npm install --no-audit --no-fund
npx playwright install chromium
npx playwright test "$@"
