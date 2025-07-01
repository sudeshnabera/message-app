const sequelize = require('../config/db');

const User = require('./user');
const FriendRequest = require('./friendRequest');
const Group = require('./group');
const GroupMember = require('./groupMember');// Define associations AFTER importing both models
User.hasMany(FriendRequest, { foreignKey: 'senderId', as: 'sentRequests' });
FriendRequest.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });


User.hasMany(FriendRequest, { foreignKey: 'receiverId', as: 'receivedRequests' });
FriendRequest.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

User.hasMany(Group, { foreignKey: 'creatorId' });
Group.belongsTo(User, { foreignKey: 'creatorId' });

Group.hasMany(GroupMember, { foreignKey: 'groupId', as: 'groupMembers' });
GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

User.hasMany(GroupMember, { foreignKey: 'userId', as: 'groupMemberships' });
GroupMember.belongsTo(User, { foreignKey: 'userId', as: 'memberInfo' });

Group.belongsToMany(User, {
  through: GroupMember,
  foreignKey: 'groupId',
  otherKey: 'userId',
  as: 'members'
});

User.belongsToMany(Group, {
  through: GroupMember,
  foreignKey: 'userId',
  otherKey: 'groupId',
  as: 'memberGroups'
});



module.exports = {
  sequelize,
  User,
  FriendRequest,
  Group,
  GroupMember
};
