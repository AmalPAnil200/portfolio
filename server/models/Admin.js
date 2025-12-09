const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

class Admin extends Model {
  // Compare password method
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admins',
  timestamps: false,
  hooks: {
    // Hash password before saving
    beforeCreate: async (admin) => {
      if (admin.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    }
  }
});

module.exports = Admin;