# GitHub Actions Deployment Setup Guide

This guide will help you set up automatic deployment from GitHub Actions to Render.

## Overview

The deployment workflow will:
1. ✅ Trigger after successful CI pipeline completion
2. 🔍 Verify backend build before deployment
3. 🚀 Trigger Render deployment via Deploy Hook
4. ⏳ Wait and verify deployment success
5. 🧪 Test API endpoints
6. 📊 Provide deployment summary

## Setup Steps

### Step 1: Create Render Service

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (`cicd_learning`)
   - **Configuration**:
     ```
     Name: notes-app-backend
     Root Directory: backend
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     Plan: Free
     ```

3. **Set Environment Variables** in Render:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp
   ```

4. **Disable Auto-Deploy** (we'll control this via GitHub Actions):
   - Go to Settings → Auto-Deploy
   - Turn OFF "Auto-Deploy"

### Step 2: Get Render Deploy Hook

1. **In your Render service dashboard**:
   - Go to "Settings" tab
   - Scroll down to "Deploy Hook"
   - Copy the Deploy Hook URL (looks like: `https://api.render.com/deploy/srv-xxxxx?key=yyyyy`)

### Step 3: Configure GitHub Secrets

1. **Go to your GitHub repository**:
   - Navigate to: `Settings` → `Secrets and variables` → `Actions`

2. **Add Repository Secrets**:
   
   **Required:**
   ```
   RENDER_DEPLOY_HOOK_URL
   Value: https://api.render.com/deploy/srv-xxxxx?key=yyyyy
   ```
   
   **Optional (for verification):**
   ```
   RENDER_SERVICE_URL
   Value: https://your-service-name.onrender.com
   ```

### Step 4: Configure MongoDB Atlas (if not done)

1. **Create MongoDB Atlas cluster** (free tier)
2. **Set network access** to allow all IPs (0.0.0.0/0)
3. **Get connection string** and add to Render environment variables

### Step 5: Test the Deployment

1. **Make a code change** and push to main branch:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```

2. **Monitor the deployment**:
   - GitHub Actions tab will show the workflow running
   - Render dashboard will show deployment progress
   - Check logs in both places if issues occur

## Workflow Files Created

### 1. `.github/workflows/deploy.yml`
- Simple deployment workflow
- Triggers on main branch push
- Uses deploy hook to trigger Render deployment

### 2. `.github/workflows/cd.yml` (Recommended)
- Comprehensive deployment pipeline
- Includes pre-deployment verification
- Health checks and API testing
- Detailed deployment summary
- Better error handling

## Environment Variables Reference

### GitHub Secrets
```bash
# Required
RENDER_DEPLOY_HOOK_URL=https://api.render.com/deploy/srv-xxxxx?key=yyyyy

# Optional
RENDER_SERVICE_URL=https://your-app-name.onrender.com
```

### Render Environment Variables
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp
PORT=5000  # Automatically set by Render
```

## Deployment Flow

```mermaid
graph TD
    A[Push to main branch] --> B[CI Pipeline runs]
    B --> C{CI Success?}
    C -->|Yes| D[Deployment workflow starts]
    C -->|No| E[Skip deployment]
    D --> F[Verify backend build]
    F --> G[Trigger Render deploy hook]
    G --> H[Wait for deployment]
    H --> I[Verify service health]
    I --> J[Test API endpoints]
    J --> K[Deployment complete ✅]
```

## Monitoring and Troubleshooting

### Check Deployment Status
1. **GitHub Actions**: Repository → Actions tab
2. **Render Dashboard**: Your service → Deployments tab
3. **Service Logs**: Render dashboard → Logs tab

### Common Issues

1. **Deploy Hook Failed**:
   - Verify `RENDER_DEPLOY_HOOK_URL` secret is correct
   - Check Render service is not suspended

2. **Service Not Responding**:
   - Check Render logs for startup errors
   - Verify MongoDB connection string
   - Ensure all environment variables are set

3. **Build Failures**:
   - Check package.json dependencies
   - Verify Node.js version compatibility
   - Review Render build logs

### Manual Deployment Trigger

If you need to trigger deployment manually:

```bash
# Using the deploy hook directly
curl -X POST "$RENDER_DEPLOY_HOOK_URL"

# Or re-run the GitHub Action
# Go to Actions tab → Select workflow → Re-run jobs
```

## Security Best Practices

1. **Never commit secrets** to your repository
2. **Use GitHub Secrets** for sensitive data
3. **Limit deploy hook access** - don't share the URL
4. **Monitor deployment logs** for security issues
5. **Use environment variables** for configuration

## Next Steps

After deployment is working:
1. 🎨 Deploy frontend to Netlify/Vercel
2. 🔗 Update frontend API URLs to use production backend
3. 🌐 Set up custom domain (optional)
4. 📊 Add monitoring and alerts
5. 🛡️ Implement additional security measures

## Testing Your Setup

Once configured, test with a simple change:

```bash
# Make a small change to verify deployment
echo "console.log('Deployment test');" >> backend/server.js
git add .
git commit -m "Test automatic deployment"
git push origin main
```

Watch the GitHub Actions tab and Render dashboard to see the deployment in action!