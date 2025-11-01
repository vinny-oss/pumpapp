#!/bin/bash

echo "🚀 Starting PUMP APP..."
echo ""
echo "Opening on port 8080..."
echo ""

cd "$(dirname "$0")/dist"
python3 -m http.server 8080
