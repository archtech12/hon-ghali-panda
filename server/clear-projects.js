const mongoose = require('mongoose');
const Project = require('./models/Project');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB with timeout settings
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard';

console.log('Connecting to MongoDB...');
console.log('Database:', MONGODB_URI.includes('ghali-dashboard') ? 'ghali-dashboard' : 'unknown');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  clearProjects();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Clear all projects
const clearProjects = async () => {
  try {
    console.log('\nDeleting all projects from database...');
    const result = await Project.deleteMany({});
    console.log(`\n✅ Successfully deleted ${result.deletedCount} projects from ghali-dashboard`);
    console.log('All incorrect projects have been removed.');
    console.log('You can now add Dr. Ghali\'s actual projects from the admin panel.\n');
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing projects:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};
