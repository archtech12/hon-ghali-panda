const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary Configuration:');
console.log('- Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? '✓ Set' : '✗ Not set');
console.log('- API Key:', process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Not set');
console.log('- API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Not set');

// Test ping
cloudinary.api.ping()
  .then(result => {
    console.log('\n✅ Cloudinary Connection Test: SUCCESS');
    console.log('Response:', result);
  })
  .catch(error => {
    console.log('\n❌ Cloudinary Connection Test: FAILED');
    console.log('Error:', error.message);
  });