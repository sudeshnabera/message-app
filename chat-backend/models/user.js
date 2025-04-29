
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone : DataTypes.INTEGER,
});

module.exports = User;