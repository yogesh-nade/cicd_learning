# MERN Notes App with CI/CD Pipeline

A full-stack notes application built with the MERN stack, featuring automated CI/CD deployment.

## 🚀 Live Application

**Production URL**: https://notes-app-backend3.onrender.com

## ✨ Features

### 📝 Notes Management
- Create, read, update, and delete notes
- Real-time synchronization with MongoDB Atlas
- Responsive web interface

### 🔧 System Monitoring
- Health check endpoints (`/health`)
- System status monitoring (`/api/status`)
- Performance metrics (`/api/status/metrics`)
- Simple ping endpoint (`/api/status/ping`)

### 🚀 Professional DevOps
- **Automated CI/CD Pipeline** with GitHub Actions
- **Production Deployment** on Render.com
- **Database Hosting** on MongoDB Atlas
- **Automated Testing** and security scanning
- **Zero-downtime deployments**

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React.js      │────│   Express.js     │────│  MongoDB Atlas  │
│   Frontend      │    │   Backend API    │    │   Database      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                       ┌──────▼──────┐
                       │   Render    │
                       │  Hosting    │
                       └─────────────┘
```

## 🔄 CI/CD Pipeline

```
Push Code → GitHub Actions CI → Tests Pass → Auto-Deploy → Live ✅
    │              │               │             │
    │         Build & Test     Security Scan   Render
    │         Backend/Frontend     npm audit   Deployment
    │
   Git Push to main branch
```

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create new note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |
| GET | `/api/status` | System status |
| GET | `/api/status/ping` | Simple ping |
| GET | `/api/status/metrics` | System metrics |

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB connection string

### Setup
```bash
# Clone repository
git clone https://github.com/yogesh-nade/cicd_learning.git
cd notes-app

# Backend setup
cd backend
npm install
# Add .env file with MONGODB_URI
npm run dev

# Frontend setup (in new terminal)
cd frontend  
npm install
npm start
```

## 🚀 Deployment

This project uses **automated deployment**:

1. **Push to main branch** triggers CI/CD pipeline
2. **GitHub Actions** runs tests and builds
3. **Render** automatically deploys on success
4. **Live in 2-3 minutes** 🎉

For deployment setup details, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🧪 Testing the Pipeline

To test the CI/CD pipeline:
1. Make any code change
2. Commit and push to main branch
3. Watch GitHub Actions tab for pipeline status
4. Check production URL for live changes

## 📁 Project Structure

```
notes-app/
├── .github/workflows/    # CI/CD pipeline definitions
├── backend/             # Express.js API server
│   ├── models/         # MongoDB schemas  
│   ├── routes/         # API route handlers
│   └── server.js       # Main server file
├── frontend/           # React application
├── docs/              # Documentation
└── scripts/           # Deployment utilities
```

## 🏆 Key Achievements

✅ **Full-Stack MERN Application**  
✅ **Professional CI/CD Pipeline**  
✅ **Automated Testing & Security Scanning**  
✅ **Production Deployment on Render**  
✅ **MongoDB Atlas Integration**  
✅ **Health Monitoring & Metrics**  
✅ **Zero-Downtime Deployments**  

---

**Built with ❤️ using MERN Stack + GitHub Actions + Render.com**