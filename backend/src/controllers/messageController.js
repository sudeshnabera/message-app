import messageModel from "../models/message.js"; 


const createMessage = async (io, socket) => {

  socket.on('register_user', (userId) => {
    socket.join(userId)
    console.log(`User ${userId} connected`);
  });

  socket.on('join_group', (groupId) => {
    socket.join(groupId)
    console.log(`${groupId} connected`);
  });

  socket.on('send_message', async (data) => {
    try {
      const message = new messageModel(data);
      await message.save();

      

      if (data.receiver) {
        socket.emit('receive_message', message);
        io.to(data.receiver).emit('receive_message', message);
        io.to(data.receiver).emit('new_message_notification', {
          from: data.sender,
          content: data.content,
          timestamp: message.timestamp
        });
      }else if (data.groupId) {
        io.to(data.groupId).emit('receive_message', message);
        socket.to(data.groupId).emit('new_message_notification', {
          from: data.sender,
          groupId: data.groupId,
          content: data.content,
          timestamp: message.timestamp
        });
      }

    } catch (err) {
      console.error("Error saving message:", err);
      socket.emit('error', 'Message could not be saved');
    }
  });

   socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
}

const getMessages = async (req, res) => {
  try{
    const userId = req.user.id;
    const { receiverId } = req.body;

    const messages = await messageModel.find({$or: [
        { sender: userId, receiver: { $in: receiverId } },
        { receiver: userId, sender: { $in: receiverId } }
      ]})
    res.json({ success: true, messages });
  }catch(err){
    console.error("Error fetching messages:", err);
    res.json({ success: false, message: 'Error fetching messages' });
  }
}

export {createMessage, getMessages}
