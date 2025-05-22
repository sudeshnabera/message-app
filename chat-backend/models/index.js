const sequelize = require('../config/db');

const User = require('./user');
const FriendRequest = require('./friendRequest');

// Define associations AFTER importing both models
User.hasMany(FriendRequest, { foreignKey: 'senderId', as: 'sentRequests' });
FriendRequest.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });


User.hasMany(FriendRequest, { foreignKey: 'receiverId', as: 'receivedRequests' });
FriendRequest.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

module.exports = {
  sequelize,
  User,
  FriendRequest,
};
