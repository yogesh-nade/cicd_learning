# GitHub Actions Auto-Deployment Setup Guide

This guide will help you set up automatic deployment to Render using GitHub Actions. Every push to the main branch will trigger a deployment after successful CI tests.

## 🎯 Overview

Our deployment strategy:
1. **Continuous Integration** (CI) - Build and test on every push
2. **Continuous Deployment** (CD) - Deploy to Render after successful CI
3. **Deploy Hooks** - Use Render's deploy hooks for fast deployments

## 📋 Prerequisites

- [x] GitHub repository with your code
- [x] GitHub Actions workflows (CI) already working
- [ ] MongoDB Atlas database
- [ ] Render account and web service
- [ ] Deploy hook URL from Render

## 🔧 Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**:
   - Choose free tier (M0)
   - Select region closest to your users
   - Name your cluster (e.g., "notes-app-cluster")

3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `notesapp` (or your choice)
   - Generate secure password and **save it**
   - Database User Privileges: "Read and write to any database"

4. **Configure Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0)
   - This is needed for Render deployment

5. **Get Connection String**:
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://notesapp:<password>@notes-app-cluster.xxxxx.mongodb.net/notesapp
   ```
   - Replace `<password>` with your actual password

## 🚀 Step 2: Create Render Web Service

1. **Sign Up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub (recommended)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository: `cicd_learning`

3. **Configure Service Settings**:
   ```
   Name: notes-app-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Set Environment Variables**:
   - In the service settings, go to "Environment"
   - Add these variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://notesapp:YOUR_PASSWORD@notes-app-cluster.xxxxx.mongodb.net/notesapp
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for initial deployment (5-10 minutes)
   - Note your app URL: `https://notes-app-backend-xxxx.onrender.com`

## 🔗 Step 3: Get Deploy Hook URL

1. **Find Deploy Hook**:
   - In your Render service dashboard
   - Go to "Settings" → "Deploy Hook"
   - Copy the deploy hook URL (looks like):
   ```
   https://api.render.com/deploy/srv-xxxxxxxxx?key=yyyyyyyyyyy
   ```

2. **Test Deploy Hook** (optional):
   ```bash
   curl -X POST https://api.render.com/deploy/srv-xxxxxxxxx?key=yyyyyyyyyyy
   ```

## ⚙️ Step 4: Configure GitHub Secrets

1. **Go to GitHub Repository**:
   - Navigate to your repository on GitHub
   - Go to Settings → Secrets and variables → Actions

2. **Add Repository Secrets**:
   ```
   RENDER_DEPLOY_HOOK_URL = https://api.render.com/deploy/srv-xxxxxxxxx?key=yyyyyyyyyyy
   RENDER_SERVICE_URL = https://notes-app-backend-xxxx.onrender.com
   ```

3. **Optional Secrets for Advanced Features**:
   ```
   SLACK_WEBHOOK_URL = (for deployment notifications)
   DISCORD_WEBHOOK_URL = (for deployment notifications)
   ```

## 🔄 Step 5: Test the Deployment

1. **Make a Small Change**:
   - Edit any file (e.g., add a comment to `server.js`)
   - Commit and push to main branch

2. **Watch GitHub Actions**:
   - Go to your repository → Actions tab
   - You should see both CI and Deploy workflows running

3. **Verify Deployment**:
   - Check Render dashboard for new deployment
   - Test your API endpoints:
   ```bash
   curl https://your-app-url.onrender.com/
   curl https://your-app-url.onrender.com/health
   curl https://your-app-url.onrender.com/api/notes
   ```

## 🛠️ Step 6: Run Deployment Tests

Use our deployment test scripts to verify everything works:

### Windows (PowerShell):
```powershell
# Set your production URL
$env:RENDER_URL = "https://your-app-url.onrender.com"

# Run the test script
.\scripts\test-deployment.ps1
```

### Linux/Mac (Bash):
```bash
# Set your production URL
export RENDER_URL="https://your-app-url.onrender.com"

# Make script executable and run
chmod +x scripts/test-deployment.sh
./scripts/test-deployment.sh
```

## 📊 Monitoring and Troubleshooting

### GitHub Actions Logs:
- Check the Actions tab in your repository
- Look for failed workflows
- Review build and deployment logs

### Render Logs:
- Go to your service dashboard
- Check "Logs" tab for runtime errors
- Look for deployment status

### Common Issues:

1. **MongoDB Connection Failed**:
   - Verify connection string in Render environment variables
   - Check MongoDB Atlas network access settings
   - Ensure database user has correct permissions

2. **Deploy Hook Not Triggering**:
   - Verify the deploy hook URL in GitHub secrets
   - Check if CI workflow completed successfully
   - Review deploy workflow logs

3. **Build Failures**:
   - Check package.json dependencies
   - Verify Node.js version compatibility
   - Review build logs in Render dashboard

4. **Environment Variables**:
   - Ensure all required env vars are set in Render
   - Check for typos in variable names
   - Verify values are correct (no extra spaces)

## 🔐 Security Best Practices

1. **Never commit secrets** to your repository
2. **Use environment variables** for all sensitive data
3. **Regularly rotate** deploy hook URLs
4. **Monitor** deployment logs for security issues
5. **Use HTTPS** for all API communications

## 📈 Next Steps

After successful deployment:

1. **Set up frontend deployment** (Netlify/Vercel)
2. **Configure custom domain** (optional)
3. **Set up monitoring** (Render provides basic monitoring)
4. **Add deployment notifications** (Slack/Discord)
5. **Implement staging environment**
6. **Add database migrations** for schema changes

## 🚀 Deployment Commands Reference

```bash
# Test local setup
npm run install:all
npm run build:all
npm run test:all

# Manual deployment trigger (if needed)
curl -X POST $RENDER_DEPLOY_HOOK_URL

# Check deployment health
curl $RENDER_SERVICE_URL/health

# View deployment logs
# (Use Render dashboard)
```

## 📝 Workflow Summary

1. **Developer pushes code** → GitHub
2. **GitHub Actions CI** → Build & Test
3. **If CI passes** → Trigger Deploy workflow
4. **Deploy workflow** → Call Render deploy hook  
5. **Render** → Pull latest code & deploy
6. **Notification** → Deployment complete

This setup ensures that every code change goes through proper testing before deployment, maintaining code quality while enabling rapid iteration.