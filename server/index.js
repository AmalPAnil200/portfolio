const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection
const { connectDB } = require('./config/db');
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
const projectRoutes = require('./routes/projects');
const designWorkRoutes = require('./routes/designWorks');
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

app.use('/api/projects', projectRoutes);
app.use('/api/design-works', designWorkRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Catch-all handler: Send React app for any non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});