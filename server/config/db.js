const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'portfolio',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'Amal@123',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: console.log, // Enable logging to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected Successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log('All models were synchronized successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
    console.log('Running in fallback mode with in-memory data');
    return false;
  }
};

module.exports = { connectDB, sequelize };