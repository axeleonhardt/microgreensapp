# 🤖 Claude Code Best Practices - Microgreens App

> **📢 Important**: An enhanced version of this documentation is available at:
> - `CLAUDE_ENHANCED.md` - Complete enhanced documentation with additional sections
> - `docs/CLAUDE_ENHANCED_PART2.md` - Additional best practices and guidelines
>
> The enhanced version includes:
> - Environment Variables Management
> - Database Backup & Migration Procedures
> - Performance Monitoring Guidelines
> - Security Checklist (OWASP Top 10)
> - CI/CD Pipeline Configuration
> - Monitoring & Logging
> - PWA Guidelines
> - AI Agent Guidelines
> - And much more!

---

## 📋 Project Overview
- **Project Name**: Microgreens Management System
- **Version**: 1.4.0
- **Framework**: React + Vite
- **Architecture**: Customer-driven production system

## 🏗️ Development Guidelines

### Code Standards
- Use 2-space indentation consistently
- Prefer functional components with hooks
- Use TypeScript for type safety where possible
- Follow ESLint configuration strictly
- Never commit code with lint errors

### File Organization
```
src/
├── components/         # Reusable UI components
│   ├── Dashboard/     # Dashboard-specific components
│   ├── Production/    # Production management components
│   ├── Customers/     # Customer management components
│   └── shared/        # Shared components across modules
├── contexts/          # React Context providers
├── utils/             # Helper functions and utilities
├── data/              # Configuration and sample data
└── assets/            # Static assets
```

### Component Guidelines
- Each component should have a single responsibility
- Use descriptive component names (PascalCase)
- Props should be destructured with TypeScript interfaces
- Keep components under 200 lines when possible
- Extract complex logic into custom hooks

### State Management
- Use React Context for global state
- Keep local state minimal and focused
- Use reducers for complex state logic
- Always provide proper error boundaries

## 🔄 Version Control & Stability

### Git Workflow
- **Main branch**: Always stable, deployable version
- **Feature branches**: `feature/feature-name`
- **Hotfix branches**: `hotfix/issue-description`
- **Never commit directly to main**

### Stable Version Management
```bash
# Create stable checkpoint before major changes
git tag -a v1.4.0-stable -m "Stable version before integration changes"
git push origin v1.4.0-stable

# Create feature branch for major changes
git checkout -b feature/customer-integration
# ... make changes ...
git commit -m "feat: add customer-production integration"

# Merge back only when fully tested
git checkout main
git merge feature/customer-integration --no-ff
```

### Rollback Procedures
```bash
# Quick rollback to last stable version
git reset --hard v1.4.0-stable

# Create rollback branch for investigation
git checkout -b rollback/investigate-issue v1.4.0-stable

# Selective rollback of specific commits
git revert <commit-hash>
```

## 🚀 Server Update Protocol

### Pre-Update Checklist
- [ ] Current version is stable and tested
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Dependencies are up to date
- [ ] Backup current state (git tag)

### Update Procedure
```bash
# 1. Stop current server
pkill -f vite || pkill -f node

# 2. Backup current state
git add . && git commit -m "backup: pre-update state"
git tag "backup-$(date +%Y%m%d-%H%M%S)"

# 3. Clean environment
npm cache clean --force
rm -rf node_modules package-lock.json dist

# 4. Fresh install
npm install

# 5. Verify installation
npm ls --depth=0
npm audit

# 6. Test build
npm run build

# 7. Start server
npm run dev -- --host 0.0.0.0

# 8. Verify functionality
curl -f http://localhost:5173/ || echo "Server check failed"
```

### Post-Update Verification
- [ ] All pages load correctly
- [ ] No console errors in browser
- [ ] Core features functional (Dashboard, Production, Customers)
- [ ] Data persistence works
- [ ] Network access functional

## 🧪 Testing Strategy

### Testing Pyramid
1. **Unit Tests**: Component logic, utility functions
2. **Integration Tests**: Component interactions, API calls
3. **E2E Tests**: Full user workflows

### Test Commands
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm test -- --grep "Production"
```

## 📚 Documentation Standards

### Code Documentation
- Use JSDoc for complex functions
- Document all public APIs
- Include usage examples
- Document any non-obvious business logic

### README Structure
```markdown
# Project Title
## Quick Start
## Architecture
## Development Setup
## Deployment
## Contributing
## Troubleshooting
```

### Change Documentation
- Update CHANGELOG.md for all releases
- Document breaking changes prominently
- Include migration guides for major updates

## 🔧 Troubleshooting Quick Reference

### Common Issues
1. **Dependencies**: `rm -rf node_modules && npm install`
2. **Port conflicts**: `pkill -f vite && npm run dev`
3. **Cache issues**: `npm cache clean --force`
4. **Build failures**: Check ESLint errors first

### Emergency Recovery
```bash
# Full reset to last known stable state
git stash
git checkout main
git reset --hard v1.4.0-stable
npm cache clean --force
rm -rf node_modules
npm install
npm run dev
```

## 📞 Support Workflow

### Before Asking for Help
1. Check this CLAUDE.md file
2. Review TROUBLESHOOTING.md
3. Run diagnostic commands
4. Check git history for recent changes

### When Reporting Issues
- Include exact error messages
- Provide steps to reproduce
- Share relevant git commit history
- Include environment details (Node version, OS, etc.)

## 🎯 Quality Gates

### Before Merging
- [ ] All tests pass
- [ ] Code review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile responsive (if applicable)

### Before Deployment
- [ ] Integration tests pass
- [ ] Security audit clean
- [ ] Backup created
- [ ] Rollback plan ready
- [ ] Monitoring in place

---

**Last Updated**: June 27, 2025  
**Maintainer**: Development Team  
**Review Cycle**: Every major release