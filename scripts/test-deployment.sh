#!/bin/bash

# Deployment Test Script for Notes App
# This script helps test the deployment process locally and remotely

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Notes App Deployment Tester${NC}"
echo "=================================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to test API endpoint
test_endpoint() {
    local url=$1
    local description=$2
    echo -e "${YELLOW}Testing: $description${NC}"
    
    if curl -s -f "$url" > /dev/null; then
        echo -e "${GREEN}✅ $description - OK${NC}"
        return 0
    else
        echo -e "${RED}❌ $description - FAILED${NC}"
        return 1
    fi
}

# Check prerequisites
echo -e "\n${BLUE}Checking Prerequisites...${NC}"

if ! command_exists curl; then
    echo -e "${RED}❌ curl is not installed${NC}"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites met${NC}"

# Test local development setup
echo -e "\n${BLUE}Testing Local Setup...${NC}"

if [ -f "backend/package.json" ]; then
    echo -e "${GREEN}✅ Backend package.json found${NC}"
else
    echo -e "${RED}❌ Backend package.json not found${NC}"
    exit 1
fi

if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✅ Frontend package.json found${NC}"
else
    echo -e "${RED}❌ Frontend package.json not found${NC}"
    exit 1
fi

# Test environment variables
echo -e "\n${BLUE}Checking Environment Variables...${NC}"

if [ -f "backend/.env.example" ]; then
    echo -e "${GREEN}✅ Environment template found${NC}"
    echo "Required environment variables:"
    cat backend/.env.example
else
    echo -e "${YELLOW}⚠️  No .env.example found${NC}"
fi

# Test local backend (if running)
echo -e "\n${BLUE}Testing Local Backend...${NC}"
LOCAL_BACKEND="http://localhost:5000"

test_endpoint "$LOCAL_BACKEND/" "Local Backend Root" || echo -e "${YELLOW}⚠️  Local backend not running${NC}"
test_endpoint "$LOCAL_BACKEND/health" "Local Backend Health" || echo -e "${YELLOW}⚠️  Local backend health check failed${NC}"
test_endpoint "$LOCAL_BACKEND/api/notes" "Local Backend API" || echo -e "${YELLOW}⚠️  Local backend API not accessible${NC}"

# Test production deployment (if URL provided)
if [ ! -z "$RENDER_URL" ]; then
    echo -e "\n${BLUE}Testing Production Deployment...${NC}"
    
    test_endpoint "$RENDER_URL/" "Production Backend Root"
    test_endpoint "$RENDER_URL/health" "Production Backend Health"
    test_endpoint "$RENDER_URL/api/notes" "Production Backend API"
    
    # Test CORS
    echo -e "${YELLOW}Testing CORS configuration...${NC}"
    curl -s -H "Origin: https://example.com" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: Content-Type" -X OPTIONS "$RENDER_URL/api/notes" | grep -q "Access-Control-Allow-Origin" && echo -e "${GREEN}✅ CORS configured${NC}" || echo -e "${RED}❌ CORS not properly configured${NC}"
else
    echo -e "\n${YELLOW}⚠️  No RENDER_URL provided. Skipping production tests.${NC}"
    echo -e "Set RENDER_URL environment variable to test production deployment:"
    echo -e "export RENDER_URL=https://your-app.onrender.com"
fi

# Test GitHub Actions workflow files
echo -e "\n${BLUE}Checking CI/CD Configuration...${NC}"

if [ -f ".github/workflows/ci.yml" ]; then
    echo -e "${GREEN}✅ CI workflow found${NC}"
else
    echo -e "${RED}❌ CI workflow not found${NC}"
fi

if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "${GREEN}✅ Deployment workflow found${NC}"
else
    echo -e "${YELLOW}⚠️  Deployment workflow not found${NC}"
fi

if [ -f "render.yaml" ]; then
    echo -e "${GREEN}✅ Render configuration found${NC}"
else
    echo -e "${YELLOW}⚠️  Render configuration not found${NC}"
fi

# Test build process
echo -e "\n${BLUE}Testing Build Process...${NC}"

echo -e "${YELLOW}Testing backend build...${NC}"
cd backend
if npm install --silent; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Backend dependency installation failed${NC}"
    cd ..
    exit 1
fi
cd ..

echo -e "${YELLOW}Testing frontend build...${NC}"
cd frontend
if npm install --silent; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Frontend dependency installation failed${NC}"
    cd ..
    exit 1
fi

if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
fi
cd ..

# Summary
echo -e "\n${BLUE}Deployment Test Summary${NC}"
echo "========================="
echo -e "${GREEN}✅ Local setup verified${NC}"
echo -e "${GREEN}✅ Build process tested${NC}"

if [ ! -z "$RENDER_URL" ]; then
    echo -e "${GREEN}✅ Production deployment tested${NC}"
else
    echo -e "${YELLOW}⚠️  Production tests skipped (set RENDER_URL)${NC}"
fi

echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Set up MongoDB Atlas database"
echo "2. Create Render web service"
echo "3. Configure environment variables in Render"
echo "4. Set up deploy hook in GitHub repository secrets"
echo "5. Push changes to trigger deployment"

echo -e "\n${GREEN}🎉 Deployment test completed!${NC}"