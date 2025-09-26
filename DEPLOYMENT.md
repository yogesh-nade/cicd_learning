# Deployment Guide

## 🚀 Current Deployment Status

✅ **Fully Automated CI/CD Pipeline Active**
- **Production URL**: https://notes-app-backend3.onrender.com
- **Auto-deployment**: Every push to main branch
- **Platform**: Render.com
- **Database**: MongoDB Atlas

## 📋 Available Endpoints

- `GET /` - API information and version
- `GET /health` - Health check with uptime and database status
- `GET /api/notes` - Notes CRUD operations (GET, POST, PUT, DELETE)
- `GET /api/status` - System status and configuration
- `GET /api/status/ping` - Simple ping/pong health check
- `GET /api/status/metrics` - System metrics (uptime, memory, CPU)

## 🔄 How Deployment Works

1. **Push code** to main branch
2. **GitHub Actions CI** runs automatically (build, test, security scan)
3. **GitHub Actions CD** triggers Render deployment via deploy hook
4. **Render** pulls latest code and redeploys
5. **New version** is live within 2-3 minutes

## 🛠️ For Setup Details

If you need to set up this pipeline from scratch, see the detailed guide:
**[docs/GITHUB_ACTIONS_DEPLOYMENT.md](docs/GITHUB_ACTIONS_DEPLOYMENT.md)**

## 🧪 Testing Deployment

To test if deployment is working:
```bash
curl https://notes-app-backend3.onrender.com/
curl https://notes-app-backend3.onrender.com/health
curl https://notes-app-backend3.onrender.com/api/status/ping
```

## 🔐 Environment Variables

The following environment variables are configured in Render:
- `NODE_ENV=production`
- `MONGODB_URI` (MongoDB Atlas connection string)
- `PORT` (automatically set by Render)