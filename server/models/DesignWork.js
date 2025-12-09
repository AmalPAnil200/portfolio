const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class DesignWork extends Model {}

DesignWork.init({
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
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.STRING, // Store as JSON string
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value));
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'DesignWork',
  tableName: 'design_works',
  timestamps: false
});

module.exports = DesignWork;