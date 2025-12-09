const Service = require('../models/Service');
const { sequelize } = require('../config/db');

// In-memory storage for fallback
let services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom website development with modern technologies and responsive design.",
    icon: "💻",
    features: ["Responsive Design", "SEO Optimization", "Performance Optimization"],
    createdAt: new Date()
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience and engagement.",
    icon: "🎨",
    features: ["Wireframing", "Prototyping", "User Testing"],
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications for iOS and Android devices.",
    icon: "📱",
    features: ["Native Performance", "Cross-Platform", "App Store Deployment"],
    createdAt: new Date()
  }
];
let nextServiceId = 4;

// Check if MySQL is connected
const isMySQLConnected = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

// Get all services
const getServices = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const services = await Service.findAll({ order: [['createdAt', 'DESC']] });
      res.json(services);
    } else {
      // Fallback to in-memory data
      res.json(services);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const service = await Service.findByPk(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } else {
      // Fallback to in-memory data
      const service = services.find(s => s.id == req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, icon, features } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const service = await Service.create({
        title,
        description,
        icon,
        features
      });
      res.status(201).json(service);
    } else {
      // Fallback to in-memory data
      const service = {
        id: nextServiceId++,
        title,
        description,
        icon,
        features,
        createdAt: new Date()
      };
      services.push(service);
      res.status(201).json(service);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { title, description, icon, features } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const [updatedRowsCount, updatedServices] = await Service.update(
        { title, description, icon, features },
        { where: { id: req.params.id }, returning: true }
      );
      
      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      res.json(updatedServices[0]);
    } else {
      // Fallback to in-memory data
      const serviceIndex = services.findIndex(s => s.id == req.params.id);
      if (serviceIndex === -1) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      services[serviceIndex] = {
        ...services[serviceIndex],
        title,
        description,
        icon,
        features
      };
      
      res.json(services[serviceIndex]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const service = await Service.findByPk(req.params.id);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      await service.destroy();
      res.json({ message: 'Service removed' });
    } else {
      // Fallback to in-memory data
      const serviceIndex = services.findIndex(s => s.id == req.params.id);
      if (serviceIndex === -1) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      const deletedService = services.splice(serviceIndex, 1);
      res.json({ message: 'Service removed', service: deletedService[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};