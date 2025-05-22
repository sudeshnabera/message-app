const { FriendRequest, User } = require('../models');

exports.getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all friend requests where current user is the receiver
    const requests = await FriendRequest.findAll({
      where: { receiverId: userId, status: 'pending' },
      include: [
        {
          model: User,
          as: 'sender',
         
        }
      ]
    });

    res.status(200).json({ friendRequests: requests });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching friend requests', error: err.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
    try {
      const senderId = req.user.id;
      const { receiverId } = req.body;
  
      if (senderId === receiverId) {
        return res.status(400).json({ message: "You can't send a request to yourself." });
      }
  
      // Check if receiver exists
      const receiver = await User.findByPk(receiverId);
      if (!receiver) {
        return res.status(404).json({ message: 'Receiver user not found.' });
      }
  
      // Check if a request already exists
      const existing = await FriendRequest.findOne({
        where: {
          senderId,
          receiverId
        }
      });
  
      if (existing) {
        return res.status(400).json({ message: 'Friend request already sent.' });
      }
  
      // Create friend request
      const request = await FriendRequest.create({ senderId, receiverId });
  
      res.status(201).json({ message: 'Friend request sent', request });
    } catch (err) {
      res.status(500).json({ message: 'Error sending request', error: err.message });
    }
  };
  
  exports.acceptFriendRequest = async (req, res) => {
    try {
      const userId = req.user.id; // The current logged-in user
      const { requestId } = req.params; // The ID of the friend request to accept
  
      // Find the friend request
      const friendRequest = await FriendRequest.findOne({
        where: {
          id: requestId,
          receiverId: userId, // Ensure the current user is the receiver
          status: 'pending', // Only allow accepting pending requests
        },
      });
  
      if (!friendRequest) {
        return res.status(404).json({ message: 'Friend request not found or already processed.' });
      }
  
      // Update the status to "accepted"
      friendRequest.status = 'accepted';
      await friendRequest.save();
  
      // Optionally, create a friendship record if needed
      // Example: Create a new friendship entry in a Friendship model
      // await Friendship.create({
      //   userId1: friendRequest.senderId,
      //   userId2: friendRequest.receiverId,
      // });
  
      res.status(200).json({ message: 'Friend request accepted successfully.' });
    } catch (err) {
      console.error('Error accepting friend request:', err);
      res.status(500).json({ message: 'Error accepting friend request', error: err.message });
    }
  };