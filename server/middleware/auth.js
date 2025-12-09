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

// For fallback mode, we'll use a simple in-memory admin
const fallbackAdmin = {
  id: 1,
  username: 'admin'
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ornamental_shop_secret');
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const admin = await Admin.findByPk(decoded.id);
      
      if (!admin) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
      
      req.admin = admin;
    } else {
      // Fallback to in-memory admin
      if (decoded.id !== fallbackAdmin.id) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
      
      req.admin = fallbackAdmin;
    }
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;