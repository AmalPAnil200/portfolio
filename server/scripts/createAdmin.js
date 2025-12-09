const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const { connectDB } = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { username: 'admin' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create new admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123' // In production, use a strong password
    });
    
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123 (change this in production!)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();