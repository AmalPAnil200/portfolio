const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

// Public route for contact form submission
router.post('/', createContact);

// Admin routes (protected)
router.get('/', authMiddleware, getContacts);
router.get('/:id', authMiddleware, getContactById);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;