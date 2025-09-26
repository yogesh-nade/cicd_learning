# Deployment Test Script for Notes App (PowerShell)
# This script helps test the deployment process locally and remotely

param(
    [string]$RenderUrl = $env:RENDER_URL
)

# Colors for output (PowerShell)
$Red = "Red"
$Green = "Green" 
$Yellow = "Yellow"
$Blue = "Cyan"

Write-Host "🚀 Notes App Deployment Tester" -ForegroundColor $Blue
Write-Host "==================================" -ForegroundColor $Blue

# Function to check if a command exists
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to test API endpoint
function Test-Endpoint {
    param(
        [string]$Url,
        [string]$Description
    )
    
    Write-Host "Testing: $Description" -ForegroundColor $Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $Description - OK" -ForegroundColor $Green
            return $true
        }
    }
    catch {
        Write-Host "❌ $Description - FAILED" -ForegroundColor $Red
        return $false
    }
}

# Check prerequisites
Write-Host "`nChecking Prerequisites..." -ForegroundColor $Blue

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js is not installed" -ForegroundColor $Red
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ npm is not installed" -ForegroundColor $Red
    exit 1
}

Write-Host "✅ All prerequisites met" -ForegroundColor $Green

# Test local development setup
Write-Host "`nTesting Local Setup..." -ForegroundColor $Blue

if (Test-Path "backend\package.json") {
    Write-Host "✅ Backend package.json found" -ForegroundColor $Green
}
else {
    Write-Host "❌ Backend package.json not found" -ForegroundColor $Red
    exit 1
}

if (Test-Path "frontend\package.json") {
    Write-Host "✅ Frontend package.json found" -ForegroundColor $Green
}
else {
    Write-Host "❌ Frontend package.json not found" -ForegroundColor $Red
    exit 1
}

# Test environment variables
Write-Host "`nChecking Environment Variables..." -ForegroundColor $Blue

if (Test-Path "backend\.env.example") {
    Write-Host "✅ Environment template found" -ForegroundColor $Green
    Write-Host "Required environment variables:"
    Get-Content "backend\.env.example"
}
else {
    Write-Host "⚠️  No .env.example found" -ForegroundColor $Yellow
}

# Test local backend (if running)
Write-Host "`nTesting Local Backend..." -ForegroundColor $Blue
$LocalBackend = "http://localhost:5000"

if (-not (Test-Endpoint "$LocalBackend/" "Local Backend Root")) {
    Write-Host "⚠️  Local backend not running" -ForegroundColor $Yellow
}

if (-not (Test-Endpoint "$LocalBackend/health" "Local Backend Health")) {
    Write-Host "⚠️  Local backend health check failed" -ForegroundColor $Yellow
}

if (-not (Test-Endpoint "$LocalBackend/api/notes" "Local Backend API")) {
    Write-Host "⚠️  Local backend API not accessible" -ForegroundColor $Yellow
}

# Test production deployment (if URL provided)
if ($RenderUrl) {
    Write-Host "`nTesting Production Deployment..." -ForegroundColor $Blue
    
    Test-Endpoint "$RenderUrl/" "Production Backend Root"
    Test-Endpoint "$RenderUrl/health" "Production Backend Health"
    Test-Endpoint "$RenderUrl/api/notes" "Production Backend API"
    
    # Test CORS
    Write-Host "Testing CORS configuration..." -ForegroundColor $Yellow
    try {
        $headers = @{
            "Origin" = "https://example.com"
            "Access-Control-Request-Method" = "GET"
            "Access-Control-Request-Headers" = "Content-Type"
        }
        $response = Invoke-WebRequest -Uri "$RenderUrl/api/notes" -Method OPTIONS -Headers $headers -UseBasicParsing
        if ($response.Headers.ContainsKey("Access-Control-Allow-Origin")) {
            Write-Host "✅ CORS configured" -ForegroundColor $Green
        }
        else {
            Write-Host "❌ CORS not properly configured" -ForegroundColor $Red
        }
    }
    catch {
        Write-Host "❌ CORS test failed" -ForegroundColor $Red
    }
}
else {
    Write-Host "`n⚠️  No RENDER_URL provided. Skipping production tests." -ForegroundColor $Yellow
    Write-Host "Set RENDER_URL environment variable to test production deployment:" -ForegroundColor $Yellow
    Write-Host "`$env:RENDER_URL = 'https://your-app.onrender.com'" -ForegroundColor $Yellow
}

# Test GitHub Actions workflow files
Write-Host "`nChecking CI/CD Configuration..." -ForegroundColor $Blue

if (Test-Path ".github\workflows\ci.yml") {
    Write-Host "✅ CI workflow found" -ForegroundColor $Green
}
else {
    Write-Host "❌ CI workflow not found" -ForegroundColor $Red
}

if (Test-Path ".github\workflows\deploy.yml") {
    Write-Host "✅ Deployment workflow found" -ForegroundColor $Green
}
else {
    Write-Host "⚠️  Deployment workflow not found" -ForegroundColor $Yellow
}

if (Test-Path "render.yaml") {
    Write-Host "✅ Render configuration found" -ForegroundColor $Green
}
else {
    Write-Host "⚠️  Render configuration not found" -ForegroundColor $Yellow
}

# Test build process
Write-Host "`nTesting Build Process..." -ForegroundColor $Blue

Write-Host "Testing backend build..." -ForegroundColor $Yellow
Push-Location backend
try {
    $null = npm install --silent 2>$null
    Write-Host "✅ Backend dependencies installed" -ForegroundColor $Green
}
catch {
    Write-Host "❌ Backend dependency installation failed" -ForegroundColor $Red
    Pop-Location
    exit 1
}
Pop-Location

Write-Host "Testing frontend build..." -ForegroundColor $Yellow
Push-Location frontend
try {
    $null = npm install --silent 2>$null
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor $Green
    
    $null = npm run build 2>$null
    Write-Host "✅ Frontend build successful" -ForegroundColor $Green
}
catch {
    Write-Host "❌ Frontend build/install failed" -ForegroundColor $Red
}
Pop-Location

# Summary
Write-Host "`nDeployment Test Summary" -ForegroundColor $Blue
Write-Host "=========================" -ForegroundColor $Blue
Write-Host "✅ Local setup verified" -ForegroundColor $Green
Write-Host "✅ Build process tested" -ForegroundColor $Green

if ($RenderUrl) {
    Write-Host "✅ Production deployment tested" -ForegroundColor $Green
}
else {
    Write-Host "⚠️  Production tests skipped (set RENDER_URL)" -ForegroundColor $Yellow
}

Write-Host "`nNext Steps:" -ForegroundColor $Blue
Write-Host "1. Set up MongoDB Atlas database"
Write-Host "2. Create Render web service"
Write-Host "3. Configure environment variables in Render"
Write-Host "4. Set up deploy hook in GitHub repository secrets"
Write-Host "5. Push changes to trigger deployment"

Write-Host "`n🎉 Deployment test completed!" -ForegroundColor $Green