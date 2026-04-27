const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  joining_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  reporting_manager_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profile_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'manager', 'employee'),
    defaultValue: 'employee',
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at', // Map Sequelize timestamps to your SQL column names
  updatedAt: 'updated_at',
});

module.exports = User;
