# Simple Notes App - CI/CD Learning Project

A minimal MERN stack application for learning CI/CD pipelines with GitHub Actions and Render.

## 🎯 Learning Objectives

- Understand basic CI/CD pipeline concepts
- Learn GitHub Actions workflows
- Practice automated deployment to Render
- See how code changes trigger automatic deployments

## 🏗️ Architecture

**Backend:** Simple Express.js API with MongoDB
**Frontend:** Basic React app (optional)
**Database:** MongoDB Atlas
**Hosting:** Render.com
**CI/CD:** GitHub Actions

## 📁 Project Structure

```
notes-app/
├── backend/
│   ├── server.js              # Simple Express server
│   ├── models/Note.js         # MongoDB note model
│   ├── routes/notes.js        # Notes API routes
│   └── package.json           # Dependencies
└── .github/workflows/
    ├── ci.yml                 # Run tests on PR/push
    └── cd.yml                 # Deploy to Render on push to main
```

## 🚀 API Endpoints

- `GET /` - API status and version
- `GET /health` - Health check for deployment monitoring
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Delete a note

## 🔄 CI/CD Pipeline

### Continuous Integration (CI)
When you create a PR or push to main:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run tests

### Continuous Deployment (CD)
When you push to main branch:
1. Install dependencies
2. Trigger Render deployment via webhook
3. Wait for deployment to complete
4. Test the deployed API

## 🧪 Testing the Pipeline

1. Make a code change (e.g., update version in server.js)
2. Push to main branch
3. Watch GitHub Actions run the pipeline
4. See your changes deployed automatically to Render

## 📝 Environment Variables

Set in GitHub repository secrets:
- `RENDER_DEPLOY_HOOK_URL` - Render deployment webhook
- `RENDER_SERVICE_URL` - Your deployed service URL

Set in Render dashboard:
- `MONGODB_URI` - MongoDB Atlas connection string

## 🎉 Success!

Your app is deployed at: https://notes-app-backend3.onrender.com

Try the endpoints:
- https://notes-app-backend3.onrender.com/
- https://notes-app-backend3.onrender.com/health
- https://notes-app-backend3.onrender.com/api/notes