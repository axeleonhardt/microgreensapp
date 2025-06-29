# 🌱 Microgreens Management System

**Version:** 1.4.0  
**Status:** ✅ Production Ready - Customer-Driven System  
**Last Updated:** June 27, 2025

## 🚀 Quick Start

### Standard Setup
```bash
# Navigate to project
cd microgreens-app

# Install dependencies
npm install

# Start development server
npm run dev -- --host 0.0.0.0

# Open browser to http://localhost:5173
```

### Safe Update (Recommended)
```bash
# Use the automated update script
./scripts/server-update.sh
```

### Emergency Recovery
```bash
# If something goes wrong
git reset --hard <last-stable-tag>
npm install && npm run dev
```

## 📋 Features

### 🖥️ Enhanced Dashboard
- **Customer Delivery Timeline**: 7-day delivery overview with production status
- **Capacity Alerts**: Real-time warnings for production bottlenecks
- **Smart Metrics**: Production-to-delivery pipeline tracking
- **Revenue Forecasting**: Customer-based financial projections

### 🌱 Intelligent Production Management
- **Smart Planning Modal**: AI-driven batch suggestions based on customer orders
- **Harvest Optimization**: Timing optimization for maximum freshness
- **Urgent Alerts**: Automatic notifications for time-critical plantings
- **Customer-Driven Scheduling**: Production aligned with delivery dates
- **Rack Management**: Visual organization with capacity tracking

### 👥 Advanced Customer Management
- **Production Status Tracking**: Real-time view of customer order fulfillment
- **Individual Planning**: Customer-specific production plan generation
- **Delivery Integration**: Automatic production scheduling from delivery dates
- **Demand Forecasting**: 8-week ahead customer demand analysis

### 🤖 Automated Systems
- **Production Planning**: Auto-calculate planting dates from deliveries
- **Capacity Management**: Real-time utilization monitoring
- **Freshness Optimization**: 1-2 day harvest-to-delivery windows
- **Alert System**: Proactive notifications for capacity and timing issues

### 📊 Data Integration
- **Cross-Module Sync**: Seamless data flow between all components
- **Smart Suggestions**: AI-powered recommendations throughout the system
- **Performance Analytics**: Comprehensive tracking and optimization

## 🏗️ Architecture

### 🎯 System Design
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CUSTOMERS     │───►│   PRODUCTION    │───►│    HARVEST      │
│                 │    │                 │    │                 │
│ • Order Mgmt    │    │ • Smart Planning│    │ • Optimization  │
│ • Delivery Sched│    │ • Batch Tracking│    │ • Freshness     │
│ • Demand Fcst   │    │ • Capacity Mgmt │    │ • Scheduling    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                           ┌─────────────────┐
                           │    DASHBOARD    │
                           │                 │
                           │ • Integration   │
                           │ • Analytics     │
                           │ • Alerts        │
                           └─────────────────┘
```

### 🔧 Technology Stack
- **React 19.1.0** - UI framework with hooks
- **Vite 6.3.5** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first styling
- **Date-fns 4.1.0** - Date manipulation and planning
- **Recharts 3.0.0** - Data visualization

### 🧠 State Management
- **Centralized Context** - Global state with automatic sync
- **Production Planning Utils** - Smart calculation engine
- **Real-time Updates** - Automatic refresh every minute
- **localStorage** - Persistent data storage

### 🛠️ Development Tools
- **ESLint** - Code quality enforcement
- **Claude Code Integration** - AI-assisted development
- **Git Workflow** - Stable version management
- **Automated Testing** - Quality assurance

## 📂 Project Structure

```
microgreens-app/
├── 📄 CLAUDE.md              # Claude Code best practices
├── 📄 TROUBLESHOOTING.md     # Issue resolution guide
├── 📁 scripts/               # Automation scripts
│   └── server-update.sh      # Safe update procedure
├── 📁 public/                # Static assets
├── 📁 src/
│   ├── 📁 components/        # React components
│   │   ├── Dashboard/        # 📊 Analytics & overview
│   │   │   ├── CustomerDeliveryTimeline.jsx
│   │   │   ├── CapacityAlert.jsx
│   │   │   └── DemandForecastTimeline.jsx
│   │   ├── Production/       # 🌱 Smart production mgmt
│   │   │   ├── ProductionPlanModal.jsx
│   │   │   ├── HarvestOptimizationModal.jsx
│   │   │   └── Production.jsx
│   │   ├── Customers/        # 👥 Customer integration
│   │   │   └── Customers.jsx (enhanced)
│   │   └── shared/           # 🔄 Reusable components
│   ├── 📁 contexts/          # State management
│   │   └── AppContext.jsx    # Enhanced with planning
│   ├── 📁 utils/             # Business logic
│   │   ├── productionPlanning.js  # 🤖 AI planning engine
│   │   ├── dateHelpers.js
│   │   └── calculations.js
│   ├── 📁 data/              # Configuration
│   └── 📁 assets/            # Static resources
├── 📁 dist/                  # Production build
└── 📄 dev.log               # Server logs
```

### 🔑 Key Files
- **CLAUDE.md**: Development guidelines and best practices
- **productionPlanning.js**: Core intelligence for customer-driven production
- **AppContext.jsx**: Centralized state with automatic planning updates
- **server-update.sh**: Safe update script with rollback capability

## 🚧 Development Workflow

### 🎯 Claude Code Best Practices

#### Before Making Changes
```bash
# Create stable checkpoint
git tag -a v1.4.0-stable -m "Stable version before changes"
git push origin v1.4.0-stable

# Create feature branch
git checkout -b feature/new-feature
```

#### Development Commands in Claude Code
```bash
# Quick memory update
# Remember to use 2-space indentation and follow React best practices

# Update server safely
# Use the automated script: ./scripts/server-update.sh

# Emergency rollback
# git reset --hard v1.4.0-stable && npm install
```

#### Testing & Quality
```bash
# Full test suite
npm run lint          # Check code quality
npm run build         # Verify build works
npm run dev          # Start development

# Production preview
npm run preview
```

#### Safe Deployment
```bash
# Use the update script
./scripts/server-update.sh

# Manual process (if needed)
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
npm run dev -- --host 0.0.0.0
```

## 🔧 Troubleshooting

### 🚨 Quick Fixes

**Server Issues:**
```bash
# Use the safe update script
./scripts/server-update.sh

# Or manual recovery
git reset --hard <last-stable-tag>
npm install && npm run dev -- --host 0.0.0.0
```

**Integration Problems:**
```bash
# Check CLAUDE.md for guidelines
# Verify all components are properly connected
npm run lint  # Fix any code quality issues
npm run build # Ensure everything compiles
```

**Emergency Recovery:**
```bash
# Full reset to stable state
git stash
git checkout main
git reset --hard v1.4.0-stable
npm cache clean --force
rm -rf node_modules
npm install
npm run dev -- --host 0.0.0.0
```

### 📚 Documentation
- **TROUBLESHOOTING.md**: Comprehensive issue resolution
- **CLAUDE.md**: Development best practices
- **dev.log**: Current server logs

## 🎯 Version Management

### 🏷️ Stable Versions
- **v1.4.0-stable**: Current stable with customer integration
- **v1.3.0-stable**: Previous stable without integration
- **v1.2.4-stable**: Legacy version

### 🔄 Update Policy
- Always create backup tags before major changes
- Test all integrations after updates
- Use automated update script for safety
- Keep rollback plan ready

### 📞 Support
- Check **CLAUDE.md** for development guidelines
- Review **TROUBLESHOOTING.md** for issue resolution
- Use **./scripts/server-update.sh** for safe updates
- Create git tags before major changes

---

**🤖 Built with Claude Code best practices**  
**❤️ Sustainable microgreens production**  
**🚀 Customer-driven intelligent system**