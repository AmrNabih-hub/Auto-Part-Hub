#!/bin/bash
set -e

# Ensure proper permissions
chmod +x node_modules/.bin/vite || true
chmod +x node_modules/.bin/tsc || true

# Run the build
npm run build 