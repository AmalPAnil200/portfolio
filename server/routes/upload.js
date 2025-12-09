const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

// Upload a single image file
router.post('/image', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the full public URL so the frontend can use it
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const publicUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      filePath: publicUrl,
      fileName: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'File upload failed' });
  }
});

module.exports = router;