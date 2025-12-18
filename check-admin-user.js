const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Simple Mongoose User Schema for verification without importing the app's model (to isolate issues)
const userSchema = new mongoose.Schema({
  email: String,
  role: String,
  password: String
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function check() {
  let uri = 'mongodb://localhost:27017/ghali-dashboard'; // Default

  // Try to read .env
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/MONGODB_URI=(.+)/);
      if (match && match[1]) {
        uri = match[1].trim().replace(/["']/g, ''); // Remove quotes if any
        console.log('Found URI in .env:', uri);
      }
    }
  } catch (e) {
    console.log('Error reading .env, using default URI');
  }

  console.log('Connecting to:', uri);

  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const count = await User.countDocuments();
    console.log('User count:', count);

    const admin = await User.findOne({ email: 'admin@ghalipanda.gov.ng' });
    if (admin) {
      console.log('✅ Admin user found:', admin.email);
      console.log('Role:', admin.role);
    } else {
      console.log('❌ Admin user NOT found');
    }

  } catch (err) {
    console.error('❌ Database Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

check();