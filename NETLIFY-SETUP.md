# 🚀 Quick Netlify Setup for Auto-Deployment

## Step 1: Create Netlify Site
1. Go to [netlify.com](https://netlify.com) → Sign up/Login
2. **"Add new site"** → **"Import an existing project"**  
3. **Connect GitHub** → Select `cicd_learning` repository
4. **Build settings:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. **Deploy site**

## Step 2: Get Netlify Credentials
1. **Auth Token:** User Settings → Applications → Personal access tokens → Create new token
2. **Site ID:** Site Settings → General → Site details → Copy Site ID

## Step 3: Add GitHub Secrets
Go to GitHub repo → Settings → Secrets and variables → Actions → Add:
- `NETLIFY_AUTH_TOKEN` = your_auth_token
- `NETLIFY_SITE_ID` = your_site_id

## ✅ Done! Now frontend changes auto-deploy to Netlify!