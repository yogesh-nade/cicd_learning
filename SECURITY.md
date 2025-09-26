# Security Information

## 🔐 Security Audit Overview

This project includes automated security scanning in the CI/CD pipeline.

### Current Status

The security audit may show vulnerabilities, but most are in development dependencies and don't affect production deployment.

### Understanding Vulnerabilities

1. **Production Dependencies**: These affect your deployed application and should be addressed
2. **Development Dependencies**: These only affect the development environment (like `react-scripts`, `webpack-dev-server`)

### Common Development Vulnerabilities

- **react-scripts vulnerabilities**: These are in the build tools, not your production code
- **webpack-dev-server issues**: Only affect local development, not production
- **PostCSS/SVGO issues**: Build-time tools, not runtime security concerns

### How to Handle Vulnerabilities

#### For Production Dependencies:
```bash
npm audit --production
npm audit fix --production
```

#### For All Dependencies (with caution):
```bash
npm audit fix
# or for breaking changes:
npm audit fix --force
```

### Best Practices

1. **Regular Updates**: Keep dependencies updated
2. **Audit Production**: Focus on production dependency vulnerabilities
3. **Review Changes**: Always review what `npm audit fix` will change
4. **Test After Fixes**: Run tests after applying security fixes

### CI/CD Security Features

- ✅ Automated security scanning on every push
- ✅ Production dependency focus
- ✅ Security reports stored as artifacts
- ✅ Non-blocking builds for development dependencies
- ✅ Detailed vulnerability reporting

### Manual Security Check

Run these commands locally:

```bash
# Check backend security
cd backend
npm audit --production

# Check frontend security  
cd frontend
npm audit --production
```