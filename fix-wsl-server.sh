#\!/bin/bash

echo "🔧 WSL Server Fix Script Starting..."

# 1. Ensure we're in the right directory
PROJECT_PATH="/mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app"
cd "$PROJECT_PATH" || {
    echo "❌ Cannot access project directory"
    echo "Attempting to fix mount..."
    sudo mount -t drvfs C: /mnt/c
    cd "$PROJECT_PATH" || exit 1
}

# 2. Fix permissions
echo "📝 Fixing permissions..."
sudo chmod -R 755 .
sudo chown -R $USER:$USER .

# 3. Clean environment
echo "🧹 Cleaning environment..."
pkill -f node 2>/dev/null
pkill -f vite 2>/dev/null
rm -rf node_modules package-lock.json

# 4. Reinstall dependencies
echo "📦 Installing dependencies..."
npm install

# 5. Create WSL-specific environment file
echo "⚙️ Setting up WSL environment..."
if [ \! -f .env.local ]; then
    echo "VITE_HOST=0.0.0.0" > .env.local
    echo "VITE_PORT=5173" >> .env.local
fi

# 6. Start server with WSL-friendly settings
echo "🚀 Starting server..."
npm run dev -- --host 0.0.0.0

echo "✅ Server should now be accessible at:"
echo "   - http://127.0.0.1:5173 (from Windows)"
echo "   - http://localhost:5173 (from WSL)"
EOF < /dev/null
