import { postService } from "../services/index.js";

const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const text = req.body.text;

    const imagePaths = req.files.map((file) => file.filename); // or `file.path` if you want full path

    const newPost = {
      user: userId,
      text: text || "",
      image: imagePaths || [],
    };

    await postService.createPost(newPost);
    res
      .status(200)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const userPost = await postService.getPost();
    res.status(200).json({ success: true, userPost });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.body.postId;
    await postService.deletePost(postId, userId);

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Post deletion error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.body.postId;
    const userPost = await postService.getPostById(postId);

    const alreadyLiked = userPost.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      userPost.likes.pull(userId);
    } else {
      // Like
      userPost.likes.push(userId);
    }

    await userPost.save();

    res.json({ success: true, likes: userPost.likes.length, message: alreadyLiked ? "Post unliked" : "Post liked" });
  } catch (error) {
    console.error("Post like error:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

const commentPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId, comment } = req.body;

    const userPost = await postService.getPostById(postId);
    const newComment = {
      user: userId,
      text: comment,
      createdAt: new Date(),
    };

    userPost.comments.push(newComment);
    await userPost.save();
    res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.error("Post comment error:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

export { createPost, getPost, deletePost, likePost, commentPost };
