# Simple API Test Script
param([string]$BaseUrl = "https://notes-app-backend3.onrender.com")

Write-Host "🧪 Testing Notes App API" -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl" -ForegroundColor Gray
Write-Host ""

# Test endpoints
$endpoints = @(
    @{ Path = "/"; Name = "Root API" },
    @{ Path = "/health"; Name = "Health Check" },
    @{ Path = "/api/notes"; Name = "Notes API" },
    @{ Path = "/api/status"; Name = "Status API" },
    @{ Path = "/api/status/ping"; Name = "Ping Test" }
)

$passed = 0
$total = $endpoints.Count

foreach ($endpoint in $endpoints) {
    $url = "$BaseUrl$($endpoint.Path)"
    Write-Host "Testing $($endpoint.Name): " -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ OK" -ForegroundColor Green
            $passed++
        } else {
            Write-Host "❌ HTTP $($response.StatusCode)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "❌ FAILED" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Results: $passed/$total endpoints working" -ForegroundColor $(if ($passed -eq $total) { "Green" } else { "Yellow" })

if ($passed -eq $total) {
    Write-Host "🎉 All tests passed! Deployment is working correctly." -ForegroundColor Green
} else {
    Write-Host "⚠️  Some tests failed. Check deployment status." -ForegroundColor Yellow
}