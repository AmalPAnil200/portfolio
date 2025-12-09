const express = require('express');
const router = express.Router();
const {
  adminLogin,
  registerAdmin,
  getAdminProfile
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/login', adminLogin);
router.post('/register', registerAdmin); // For initial setup only

// Protected routes
router.get('/profile', authMiddleware, getAdminProfile);

module.exports = router;