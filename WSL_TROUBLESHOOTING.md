# WSL Ubuntu Server Troubleshooting Guide

## 🐧 WSL2 + Windows 11 Specific Issues

### Common WSL Mounting Problems After Updates

#### 1. **WSL Not Mounting Windows Drives**
```bash
# Check if drives are mounted
ls /mnt/c

# If not visible, manually mount
sudo mkdir -p /mnt/c
sudo mount -t drvfs C: /mnt/c

# Make mounting persistent
echo "C: /mnt/c drvfs defaults 0 0" | sudo tee -a /etc/fstab
```

#### 2. **Fix WSL2 After Windows Update**
```powershell
# Run in Windows PowerShell as Administrator
wsl --shutdown
wsl --update
wsl --set-default-version 2
wsl --list --verbose

# If issues persist
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

#### 3. **Network/Port Issues**
```bash
# In WSL, check if port is in use
sudo lsof -i :5173
sudo netstat -tlnp | grep 5173

# Kill process using port
sudo kill -9 $(sudo lsof -t -i:5173)

# Start server with explicit host
npm run dev -- --host 0.0.0.0 --port 5173
```

### Server Mounting Fix Script

Create this script as `fix-wsl-server.sh`:

```bash
#!/bin/bash

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
pkill -f node
pkill -f vite
rm -rf node_modules package-lock.json

# 4. Reinstall dependencies
echo "📦 Installing dependencies..."
npm install

# 5. Create WSL-specific environment file
echo "⚙️ Setting up WSL environment..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "VITE_HOST=0.0.0.0" >> .env.local
fi

# 6. Start server with WSL-friendly settings
echo "🚀 Starting server..."
npm run dev -- --host 0.0.0.0

echo "✅ Server should now be accessible at:"
echo "   - http://127.0.0.1:5173 (from Windows)"
echo "   - http://localhost:5173 (from WSL)"
```

### Windows Firewall Configuration

```powershell
# Run in Windows PowerShell as Administrator
# Allow Node.js through firewall
New-NetFirewallRule -DisplayName "Node.js Development Server" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow

# Allow WSL2
New-NetFirewallRule -DisplayName "WSL2" -Direction Inbound -InterfaceAlias "vEthernet (WSL)" -Action Allow
```

### Permanent WSL2 Configuration

Create/edit `~/.wslconfig` in Windows user directory:
```ini
[wsl2]
memory=4GB
processors=2
swap=8GB
localhostForwarding=true

[network]
generateResolvConf=true
```

### VSCode Integration

For VSCode with WSL:
```json
// .vscode/settings.json
{
  "remote.WSL.fileWatcher.polling": true,
  "terminal.integrated.defaultProfile.windows": "Ubuntu (WSL)",
  "terminal.integrated.profiles.windows": {
    "Ubuntu (WSL)": {
      "path": "wsl.exe",
      "args": ["-d", "Ubuntu"]
    }
  }
}
```

### Quick Diagnostic Commands

```bash
# Create diagnostic alias
echo 'alias diagnose-wsl="echo \"=== WSL Diagnostics ===\"; \
  echo \"WSL Version:\"; wsl.exe --version; \
  echo \"\nMounted Drives:\"; mount | grep drvfs; \
  echo \"\nNetwork Config:\"; ip addr show; \
  echo \"\nNode Version:\"; node --version; \
  echo \"\nNPM Version:\"; npm --version; \
  echo \"\nPort 5173 Status:\"; sudo lsof -i :5173 || echo \"Port 5173 is free\""' >> ~/.bashrc

source ~/.bashrc

# Run diagnostics
diagnose-wsl
```

## Recovery Procedures

### Complete Reset
```bash
# 1. In Windows PowerShell (Admin)
wsl --shutdown
wsl --unregister Ubuntu
wsl --install -d Ubuntu

# 2. Reinstall Node.js in fresh WSL
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone project and setup
cd /mnt/c/Users/axele/Desktop/Microgreens_Project
git clone <your-repo-url>
cd microgreens-app
npm install
```

### Auto-start Script

Add to `~/.bashrc`:
```bash
# Auto-fix WSL mounts on startup
if [ ! -d "/mnt/c/Users" ]; then
    echo "Fixing WSL mounts..."
    sudo mount -t drvfs C: /mnt/c
fi

# Auto-navigate to project
alias microgreens="cd /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app"
```

## Troubleshooting Checklist

- [ ] WSL2 is running (not WSL1): `wsl --list --verbose`
- [ ] Windows drives are mounted: `ls /mnt/c`
- [ ] Correct permissions: `ls -la` shows your user
- [ ] No port conflicts: `sudo lsof -i :5173`
- [ ] Firewall allows connection
- [ ] Using `--host 0.0.0.0` flag
- [ ] Accessing via `127.0.0.1` not `localhost` from Windows

## Emergency Contacts

If all else fails, check:
1. Windows Event Viewer for WSL errors
2. `dmesg` in WSL for kernel issues
3. `wsl --log-level debug` for detailed logs
