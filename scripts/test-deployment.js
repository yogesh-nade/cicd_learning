#!/usr/bin/env node

/**
 * Deployment Test Script
 * Tests API endpoints to verify deployment
 */

const https = require('https');
const http = require('http');

const SERVICE_URL = process.env.RENDER_SERVICE_URL || process.argv[2];

if (!SERVICE_URL) {
  console.error('❌ Please provide service URL:');
  console.error('Usage: node test-deployment.js <service-url>');
  console.error('Example: node test-deployment.js https://your-app.onrender.com');
  process.exit(1);
}

const isHttps = SERVICE_URL.startsWith('https');
const client = isHttps ? https : http;

function testEndpoint(path, description) {
  return new Promise((resolve) => {
    const url = `${SERVICE_URL}${path}`;
    console.log(`🔍 Testing ${description}: ${path}`);
    
    const startTime = Date.now();
    
    client.get(url, (res) => {
      const duration = Date.now() - startTime;
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ ${description} - ${res.statusCode} (${duration}ms)`);
          try {
            const json = JSON.parse(data);
            if (path === '/health') {
              console.log(`   Database: ${json.database || 'unknown'}`);
              console.log(`   Uptime: ${json.uptime || 'unknown'}s`);
            }
          } catch (e) {
            // Not JSON, that's okay
          }
          resolve({ success: true, status: res.statusCode, duration });
        } else {
          console.log(`❌ ${description} - ${res.statusCode} (${duration}ms)`);
          resolve({ success: false, status: res.statusCode, duration });
        }
      });
    }).on('error', (err) => {
      const duration = Date.now() - startTime;
      console.log(`❌ ${description} - Error: ${err.message} (${duration}ms)`);
      resolve({ success: false, error: err.message, duration });
    });
  });
}

async function runTests() {
  console.log(`🚀 Testing deployment: ${SERVICE_URL}`);
  console.log('=' .repeat(50));
  
  const tests = [
    { path: '/', description: 'Root endpoint' },
    { path: '/health', description: 'Health check' },
    { path: '/api/notes', description: 'Notes API' }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await testEndpoint(test.path, test.description);
    results.push({ ...test, ...result });
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('=' .repeat(50));
  console.log('📊 Test Summary:');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed tests:');
    failed.forEach(test => {
      console.log(`   ${test.path} - ${test.error || test.status}`);
    });
  }
  
  const avgDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0) / results.length;
  console.log(`⏱️  Average response time: ${Math.round(avgDuration)}ms`);
  
  if (successful.length === results.length) {
    console.log('\n🎉 All tests passed! Deployment is working correctly.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Check the deployment.');
    process.exit(1);
  }
}

runTests().catch(console.error);