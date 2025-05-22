const { FriendRequest, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  const userId = req.user.id;

  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: userId, // Exclude the current user
        },
      },
      include: [
        {
          model: FriendRequest,
          as: 'sentRequests',
          where: {
            [Op.or]: [
              { senderId: userId },
              { receiverId: userId },
            ],
            status: {
              [Op.in]: ['pending', 'accepted'], // Exclude users with pending/accepted requests
            },
          },
          required: false, // Allow users without friend requests
        },
      ],
    });

    const filteredUsers = users.filter(user => !user.sentRequests.length); // Exclude users with requests
    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
