#!/bin/bash

echo "🔧 Stable WSL Server Launcher Starting..."

# Navigate to project directory
PROJECT_PATH="/mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app"
cd "$PROJECT_PATH" || {
    echo "❌ Cannot access project directory"
    exit 1
}

# Clean any existing processes
echo "🧹 Stopping existing processes..."
pkill -f node 2>/dev/null || true
pkill -f vite 2>/dev/null || true
sleep 2

# Check Node.js memory limits and set appropriate options
export NODE_OPTIONS="--max-old-space-size=4096"

# Create enhanced environment file
echo "⚙️ Setting up environment..."
cat > .env.local << EOF
VITE_HOST=0.0.0.0
VITE_PORT=5173
NODE_ENV=development
BROWSER=none
EOF

# Function to start server with monitoring
start_server_with_monitoring() {
    echo "🚀 Starting server with crash monitoring..."
    
    # Create a wrapper script that handles restarts
    cat > server-monitor.cjs << 'EOJS'
const { spawn } = require('child_process');
const fs = require('fs');

let serverProcess = null;
let restartCount = 0;
const maxRestarts = 3;

function logMessage(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    console.log(message);
    fs.appendFileSync('server.log', logEntry);
}

function startServer() {
    logMessage(`🚀 Starting Vite server (attempt ${restartCount + 1}/${maxRestarts})`);
    
    serverProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], {
        cwd: process.cwd(),
        stdio: ['inherit', 'pipe', 'pipe'],
        env: { 
            ...process.env, 
            NODE_ENV: 'development',
            NODE_OPTIONS: '--max-old-space-size=4096'
        }
    });

    let serverReady = false;

    serverProcess.stdout.on('data', (data) => {
        const output = data.toString();
        process.stdout.write(output);
        
        if (output.includes('ready in') || output.includes('Local:')) {
            serverReady = true;
            logMessage('✅ Server is ready and responding');
        }
        
        fs.appendFileSync('server.log', `[${new Date().toISOString()}] STDOUT: ${output}`);
    });

    serverProcess.stderr.on('data', (data) => {
        const error = data.toString();
        process.stderr.write(error);
        fs.appendFileSync('server.log', `[${new Date().toISOString()}] STDERR: ${error}`);
    });

    serverProcess.on('close', (code) => {
        logMessage(`Server process exited with code ${code}`);
        
        if (code !== 0 && restartCount < maxRestarts && !serverReady) {
            restartCount++;
            logMessage(`Server crashed during startup, restarting in 5 seconds... (${restartCount}/${maxRestarts})`);
            setTimeout(startServer, 5000);
        } else if (code !== 0 && serverReady) {
            logMessage('Server was running but crashed, attempting restart...');
            restartCount = 0; // Reset count if server was working
            setTimeout(startServer, 3000);
        } else if (restartCount >= maxRestarts) {
            logMessage('❌ Server failed too many times during startup, please check logs');
            process.exit(1);
        }
    });

    serverProcess.on('error', (err) => {
        logMessage(`Failed to start server: ${err.message}`);
    });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    logMessage('\n🛑 Shutting down server...');
    if (serverProcess) {
        serverProcess.kill('SIGTERM');
    }
    process.exit(0);
});

process.on('SIGTERM', () => {
    if (serverProcess) {
        serverProcess.kill('SIGTERM');
    }
    process.exit(0);
});

// Initialize log file
fs.writeFileSync('server.log', `[${new Date().toISOString()}] Server monitor started\n`);
logMessage('🏥 Server monitor initializing...');

startServer();
EOJS

    echo "✅ Server will be accessible at:"
    echo "   - http://127.0.0.1:5173 (from Windows)"
    echo "   - http://localhost:5173 (from WSL)"
    echo "   - http://172.25.142.93:5173 (network)"
    echo ""
    echo "📋 Commands:"
    echo "   - Press Ctrl+C to stop the server"
    echo "   - Check 'server.log' for detailed logs"
    echo "   - Run 'tail -f server.log' in another terminal to monitor"
    echo ""

    node server-monitor.cjs
}

# Run the stable server
start_server_with_monitoring