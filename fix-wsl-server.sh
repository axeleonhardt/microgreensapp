#!/bin/bash

echo "🔧 WSL Server Fix Script Starting..."
echo "📌 Based on experience, npm install fixes most issues!"

# 1. Ensure we're in the right directory
PROJECT_PATH="/mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app"
cd "$PROJECT_PATH" || {
    echo "❌ Cannot access project directory"
    echo "Attempting to fix mount..."
    sudo mount -t drvfs C: /mnt/c
    cd "$PROJECT_PATH" || exit 1
}

# 2. The magic fix - npm install
echo "📦 Running npm install (this usually fixes everything)..."
npm install

# 3. Start server with WSL-friendly settings
echo "🚀 Starting server..."
npm run dev -- --host 0.0.0.0

echo "✅ Server should now be accessible at:"
echo "   - http://127.0.0.1:5173 (from Windows)"
echo "   - http://localhost:5173 (from WSL)"
echo ""
echo "💡 Tip: If you see 'Re-optimizing dependencies because lockfile has changed'"
echo "   that's normal and shows npm install fixed the issue!"
