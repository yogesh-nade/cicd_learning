# 📝 Notes App - Simple CI/CD Learning Project

A minimalist MERN stack application demonstrating automated CI/CD pipelines with GitHub Actions.

## 🎯 Purpose
Learn CI/CD fundamentals through hands-on practice with:
- **GitHub Actions** workflows
- **Automated deployments** to production
- **Full-stack** backend + frontend deployment

## 🏗️ Simple Architecture

```
📁 notes-app/
├── 🔧 backend/          # Express.js API → Deployed to Render
├── ⚛️  frontend/         # React App → Deployed to Netlify  
└── 🤖 .github/workflows/ # CI/CD Automation
```

## 🚀 Live Deployments

- **Backend API:** https://notes-app-backend3.onrender.com
- **Frontend App:** https://your-site.netlify.app *(after setup)*

## ⚡ Quick Start

1. **Clone & Setup:**
   ```bash
   git clone [your-repo]
   cd notes-app
   ```

2. **Test Locally:**
   ```bash
   # Backend
   cd backend && npm install && npm start
   
   # Frontend (new terminal)
   cd frontend && npm install && npm start
   ```

3. **Deploy:** Push to `main` branch - automatic deployment!

## 🔄 CI/CD Pipeline

### When you push to `main`:

**Backend Changes** (`backend/**`):
- ✅ Install dependencies
- ✅ Deploy to Render via webhook
- ✅ Test deployment

**Frontend Changes** (`frontend/**`):
- ✅ Install dependencies  
- ✅ Run tests
- ✅ Build React app
- ✅ Deploy to Netlify
- ✅ Test deployment

## 🧪 Try It Out

1. **Edit the version** in `backend/server.js`
2. **Push to GitHub**
3. **Watch GitHub Actions** deploy automatically
4. **See changes live** at your deployment URLs!

## 🎉 Perfect for Learning

- **Simple codebase** - Easy to understand
- **Real deployments** - Production hosting platforms
- **Automated pipeline** - Modern CI/CD practices
- **Instant feedback** - See changes live in minutes

Start experimenting and learn CI/CD by doing! 🚀