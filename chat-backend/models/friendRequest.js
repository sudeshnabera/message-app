const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FriendRequest = sequelize.define('FriendRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  }
}, {
  timestamps: true,
});

module.exports = FriendRequest;

