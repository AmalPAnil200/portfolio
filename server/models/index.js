const { sequelize } = require('../config/db');

// Import all models
const Admin = require('./Admin');
const Contact = require('./Contact');
const DesignWork = require('./DesignWork');
const Project = require('./Project');
const Service = require('./Service');

// Sync all models
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

module.exports = {
  sequelize,
  Admin,
  Contact,
  DesignWork,
  Project,
  Service,
  syncModels
};