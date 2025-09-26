# 🚀 Frontend Deployment to Netlify - Setup Guide

## Step 1: Test Frontend Build Locally
```powershell
# Run the test script from project root
.\scripts\test-frontend-build.ps1
```

## Step 2: Create Netlify Site

1. **Go to [Netlify](https://netlify.com)** and sign up/login
2. **Click "Add new site" → "Import an existing project"**
3. **Connect GitHub** and select your `cicd_learning` repository
4. **Configure build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
5. **Click "Deploy site"**

## Step 3: Get Netlify Credentials for GitHub Actions

### Get your Netlify Auth Token:
1. Go to **User Settings** → **Applications** → **Personal access tokens**
2. **Create new token** → Copy the token (keep it secure!)

### Get your Site ID:
1. Go to **Site Settings** → **General** → **Site details**
2. Copy the **Site ID**

## Step 4: Add GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:
```
NETLIFY_AUTH_TOKEN = your_netlify_auth_token
NETLIFY_SITE_ID = your_netlify_site_id
```

## Step 5: Test the Pipeline

1. **Make a change** to any file in `frontend/src/`
2. **Push to GitHub**
3. **Watch GitHub Actions** deploy automatically to Netlify
4. **Visit your Netlify URL** to see the changes

## 🎯 What Happens When You Push:

### Frontend Changes (in `frontend/` folder):
- ✅ Install dependencies
- ✅ Run tests  
- ✅ Build React app
- ✅ Deploy to Netlify
- ✅ Test deployment

### Backend Changes (in `backend/` folder):
- ✅ Install dependencies
- ✅ Deploy to Render via webhook
- ✅ Test deployment

## 🔗 Your Deployment URLs:
- **Backend (Render):** https://notes-app-backend3.onrender.com
- **Frontend (Netlify):** `https://your-site-name.netlify.app` (you'll get this after deployment)

Perfect CI/CD pipeline: **Code → GitHub → Automatic Deployment → Live Site!** 🎉