# AI Agent Instructions

**IMPORTANT**: Read `COMPLETE_DOCUMENTATION.md` before starting any work.

## 🎯 The #1 Fix for Server Issues

**Just run `npm install`** - This fixes 90% of all issues!

```bash
cd /mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app
npm install
npm run dev -- --host 0.0.0.0
```

If you see this message, it means npm install fixed the issue:
```
[vite] Re-optimizing dependencies because lockfile has changed
```

## Context
- Project: Microgreens Management System v1.4.0
- Environment: Windows 11 with WSL2 Ubuntu
- Path: `/mnt/c/Users/axele/Desktop/Microgreens_Project/microgreens-app`

## Common Workflow
```bash
# 1. Always start with npm install
npm install

# 2. Then start the server
npm run dev -- --host 0.0.0.0

# 3. Access from Windows browser
http://127.0.0.1:5173
# or
http://172.25.142.93:5173
```

## Why npm install Works

The server often fails because:
- Package-lock.json changes
- Vite needs to re-optimize dependencies
- Node modules get out of sync

Running `npm install`:
- Syncs dependencies
- Updates package-lock.json
- Triggers Vite to rebuild

## If npm install doesn't work

Only then try:
```bash
./fix-wsl-server.sh
```

Or check `COMPLETE_DOCUMENTATION.md` for advanced troubleshooting.