const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const aboutRoutes = require('./routes/about');
const projectsRoutes = require('./routes/projects');
const newsRoutes = require('./routes/news');
const constituencyRoutes = require('./routes/constituency');
const legislativeRoutes = require('./routes/legislative');
const contactRoutes = require('./routes/contact');
const mediaRoutes = require('./routes/media');
const uploadRoutes = require('./routes/upload');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Connect to MongoDB with fallback
const connectDB = async () => {
  try {
    // Try to connect to MongoDB Atlas first
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB Atlas connection error:', err.message);
    console.log('Falling back to local MongoDB instance...');
    
    try {
      // Fallback to local MongoDB
      await mongoose.connect('mongodb://localhost:27017/ghali-dashboard', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to local MongoDB');
    } catch (localErr) {
      console.error('Local MongoDB connection error:', localErr.message);
      console.log('Starting server without database connection...');
    }
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/constituency', constituencyRoutes);
app.use('/api/legislative', legislativeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Ghali Dashboard API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});