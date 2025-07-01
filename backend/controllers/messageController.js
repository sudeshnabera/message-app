import messageModel from "../models/message.js"; 

const createMessage = async (io, socket) => {
  socket.on('send_message', async (data) => {
    try {
      const message = new messageModel(data); // create a new message instance
      await message.save();
      io.emit('receive_message', message); // broadcast to all clients
    } catch (err) {
      console.error("Error saving message:", err);
      socket.emit('error', 'Message could not be saved');
    }
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
