const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Project extends Model {}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  technologies: {
    type: DataTypes.STRING, // Store as JSON string
    get() {
      const rawValue = this.getDataValue('technologies');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('technologies', JSON.stringify(value));
    }
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'General'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  timestamps: false
});

module.exports = Project;