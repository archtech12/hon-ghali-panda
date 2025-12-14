const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const sampleProjects = [
  {
    title: "Community School Construction",
    description: "Building a new community school to provide quality education for local children.",
    category: "Education",
    status: "Ongoing",
    year: "2024",
    priority: 8
  },
  {
    title: "Rural Healthcare Initiative",
    description: "Establishing healthcare facilities in rural areas to improve access to medical services.",
    category: "Healthcare",
    status: "Planned",
    year: "2025",
    priority: 9
  },
  {
    title: "Road Infrastructure Development",
    description: "Construction and rehabilitation of roads to improve transportation and connectivity.",
    category: "Infrastructure",
    status: "Completed",
    year: "2023",
    priority: 7
  }
];

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard';
    console.log('Connecting to:', uri.replace(/:([^:@]+)@/, ':****@'));

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Project.deleteMany();
    console.log('Cleared existing projects');

    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`Created ${createdProjects.length} sample projects`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

seed();