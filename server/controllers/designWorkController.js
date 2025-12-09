const DesignWork = require('../models/DesignWork');
const { sequelize } = require('../config/db');

// In-memory storage for fallback
let designWorks = [
  {
    id: 1,
    title: "Modern Logo Design",
    description: "Clean and modern logo design for a tech startup.",
    imageUrl: "/images/design1.jpg",
    category: "Logo Design",
    tags: ["logo", "branding", "modern"],
    createdAt: new Date()
  },
  {
    id: 2,
    title: "UI Kit for Mobile App",
    description: "Complete UI kit for a fitness tracking mobile application.",
    imageUrl: "/images/design2.jpg",
    category: "UI Design",
    tags: ["ui", "mobile", "fitness"],
    createdAt: new Date()
  }
];
let nextDesignWorkId = 3;

// Check if MySQL is connected
const isMySQLConnected = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

// Get all design works
const getDesignWorks = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const designWorks = await DesignWork.findAll({ order: [['createdAt', 'DESC']] });
      
      // Convert relative image URLs to full public URLs
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const designWorksWithFullUrls = designWorks.map(designWork => {
        const designWorkObj = designWork.toJSON ? designWork.toJSON() : designWork;
        if (designWorkObj.imageUrl && designWorkObj.imageUrl.startsWith('/uploads/')) {
          designWorkObj.imageUrl = `${baseUrl}${designWorkObj.imageUrl}`;
        }
        return designWorkObj;
      });
      
      res.json(designWorksWithFullUrls);
    } else {
      // Fallback to in-memory data
      res.json(designWorks);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get design work by ID
const getDesignWorkById = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const designWork = await DesignWork.findByPk(req.params.id);
      if (!designWork) {
        return res.status(404).json({ message: 'Design work not found' });
      }
      
      // Convert relative image URL to full public URL
      const designWorkObj = designWork.toJSON ? designWork.toJSON() : designWork;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      if (designWorkObj.imageUrl && designWorkObj.imageUrl.startsWith('/uploads/')) {
        designWorkObj.imageUrl = `${baseUrl}${designWorkObj.imageUrl}`;
      }
      
      res.json(designWorkObj);
    } else {
      // Fallback to in-memory data
      const designWork = designWorks.find(d => d.id == req.params.id);
      if (!designWork) {
        return res.status(404).json({ message: 'Design work not found' });
      }
      res.json(designWork);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new design work
const createDesignWork = async (req, res) => {
  try {
    const { title, description, imageUrl, category, tags } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const designWork = await DesignWork.create({
        title,
        description,
        imageUrl,
        category,
        tags
      });
      res.status(201).json(designWork);
    } else {
      // Fallback to in-memory data
      const designWork = {
        id: nextDesignWorkId++,
        title,
        description,
        imageUrl,
        category,
        tags,
        createdAt: new Date()
      };
      designWorks.push(designWork);
      res.status(201).json(designWork);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a design work
const updateDesignWork = async (req, res) => {
  try {
    const { title, description, imageUrl, category, tags } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const [updatedRowsCount, updatedDesignWorks] = await DesignWork.update(
        { title, description, imageUrl, category, tags },
        { where: { id: req.params.id }, returning: true }
      );
      
      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: 'Design work not found' });
      }
      
      res.json(updatedDesignWorks[0]);
    } else {
      // Fallback to in-memory data
      const designWorkIndex = designWorks.findIndex(d => d.id == req.params.id);
      if (designWorkIndex === -1) {
        return res.status(404).json({ message: 'Design work not found' });
      }
      
      designWorks[designWorkIndex] = {
        ...designWorks[designWorkIndex],
        title,
        description,
        imageUrl,
        category,
        tags
      };
      
      res.json(designWorks[designWorkIndex]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a design work
const deleteDesignWork = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const designWork = await DesignWork.findByPk(req.params.id);
      
      if (!designWork) {
        return res.status(404).json({ message: 'Design work not found' });
      }
      
      await designWork.destroy();
      res.json({ message: 'Design work removed' });
    } else {
      // Fallback to in-memory data
      const designWorkIndex = designWorks.findIndex(d => d.id == req.params.id);
      if (designWorkIndex === -1) {
        return res.status(404).json({ message: 'Design work not found' });
      }
      
      const deletedDesignWork = designWorks.splice(designWorkIndex, 1);
      res.json({ message: 'Design work removed', designWork: deletedDesignWork[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDesignWorks,
  getDesignWorkById,
  createDesignWork,
  updateDesignWork,
  deleteDesignWork
};