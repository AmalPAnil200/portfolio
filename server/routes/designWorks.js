const express = require('express');
const router = express.Router();
const {
  getDesignWorks,
  getDesignWorkById,
  createDesignWork,
  updateDesignWork,
  deleteDesignWork
} = require('../controllers/designWorkController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', getDesignWorks);
router.get('/:id', getDesignWorkById);

// Admin routes (protected)
router.post('/', authMiddleware, createDesignWork);
router.put('/:id', authMiddleware, updateDesignWork);
router.delete('/:id', authMiddleware, deleteDesignWork);

module.exports = router;