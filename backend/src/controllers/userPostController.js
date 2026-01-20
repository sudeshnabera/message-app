import postModel from "../models/userPost.js"

const createPost = async (req, res) =>{
    try {
        const userId = req.user.id;
        const { text } = req.body;
        const imagePaths = req.files.map(file => file.filename); // or `file.path` if you want full path
        const newPost = await postModel.create({
        user: userId,
        text: text || '',
        image: imagePaths
        });

        res.json({ success: true, post: newPost });
    } catch (error) {
        console.error('Post creation error:', error);
        res.json({ success: false, message: 'Server Error' });
    }
}

const getPost = async (req, res)=>{
    try {
        const userId = req.user.id;
        const userPost =  await postModel.find().populate('user', 'name profilePhoto').sort({ createdAt: -1 });
        res.json({ success: true, userPost });
    } catch (error) {
        console.error('Post creation error:', error);
        res.json({ success: false, message: 'Server Error' });
    }
}

const deletePost = async (req, res)=>{
    try {
        const userId = req.user.id;
        const postId = req.body.postId;
        const userPost =  await postModel.findByIdAndDelete(postId);
       
        res.json({ success: true});
    } catch (error) {
        console.error('Post creation error:', error);
        res.json({ success: false, message: 'Server Error' });
    }
}

const likePost = async (req, res)=>{
    try {
        const userId = req.user.id;
        const postId = req.body.postId;
        const userPost =  await postModel.findById(postId);
       
        const alreadyLiked = userPost.likes.includes(userId);

        if (alreadyLiked) {
        // Unlike
        userPost.likes.pull(userId);
        } else {
        // Like
        userPost.likes.push(userId);
        }

        await userPost.save();

        res.json({ success: true});
       
    } catch (error) {
        console.error('Post creation error:', error);
        res.json({ success: false, message: 'Server Error' });
    }
}

const commentPost = async (req, res)=>{
    try {
        const userId = req.user.id;
        const {postId, comment} = req.body;

        const userPost =  await postModel.findById(postId);
        const newComment = {
        user: userId,
        text: comment,
        createdAt: new Date()
        };

        userPost.comments.push(newComment);
        await userPost.save();
        res.json({ success: true});
    } catch (error) {
        console.error('Post creation error:', error);
        res.json({ success: false, message: 'Server Error' });
    }
}

export { createPost, getPost, deletePost, likePost, commentPost }