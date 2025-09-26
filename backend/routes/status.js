const express = require('express');
const router = express.Router();

// GET /api/status - System status endpoint
router.get('/', (req, res) => {
  const status = {
    service: 'Notes API',
    status: 'healthy',
    version: '1.0.3',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    features: {
      notes: 'enabled',
      health_check: 'enabled',
      status_monitoring: 'enabled'
    },
    system: {
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      },
      node_version: process.version
    },
    deployment: {
      method: 'github-actions-cicd',
      auto_deploy: true,
      last_deployed: new Date().toISOString()
    }
  };

  res.json(status);
});

// GET /api/status/ping - Simple ping endpoint
router.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
    timestamp: new Date().toISOString(),
    server: 'notes-api'
  });
});

// GET /api/status/metrics - Basic metrics endpoint
router.get('/metrics', (req, res) => {
  const metrics = {
    uptime_seconds: Math.floor(process.uptime()),
    memory_usage_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    cpu_usage: process.cpuUsage(),
    requests_handled: 'tracking_not_implemented',
    database_status: 'connected', // This could be dynamic
    last_check: new Date().toISOString()
  };

  res.json(metrics);
});

module.exports = router;