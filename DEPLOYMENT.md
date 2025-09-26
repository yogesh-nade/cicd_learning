# Backend Deployment Guide - Render

This guide will help you deploy the Notes App backend to Render.

## 🚀 Quick Start - Automated Deployment (Recommended)

For automatic deployment via GitHub Actions, see: **[GITHUB_ACTIONS_DEPLOYMENT.md](./GITHUB_ACTIONS_DEPLOYMENT.md)**

This approach provides:
- ✅ Automatic deployment on every push to main
- 🔍 Pre-deployment verification
- 🧪 Health checks and API testing
- 📊 Deployment summaries
- 🛡️ Better error handling

## Manual Deployment Steps

If you prefer manual deployment:

### Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub (✅ Already done)
2. **MongoDB Atlas Account**: You'll need a cloud MongoDB database
3. **Render Account**: Sign up at [render.com](https://render.com)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (choose the free tier)
4. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Create username and password (save these!)
5. Set up network access:
   - Go to Network Access
   - Add IP Address
   - Choose "Allow access from anywhere" (0.0.0.0/0) for Render deployment
6. Get your connection string:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/notesapp`)

## Step 2: Deploy to Render

### Option 1: Using Render Dashboard (Recommended)

1. **Sign up/Login to Render**: Go to [render.com](https://render.com)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your `cicd_learning` repository

3. **Configure the Service**:
   - **Name**: `notes-app-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Set Environment Variables**:
   - Click "Advanced" → "Add Environment Variable"
   - Add these variables:
     ```
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/notesapp
     ```
   - Replace the MongoDB URI with your actual Atlas connection string

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for the deployment to complete (5-10 minutes)

### Option 2: Using render.yaml (Auto-deployment)

1. The `render.yaml` file is already created in your project root
2. In Render dashboard, when creating the service, it will automatically detect the configuration
3. You'll still need to manually set the `MONGODB_URI` environment variable in the dashboard

## Step 3: Test Your Deployment

1. Once deployed, Render will provide you with a URL like: `https://notes-app-backend-xxxx.onrender.com`

2. Test the API endpoints:
   ```
   GET https://your-app-url.onrender.com/
   GET https://your-app-url.onrender.com/api/notes
   POST https://your-app-url.onrender.com/api/notes
   ```

3. You can test using curl or a tool like Postman:
   ```bash
   curl https://your-app-url.onrender.com/
   curl https://your-app-url.onrender.com/api/notes
   ```

## Step 4: Update Frontend (Later)

Once the backend is deployed, you'll need to update your frontend to use the production API URL instead of `http://localhost:5000`.

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Check your MongoDB Atlas connection string
   - Ensure network access is set to allow all IPs (0.0.0.0/0)
   - Verify database user credentials

2. **Build Failures**:
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Check Node.js version compatibility

3. **Service Not Starting**:
   - Verify the start command is correct: `npm start`
   - Check that `server.js` exists in the backend directory
   - Review application logs in Render dashboard

### Render Free Tier Limitations:
- Apps sleep after 15 minutes of inactivity
- First request after sleeping may take 30+ seconds
- 750 hours per month (sufficient for development)

## Next Steps

After backend deployment:
1. Update CI/CD pipeline to include deployment
2. Deploy frontend to Render/Netlify/Vercel
3. Update frontend API endpoints to use production URLs
4. Set up custom domain (optional)

## Environment Variables Reference

```
NODE_ENV=production
PORT=5000 (automatically set by Render)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp
```

## Useful Commands for Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start

# Test API locally
curl http://localhost:5000/
curl http://localhost:5000/api/notes
```