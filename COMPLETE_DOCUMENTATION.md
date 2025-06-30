# 🌱 Microgreens Management System - Complete Documentation

**Version:** 1.4.0  
**Last Updated:** December 29, 2024  
**Environment:** Windows 11 with WSL2 Ubuntu  
**Status:** Production Ready

---

## 📋 Table of Contents

1. [Quick Start Guide](#-quick-start-guide)
2. [Project Overview](#-project-overview)
3. [Development Environment](#-development-environment)
4. [Architecture & Technical Stack](#-architecture--technical-stack)
5. [Development Guidelines](#-development-guidelines)
6. [WSL-Specific Configuration](#-wsl-specific-configuration)
7. [Common Issues & Solutions](#-common-issues--solutions)
8. [Server Management](#-server-management)
9. [Data Management](#-data-management)
10. [Security & Performance](#-security--performance)
11. [Testing & Quality](#-testing--quality)
12. [Deployment](#-deployment)
13. [AI Agent Guidelines](#-ai-agent-guidelines)

---

## 🚀 Quick Start Guide

### For AI Agents - Read This First!
```bash
# IMPORTANT: This is a WSL2 Ubuntu environment on Windows 11
# Project path: /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app

# 1. Navigate to project
cd /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app

# 2. ALWAYS run npm install first (fixes 90% of issues)
npm install

# 3. Start development server
npm run dev -- --host 0.0.0.0

# 4. Access application
# From Windows: http://127.0.0.1:5173 or http://172.25.142.93:5173
# From WSL: http://localhost:5173
```

### 🎯 The Golden Rule
**If the server won't start or behaves strangely, run `npm install` first!**

This fixes most issues because:
- Package-lock.json often changes
- Dependencies need re-optimization
- Vite detects lockfile changes and rebuilds

### Quick Fix Script (for WSL issues)
```bash
# Run this if server won't start
chmod +x fix-wsl-server.sh
./fix-wsl-server.sh
```

---

## 📋 Project Overview

### Business Context
- **Name**: Bahía Blanca Microgreens
- **Location**: Bahía Blanca, Buenos Aires, Argentina
- **Type**: Microgreens production management system
- **Scale**: 2 racks, 32 trays capacity
- **Products**: Sunflower, Radish, Broccoli microgreens

### Application Features
- **Dashboard**: Real-time metrics and alerts
- **Production Management**: Batch tracking and lifecycle
- **Inventory Control**: Seeds, trays, and supplies
- **Customer Management**: Client database and preferences
- **Financial Tracking**: Revenue and cost analysis
- **Reports**: Production analytics and insights

### Technical Summary
- **Frontend**: React 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 3.4.17
- **State**: React Context API
- **Storage**: Browser localStorage
- **Charts**: Recharts 3.0.0
- **Dates**: date-fns 4.1.0

---

## 💻 Development Environment

### System Requirements
```yaml
Operating System:
  Host: Windows 11
  Development: WSL2 Ubuntu
  
Node.js: 18.x or higher (LTS)
npm: 9.x or higher
Browser: Modern (Chrome, Firefox, Edge)
Storage: ~100MB for project + dependencies
```

### WSL2 Configuration
```ini
# ~/.wslconfig in Windows user directory
[wsl2]
memory=4GB
processors=2
swap=8GB
localhostForwarding=true

[network]
generateResolvConf=true
```

### Environment Variables
```bash
# .env.local (create from .env.example)
VITE_APP_NAME=Microgreens Management System
VITE_APP_VERSION=1.4.0
VITE_APP_ENV=development
VITE_HOST=0.0.0.0
VITE_PORT=5173
```

---

## 🏗️ Architecture & Technical Stack

### Application Architecture
```
┌─────────────────────────────────────────────┐
│          Browser (Client-Side SPA)          │
├─────────────────────────────────────────────┤
│  React Components                           │
│  ├── Dashboard (Metrics, Alerts, Timeline)  │
│  ├── Production (Batch Management)          │
│  ├── Inventory (Stock Control)             │
│  ├── Customers (Client Management)         │
│  └── Financial (Revenue Tracking)          │
├─────────────────────────────────────────────┤
│  State Management (React Context)           │
│  └── AppContext (Global State)             │
├─────────────────────────────────────────────┤
│  Data Persistence (localStorage)            │
│  └── JSON Serialized Data                  │
└─────────────────────────────────────────────┘
```

### File Structure
```
microgreens-app/
├── src/
│   ├── components/       # UI Components
│   ├── contexts/        # State Management
│   ├── utils/           # Helper Functions
│   ├── data/           # Configuration
│   └── assets/         # Static Assets
├── public/             # Public Assets
├── scripts/            # Utility Scripts
├── docs/              # Documentation
└── [config files]     # Project Configuration
```

### Key Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "vite": "^6.3.5",
  "tailwindcss": "^3.4.17",
  "recharts": "^3.0.0",
  "date-fns": "^4.1.0"
}
```

---

## 🏗️ Development Guidelines

### Code Standards
- **Indentation**: 2 spaces
- **Components**: Functional with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **State**: Minimal local state, global via Context
- **Comments**: JSDoc for complex functions

### Git Workflow
```bash
# Feature development
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/feature-name

# Create stable checkpoint
git tag -a v1.4.0-stable -m "Stable before major changes"
git push origin v1.4.0-stable
```

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `perf:` Performance
- `test:` Testing
- `chore:` Maintenance

---

## 🐧 WSL-Specific Configuration

### Common WSL Issues & Solutions

#### 1. WSL Not Mounting Windows Drives
```bash
# Check mount
ls /mnt/c

# Manual mount if needed
sudo mkdir -p /mnt/c
sudo mount -t drvfs C: /mnt/c

# Persist mount
echo "C: /mnt/c drvfs defaults 0 0" | sudo tee -a /etc/fstab
```

#### 2. Port Access Issues
```bash
# Kill existing process
sudo kill -9 $(sudo lsof -t -i:5173)

# Start with explicit host
npm run dev -- --host 0.0.0.0

# Windows Firewall (run in PowerShell as Admin)
New-NetFirewallRule -DisplayName "Node.js Dev Server" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

#### 3. File Permission Problems
```bash
# Fix permissions
sudo chmod -R 755 .
sudo chown -R $USER:$USER .
```

### WSL Diagnostic Commands
```bash
# Create useful alias
echo 'alias diagnose-wsl="echo \"=== WSL Diagnostics ===\"; \
  echo \"WSL Version:\"; wsl.exe --version; \
  echo \"\nMounted Drives:\"; mount | grep drvfs; \
  echo \"\nNode Version:\"; node --version; \
  echo \"\nPort 5173:\"; sudo lsof -i :5173 || echo \"Port free\""' >> ~/.bashrc

source ~/.bashrc
diagnose-wsl
```

---

## 🚨 Common Issues & Solutions

### Issue: Server Won't Start
```bash
# Solution 1: The Magic Fix (works 90% of the time)
npm install
npm run dev -- --host 0.0.0.0

# If you see: "Re-optimizing dependencies because lockfile has changed"
# That's GOOD! It means npm install fixed the issue.

# Solution 2: If npm install doesn't work
./fix-wsl-server.sh

# Solution 3: Nuclear option (rarely needed)
rm -rf node_modules package-lock.json
npm install
npm run dev -- --host 0.0.0.0
```

### Issue: Dependencies Missing
```bash
# Check status
npm ls --depth=0

# Fix
npm install

# Verify
npm audit
```

### Issue: Port Already in Use
```bash
# Find process
sudo lsof -i :5173

# Kill process
sudo kill -9 [PID]

# Or use different port
npm run dev -- --port 5174
```

### Issue: Browser Can't Connect
```bash
# Ensure using correct URL from Windows
http://127.0.0.1:5173  # NOT localhost

# Check server is running
ps aux | grep vite

# Test connection
curl http://127.0.0.1:5173
```

---

## 🚀 Server Management

### Development Server
```bash
# Standard start
npm run dev

# WSL-friendly start
npm run dev -- --host 0.0.0.0

# Background start
nohup npm run dev -- --host 0.0.0.0 > dev.log 2>&1 &

# Check logs
tail -f dev.log
```

### Server Update Protocol
```bash
# 1. Stop server
pkill -f vite

# 2. Backup state
git add . && git commit -m "backup: pre-update"
git tag "backup-$(date +%Y%m%d-%H%M%S)"

# 3. Clean environment
npm cache clean --force
rm -rf node_modules package-lock.json dist

# 4. Fresh install
npm install

# 5. Test build
npm run build

# 6. Start server
npm run dev -- --host 0.0.0.0

# 7. Verify
curl -f http://127.0.0.1:5173/ || echo "Server check failed"
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview -- --host 0.0.0.0

# Output in dist/ directory
ls -la dist/
```

---

## 💾 Data Management

### Local Storage Structure
```javascript
// Data is stored in browser localStorage
microgreens_customers    // Customer data
microgreens_batches      // Production batches
microgreens_inventory    // Inventory items
microgreens_settings     // App settings
microgreens_version      // Data version
```

### Backup & Restore
```javascript
// Create backup (in browser console)
const backup = {
  version: '1.4.0',
  timestamp: new Date().toISOString(),
  data: {
    customers: localStorage.getItem('microgreens_customers'),
    batches: localStorage.getItem('microgreens_batches'),
    inventory: localStorage.getItem('microgreens_inventory'),
    settings: localStorage.getItem('microgreens_settings')
  }
};
console.log(JSON.stringify(backup));

// Download backup
const blob = new Blob([JSON.stringify(backup)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `microgreens-backup-${new Date().toISOString().split('T')[0]}.json`;
a.click();
```

### Data Migration
```javascript
// Migrations run automatically on app start
// Version-based migration system
// Located in src/utils/migrations.js
```

---

## 🔒 Security & Performance

### Security Checklist
- ✅ Input validation on all forms
- ✅ XSS protection (React default)
- ✅ No external API calls
- ✅ Data stored locally only
- ✅ No authentication required (local app)
- ✅ HTTPS recommended for production

### Performance Targets
- Initial Load: < 2 seconds
- Time to Interactive: < 1 second
- Bundle Size: ~350KB gzipped
- Memory Usage: < 50MB
- localStorage: < 5MB

### Performance Monitoring
```javascript
// Enable in browser console
window.performanceMonitor = {
  init() {
    // Monitor page load
    window.addEventListener('load', () => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
    
    // Monitor React renders
    if (window.React && window.React.Profiler) {
      console.log('React Profiler available');
    }
  }
};
window.performanceMonitor.init();
```

---

## 🧪 Testing & Quality

### Testing Strategy
```bash
# Run linter
npm run lint

# Run tests (when available)
npm test

# Type checking (if TypeScript added)
npm run type-check

# Bundle analysis
npm run build
npm run analyze  # If configured
```

### Quality Gates
Before committing:
- [ ] No ESLint errors
- [ ] No console.log in production code
- [ ] All features tested manually
- [ ] No browser console errors
- [ ] Performance acceptable

Before deployment:
- [ ] Production build succeeds
- [ ] Security audit clean
- [ ] Backup current version
- [ ] Test on multiple browsers
- [ ] Document any breaking changes

---

## 🚀 Deployment

### Production Build
```bash
# 1. Update version
npm version patch  # or minor/major

# 2. Build
npm run build

# 3. Test locally
npm run preview

# 4. Deploy files from dist/
# Can use: Netlify, Vercel, GitHub Pages, etc.
```

### Deployment Options
1. **Static Hosting** (Recommended)
   - Netlify: Drag & drop dist folder
   - Vercel: Connect GitHub repo
   - GitHub Pages: Use gh-pages branch

2. **Self-Hosted**
   ```nginx
   # Nginx configuration
   server {
     listen 80;
     server_name microgreens.local;
     root /var/www/microgreens/dist;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

---

## 🤖 AI Agent Guidelines

### When Working on This Project

1. **Always Check Environment First**
   ```bash
   pwd  # Should be in project directory
   node --version  # Should be 18+
   npm ls --depth=0  # Check dependencies
   ```

2. **For WSL Issues**
   - Run `./fix-wsl-server.sh` first
   - Use `--host 0.0.0.0` flag
   - Access via `127.0.0.1` from Windows

3. **Before Making Changes**
   ```bash
   # Create feature branch
   git checkout -b feature/your-change
   
   # Make changes
   
   # Test thoroughly
   npm run dev -- --host 0.0.0.0
   
   # Commit with semantic message
   git commit -m "feat: your feature description"
   ```

4. **Common Tasks**
   ```bash
   # Add new component
   mkdir src/components/YourComponent
   touch src/components/YourComponent/YourComponent.jsx
   touch src/components/YourComponent/index.js
   
   # Add utility function
   touch src/utils/yourUtility.js
   echo "export * from './yourUtility';" >> src/utils/index.js
   ```

5. **Debugging Checklist**
   - Check browser console for errors
   - Verify localStorage has data
   - Ensure all imports are correct
   - Check network tab for 404s
   - Verify component props

### Quick Reference Commands
```bash
# Most common commands for this project
alias ms-start="cd /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app && npm run dev -- --host 0.0.0.0"
alias ms-fix="cd /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app && ./fix-wsl-server.sh"
alias ms-install="cd /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app && rm -rf node_modules package-lock.json && npm install"
```

---

## 📞 Emergency Procedures

### Complete System Reset
```bash
# Nuclear option - use only if nothing else works
cd /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app

# 1. Stop everything
pkill -f node
pkill -f vite

# 2. Clean everything
git clean -fdx  # WARNING: Removes all untracked files
git reset --hard

# 3. Reinstall
npm install

# 4. Start fresh
npm run dev -- --host 0.0.0.0
```

### Data Recovery
```javascript
// If data is corrupted, check for backups
// In browser console:
Object.keys(localStorage).filter(k => k.startsWith('microgreens')).forEach(k => {
  console.log(k, localStorage.getItem(k));
});
```

---

## 📊 Project Status

### Current Version: 1.4.0
- ✅ Production ready
- ✅ All core features implemented
- ✅ Documentation complete
- ✅ WSL compatibility tested
- ✅ Performance optimized

### Known Working Configuration
- **Date**: December 2024
- **OS**: Windows 11 + WSL2 Ubuntu
- **Node**: 18.x LTS
- **Dependencies**: 336 packages, 0 vulnerabilities
- **Server**: Vite 6.3.5
- **Port**: 5173

---

**Last Updated**: December 29, 2024  
**Maintainer**: Development Team  
**Status**: Stable and Production Ready

Remember: When in doubt, run `./fix-wsl-server.sh` - it solves 90% of WSL-related issues!