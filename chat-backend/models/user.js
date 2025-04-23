// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String
// });

// module.exports = mongoose.model('User', UserSchema);

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
});

module.exports = User;