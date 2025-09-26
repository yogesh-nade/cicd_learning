# Frontend Deployment Test Script
# Test the frontend build locally before deploying

Write-Host "🏗️  Testing Frontend Build..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location "frontend"

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
npm test -- --coverage --watchAll=false

# Build the app
Write-Host "🔨 Building app..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (Test-Path "build") {
    Write-Host "✅ Build successful! Ready for Netlify deployment." -ForegroundColor Green
    Write-Host "📁 Build files created in: frontend/build/" -ForegroundColor Cyan
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Go back to project root
Set-Location ".."

Write-Host "🚀 Next steps:" -ForegroundColor Magenta
Write-Host "1. Go to https://netlify.com and create a new site" -ForegroundColor White
Write-Host "2. Connect your GitHub repository" -ForegroundColor White
Write-Host "3. Set build settings: Base directory = frontend, Build command = npm run build, Publish directory = build" -ForegroundColor White
Write-Host "4. Add your NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID to GitHub Secrets" -ForegroundColor White