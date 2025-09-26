# Frontend-Backend Connection Test
# Test if frontend can successfully connect to backend API

Write-Host "🔗 Testing Frontend-Backend Connection..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location "frontend"

Write-Host "📡 Backend API URL: https://notes-app-backend3.onrender.com/api" -ForegroundColor Cyan

# Test backend connectivity
Write-Host "🧪 Testing backend endpoints..." -ForegroundColor Yellow

try {
    # Test main API endpoint
    $mainResponse = Invoke-WebRequest -Uri "https://notes-app-backend3.onrender.com/" -UseBasicParsing
    Write-Host "✅ Main API: $($mainResponse.StatusCode)" -ForegroundColor Green
    
    # Test health endpoint
    $healthResponse = Invoke-WebRequest -Uri "https://notes-app-backend3.onrender.com/health" -UseBasicParsing
    Write-Host "✅ Health Check: $($healthResponse.StatusCode)" -ForegroundColor Green
    
    # Test notes API
    $notesResponse = Invoke-WebRequest -Uri "https://notes-app-backend3.onrender.com/api/notes" -UseBasicParsing
    Write-Host "✅ Notes API: $($notesResponse.StatusCode)" -ForegroundColor Green
    
    Write-Host "🎉 All backend endpoints are working!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Backend connection failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Build frontend to test with updated API URL
Write-Host "🏗️  Building frontend with backend URL..." -ForegroundColor Yellow
npm run build

if (Test-Path "build") {
    Write-Host "✅ Frontend built successfully with backend API configured!" -ForegroundColor Green
    Write-Host "🔗 Frontend will connect to: https://notes-app-backend3.onrender.com/api" -ForegroundColor Cyan
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

# Go back to project root
Set-Location ".."

Write-Host "🚀 Frontend is ready to deploy to Netlify!" -ForegroundColor Magenta
Write-Host "💡 The frontend will automatically connect to your backend on Render." -ForegroundColor White