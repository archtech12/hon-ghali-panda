const mongoose = require('mongoose');
const About = require('./models/About');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sample about data
const sampleAboutData = {
  title: "About Hon. Suleiman Abdu Kwari",
  content: `<p>Hon. Suleiman Abdu Kwari was born on June 12, 1962, in Kaduna State, Nigeria. A dedicated advocate for community development and fiscal responsibility, Hon. Kwari served the nation as the Senator representing Kaduna North Senatorial District (2019-2023) on the platform of the All Progressives Congress (APC).</p>
  <p>His tenure is anchored in empowering youth, women, and families across his constituency—delivering vital support such as educational infrastructure, healthcare access, and economic-opportunity programmes. With a strong commitment to transparent access and service, Hon. Kwari brings his expertise as a former Commissioner of Finance to ensure resources are utilized effectively for the people.</p>
  <p>Hon. Kwari believes in harnessing the power of collective effort: his work builds on integrity, service, and the aspiration of a better future for Kaduna's communities. His story is one of service, integrity and hope.</p>`,
  imageUrl: "/suleiman-portrait.jpg",
  quickFacts: [
    { icon: 'badge', label: 'Position', value: 'Senator (Former)' },
    { icon: 'location_on', label: 'Constituency', value: 'Kaduna North Senatorial District' },
    { icon: 'calendar_today', label: 'Years of Service', value: '2019 - 2023' },
    { icon: 'groups', label: 'Party', value: 'All Progressives Congress (APC)' },
    { icon: 'cake', label: 'Born', value: 'June 12, 1962' },
    { icon: 'school', label: 'Expertise', value: 'Finance & Administration' }
  ],
  visionItems: [
    { icon: 'school', title: 'Youth Empowerment', description: 'Comprehensive skills acquisition and entrepreneurship training for young people in underserved communities.' },
    { icon: 'local_hospital', title: 'Community Health', description: 'Free medical checkups and health education programs for rural communities with limited healthcare access.' },
    { icon: 'home', title: 'Infrastructure', description: 'Building modern infrastructure to connect communities and drive economic development.' }
  ],
  coreValues: [
    'Integrity in public finance',
    'Transparency in governance',
    'Accountability to the people',
    'Equity in development distribution',
    'Education as a pillar of growth',
    'Community-first participation'
  ]
};

// Seed the database
const seedAboutData = async () => {
  try {
    // Check if data already exists
    const existingData = await About.findOne();

    if (existingData) {
      console.log('About data already exists. Updating...');
      await About.findByIdAndUpdate(existingData._id, sampleAboutData);
    } else {
      // Create new data
      const newData = new About(sampleAboutData);
      await newData.save();
    }

    console.log('About data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding about data:', error);
    process.exit(1);
  }
};

seedAboutData();