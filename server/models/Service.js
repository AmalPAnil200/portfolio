const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Service extends Model {}

Service.init({
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
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  },
  features: {
    type: DataTypes.STRING, // Store as JSON string
    get() {
      const rawValue = this.getDataValue('features');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('features', JSON.stringify(value));
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Service',
  tableName: 'services',
  timestamps: false
});

module.exports = Service;