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
