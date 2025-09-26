// Deployment validation script
console.log('🚀 Starting deployment validation...');
console.log('================================');

// Check Node.js version
console.log('Node.js version:', process.version);

// Check environment variables
console.log('Environment variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || 'not set');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'set' : 'not set');

// Check if required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'server.js',
  'package.json',
  'routes/notes.js',
  'models/Note.js'
];

console.log('\nChecking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`- ${file}: ${exists ? '✅ exists' : '❌ missing'}`);
});

// Check package.json scripts
try {
  const packageJson = require('./package.json');
  console.log('\nPackage.json scripts:');
  Object.keys(packageJson.scripts || {}).forEach(script => {
    console.log(`- ${script}: ${packageJson.scripts[script]}`);
  });
} catch (err) {
  console.error('❌ Error reading package.json:', err.message);
}

console.log('\n✅ Validation complete');
console.log('================================');

// Try connecting to MongoDB if URI is provided
if (process.env.MONGODB_URI) {
  console.log('Testing MongoDB connection...');
  const mongoose = require('mongoose');
  
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('✅ MongoDB connection test successful');
    mongoose.connection.close();
  }).catch(err => {
    console.error('❌ MongoDB connection test failed:', err.message);
  });
}