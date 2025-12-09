const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Contact extends Model {}

Contact.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Contact',
  tableName: 'contacts',
  timestamps: false
});

module.exports = Contact;