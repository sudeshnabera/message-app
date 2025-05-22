const { FriendRequest, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllFriends =  async (req, res) => {
    const userId = req.user.id; // Logged-in user's ID
  
    try {
      const friends = await FriendRequest.findAll({
        where: {
          [Op.or]: [
            { senderId: userId },
            { receiverId: userId },
          ],
          status: 'accepted', // Only accepted friend requests
        },
        include: [
          {
            model: User,
            as: 'sender', // Include sender details
           
          },
          {
            model: User,
            as: 'receiver', // Include receiver details
          },
        ],
      });
  
      // Map the results to return the friend details
      const friendList = friends.map(friend => {
        if (friend.senderId === userId) {
          // If the logged-in user is the sender, return the receiver's details
          return friend.receiver;
        } else {
          // If the logged-in user is the receiver, return the sender's details
          return friend.sender;
        }
      });
      
       const uniqueFriends = [];
        const friendIds = new Set();

        for (const friend of friendList) {
        if (!friendIds.has(friend.id)) {
            friendIds.add(friend.id);
            uniqueFriends.push(friend);
        }
        }

      res.status(200).json({ friends: uniqueFriends });
    } catch (error) {
      console.error('Error fetching friends:', error);
      res.status(500).json({ message: 'Error fetching friends', error: error.message });
    }
  };