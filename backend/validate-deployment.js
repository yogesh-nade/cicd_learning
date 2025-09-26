// Simple deployment validation
console.log('🚀 Deployment validation starting...');

// Check essentials
console.log('Node.js version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('MongoDB URI:', process.env.MONGODB_URI ? '✅ configured' : '❌ missing');

// Quick MongoDB connection test
if (process.env.MONGODB_URI) {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('✅ MongoDB connection test successful');
    mongoose.connection.close();
  }).catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
}

console.log('✅ Validation complete');