import userModel from "../models/user.js";
import friendListModel from "../models/friendRequest.js";

const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all friend requests where current user is the receiver
    const requests = await friendListModel.find({
                      receiverId: userId,
                      status: 'pending'
                    }).populate('senderId', 'name email bio bod phone gender profilePhoto')
                      .sort({ createdAt: -1 });

    res.json({ success: true, friendRequests: requests });
  } catch (err) {
    res.json({ message: 'Error fetching friend requests', error: err.message });
  }
};

const sendFriendRequest = async (req, res) => {
     try {
        const senderId = req.user.id;
        const { receiverId } = req.body;
        if (senderId === receiverId) {
          return res.status(400).json({ message: "You can't send a request to yourself." });
        }

        // Check if receiver exists in User model
        const receiver = await userModel.findById({_id:receiverId});
        if (!receiver) {
          return res.json({ message: 'Receiver user not found.' });
        }

        // Check if a friend request already exists (in either direction)
        const existingRequest = await friendListModel.findOne({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
          ]
        });

        if (existingRequest) {
          return res.status(400).json({ message: 'Friend request already exists or you are already friends.' });
        }

        // Create new friend request
        const request = new friendListModel({
          senderId,
          receiverId,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        });

        await request.save();

        res.json({success:true, message: 'Friend request sent successfully', request });
      } catch (err) {
        res.status(500).json({success:false, message: 'Error sending friend request', error: err.message });
      }
    };

  
  const acceptFriendRequest = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { requestId } = req.body; 

      console.log('Sender ID:', requestId);
      console.log('Receiver ID:', userId);

   
      // Find the friend request
      const friendRequest = await friendListModel.findOne({
              senderId: requestId,
              receiverId: userId,
            });
            
      console.log(friendRequest);
      
      if (!friendRequest) {
        return res.json({ message: 'Friend request not found or already processed.' });
      }
  
      // Update the status to "accepted"
      friendRequest.status = 'accepted';
      await friendRequest.save();

  
      res.json({ success:true, message: 'Friend request accepted successfully.' });
    } catch (err) {
      console.error('Error accepting friend request:', err);
      res.status(500).json({success:false, message: 'Error accepting friend request', error: err.message });
    }
  };

  const getAcceptedFriend = async (req, res) => {
    try {
          const userId = req.user.id;
          // Fetch all friend requests where current user is the receiver
          const requests = await friendListModel.find({
                           status: 'accepted',
                              $or: [
                                { senderId: userId },
                                { receiverId: userId }
                              ]
                            })
                            .populate('senderId', 'name email bio bod phone gender profilePhoto')
                            .populate('receiverId', 'name email bio bod phone gender profilePhoto')
                            .sort({ createdAt: -1 });
          const friendList = requests.map(req => {
            const friend = req.senderId._id.toString() === userId.toString() ? req.receiverId : req.senderId;
            return friend;
          });
          res.json({ success: true, friendList });
    } catch (error) {
      res.json({ success: false, });
    }
  }

  export { getFriendRequests, sendFriendRequest, acceptFriendRequest, getAcceptedFriend}