const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { sequelize } = require('../config/db');

// Check if MySQL is connected
const isMySQLConnected = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

app.use(cors({
  origin: 'https://portfolio-lake-omega-60.vercel.app',
  credentials: true // if you need cookies/auth
}));

// For fallback mode, we'll use a simple in-memory admin
const fallbackAdmin = {
  id: 1,
  username: 'admin',
  password: '$2a$10$8K1p/a0dhrxiowP.dnkgNORTWgdEDHn5L2/xjpEWuC.QQv4rKO9jO' // bcrypt hash for 'admin123'
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const isConnected = await isMySQLConnected();
    console.log('Database connection status:', isConnected);
    
    if (isConnected) {
      // Check if admin exists
      const admin = await Admin.findOne({ where: { username } });
      console.log('Admin found in database:', admin);
      
      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials - User not found' });
      }
      
      // Check password
      const isMatch = await admin.comparePassword(password);
      console.log('Password match:', isMatch);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials - Incorrect password' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: admin.id },
        process.env.JWT_SECRET || 'ornamental_shop_secret',
        { expiresIn: '7d' }
      );
      
      res.json({
        success: true,
        token,
        admin: {
          id: admin.id,
          username: admin.username
        }
      });
    } else {
      // Fallback to in-memory admin
      console.log('Using fallback mode with in-memory admin');
      console.log('Received credentials - Username:', username, 'Password:', password);
      console.log('Expected credentials - Username: admin Password: admin123');
      
      // In a real implementation, you would bcrypt compare the password
      // For simplicity in fallback mode, we'll just check if username and password match
      if (username === 'admin' && password === 'admin123') {
        // Generate JWT token
        const token = jwt.sign(
          { id: fallbackAdmin.id },
          process.env.JWT_SECRET || 'ornamental_shop_secret',
          { expiresIn: '7d' }
        );
        
        res.json({
          success: true,
          token,
          admin: {
            id: fallbackAdmin.id,
            username: fallbackAdmin.username
          }
        });
      } else {
        return res.status(400).json({ message: 'Invalid credentials - Fallback mode: Check username/password' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register admin (for initial setup only)
const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ where: { username } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      
      // Create new admin
      const admin = await Admin.create({
        username,
        password
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { id: admin.id },
        process.env.JWT_SECRET || 'ornamental_shop_secret',
        { expiresIn: '7d' }
      );
      
      res.status(201).json({
        success: true,
        token,
        admin: {
          id: admin.id,
          username: admin.username
        }
      });
    } else {
      // In fallback mode, registration is not supported
      res.status(400).json({ message: 'Registration not supported in fallback mode' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const admin = await Admin.findByPk(req.admin.id, { attributes: { exclude: ['password'] } });
      res.json(admin);
    } else {
      // Fallback to in-memory admin
      res.json({
        id: fallbackAdmin.id,
        username: fallbackAdmin.username
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  adminLogin,
  registerAdmin,
  getAdminProfile
};