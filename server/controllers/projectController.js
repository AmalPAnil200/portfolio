const Project = require('../models/Project');
const { sequelize } = require('../config/db');

// In-memory storage for fallback
let projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online shopping platform with payment integration.",
    imageUrl: "/images/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Web Development",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks and team collaboration.",
    imageUrl: "/images/project2.jpg",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
    category: "Web Development",
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather forecasting application with interactive maps.",
    imageUrl: "/images/project3.jpg",
    technologies: ["JavaScript", "Chart.js", "OpenWeather API"],
    category: "Data Visualization",
    createdAt: new Date()
  }
];
let nextProjectId = 4;

// Check if MySQL is connected
const isMySQLConnected = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
      
      // Convert relative image URLs to full public URLs
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const projectsWithFullUrls = projects.map(project => {
        const projectObj = project.toJSON ? project.toJSON() : project;
        if (projectObj.imageUrl && projectObj.imageUrl.startsWith('/uploads/')) {
          projectObj.imageUrl = `${baseUrl}${projectObj.imageUrl}`;
        }
        return projectObj;
      });
      
      res.json(projectsWithFullUrls);
    } else {
      // Fallback to in-memory data
      res.json(projects);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const project = await Project.findByPk(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      // Convert relative image URL to full public URL
      const projectObj = project.toJSON ? project.toJSON() : project;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      if (projectObj.imageUrl && projectObj.imageUrl.startsWith('/uploads/')) {
        projectObj.imageUrl = `${baseUrl}${projectObj.imageUrl}`;
      }
      
      res.json(projectObj);
    } else {
      // Fallback to in-memory data
      const project = projects.find(p => p.id == req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, description, imageUrl, technologies, category } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const project = await Project.create({
        title,
        description,
        imageUrl,
        technologies,
        category
      });
      res.status(201).json(project);
    } else {
      // Fallback to in-memory data
      const project = {
        id: nextProjectId++,
        title,
        description,
        imageUrl,
        technologies,
        category,
        createdAt: new Date()
      };
      projects.push(project);
      res.status(201).json(project);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { title, description, imageUrl, technologies, category } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const [updatedRowsCount, updatedProjects] = await Project.update(
        { title, description, imageUrl, technologies, category },
        { where: { id: req.params.id }, returning: true }
      );
      
      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(updatedProjects[0]);
    } else {
      // Fallback to in-memory data
      const projectIndex = projects.findIndex(p => p.id == req.params.id);
      if (projectIndex === -1) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      projects[projectIndex] = {
        ...projects[projectIndex],
        title,
        description,
        imageUrl,
        technologies,
        category
      };
      
      res.json(projects[projectIndex]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const project = await Project.findByPk(req.params.id);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      await project.destroy();
      res.json({ message: 'Project removed' });
    } else {
      // Fallback to in-memory data
      const projectIndex = projects.findIndex(p => p.id == req.params.id);
      if (projectIndex === -1) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      const deletedProject = projects.splice(projectIndex, 1);
      res.json({ message: 'Project removed', project: deletedProject[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};