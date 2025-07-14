<template>

        
    <div class="post-container">
        <div class="post-box">
            <div class="post-header">
                <img :src="userData?.profilePhoto" alt="User">
                <span class="user-name">{{userData?.name}}</span>
            </div>

            <textarea placeholder="What's on your mind?"  v-model="postText"></textarea>

            <div class="image-upload">
                <label for="upload-image">📷 Add Photos</label>
                <input type="file" id="upload-image" multiple accept="image/*" @change="previewImages">
            </div>
            <div class="preview-box" id="previewBox">
                <img
                    v-for="(img, index) in previewUrls"
                    :key="index"
                    :src="img"
                    class="preview-image"
                  
                />
            </div>
            <div class="post-actions">
                <button class="cancel-btn">Cancel</button>
                <button class="post-btn" @click="addPost">Post</button>
            </div>
        </div>

        <div v-for="post in userPost" :key="post._id">
            <hr>
            <div class="post-header">
                <img :src="post.user?.profilePhoto" style="width:50px !important; height:50px !important"/>
                <div class="user-info">
                    <div class="username">{{post.user?.name}}</div>
                    <div class="timestamp">{{timeAgo(post.createdAt)}}</div>
                </div>
                <button class="more-options" v-if="post.user._id === userData._id" @click="toggleDropdown(post._id)">
                    <span class="action-icon dots-icon"></span>
                </button>

                <div v-if="activeDropdown === post._id" class="more-options-dropdown">
                    <div>
                       <i class="fas fa-edit"></i><p>Edit</p>
                    </div>
                    <hr style="margin:0;">
                    <div @click="deletePost(post._id)">
                       <i class="fa-solid fa-trash"></i> <p>Delete</p>
                    </div>
                </div>
            </div>

            <div class="post-content">
                <div class="post-text">
                    {{post.text}}
                </div>
                <div class="post-image">
                   <!-- Single Image -->
                    <img
                    v-if="post.image?.length === 1"
                    :src="'http://localhost:5000/images/' + post.image[0]"
                    class="single-image"
                    alt="Post Image"
                    />

                    <!-- Multiple Images -->
                    <div v-else class="image-grid">
                    <img
                        v-for="(img, index) in post.image"
                        :key="index"
                        :src="`http://localhost:5000/images/${img}`"
                        class="grid-image"
                        alt="Post Image"
                    />
                    </div>
                </div>
            </div>

            <div class="post-actions">
                <button class="action-btn like-btn" @click="toggleLike(post._id)" >
                    <span class="action-icon" :class="['heart-icon', { liked: post.likes.includes(userData._id) }]"></span>
                    <span :class="{ liked_count: post.likes.includes(userData._id) }">{{post.likes.length}}</span>
                </button>
                <button class="action-btn comment-btn">
                    <span class="action-icon comment-icon"></span>
                    <span>{{post.comments.length}}</span>
                </button>
                <button class="action-btn share-btn">
                    <span class="action-icon share-icon"></span>
                    <span>Share</span>
                </button>
            </div>
            <div class="comment">
                <div class="chat-input-container">
                    <div class="chat-input">

                        <input type="text" v-model="comment"  placeholder="Comment...">

                        <div class="chat-actions">

                            <!-- Emoji Button -->
                            <button  title="Emoji" @click="showEmojiPicker = !showEmojiPicker">
                                <i class="fas fa-smile"></i>
                            </button>
                            <emoji-picker class="emoji-picker" v-if="showEmojiPicker" @emoji-click="onEmojiClick"></emoji-picker>
                            <!-- Camera Button -->
                            <button title="Camera">
                                <i class="fas fa-camera"></i>
                            </button>
                            
                        </div>

                        <button class="send-button"  @click="addComment(post._id)">
                            <i class="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
import axios from 'axios'; // Import Axios
import { formatDistanceToNow } from 'date-fns';
import 'emoji-picker-element';
export default {
    name: 'PostComponent',
    props:['userData'],
    data() {
        return {
            previewUrls:[],
            postText:"",
            userPost:[],
            comment:"",
            showEmojiPicker: false,
            activeDropdown: null, // Track which post's dropdown is active

        };
    },
    mounted(){
        this.getPost()
    },
    methods: {

        previewImages(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.selectedImages.push(file); // Push to File array

                const reader = new FileReader();
                reader.onload = (e) => {
                this.previewUrls.push(e.target.result); // Store preview base64
                };
                reader.readAsDataURL(file);
            }
        },
        async addPost(){
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append('text', this.postText);
            this.selectedImages.forEach(file => {
                if (file && file.type?.startsWith('image/')) {
                    formData.append('images', file);
                } 
            });
          
            const res = await axios.post('http://localhost:5000/api/post/create',formData,
                 {
                    headers: {
                        Authorization:  `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                   
                },
            )
            if (res.data.success) {
                this.selectedImages = [];
                this.previewUrls = [];
                this.postText = " ";
                this.$toast.success("Add Post Successfully");
                this.getPost();
            }
        },
        async getPost(){
            const token = localStorage.getItem("token");
             const res = await axios.get('http://localhost:5000/api/post/get',
                 {
                    headers: {
                        Authorization:  `Bearer ${token}`,
                    },
                },
            )
            if (res.data.success) {
                this.userPost = res.data.userPost
            }
        },
        timeAgo(date) {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        },
        async deletePost(postId){
            const token = localStorage.getItem("token");
             const res = await axios.post('http://localhost:5000/api/post/delete', {postId},
                {
                    headers: {
                        Authorization:  `Bearer ${token}`,
                    },
                },
            )
            if (res.data.success) {
                this.$toast.success("Post Delete Successfully");
                this.getPost();
            }
        },
        async toggleLike(postId){
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5000/api/post/like', {postId},
                {
                    headers: {
                        Authorization:  `Bearer ${token}`,
                    },
                },
            )
            if (res.data.success) {
                this.getPost();
            }
        },
        onEmojiClick(event) {
            const emoji = event.detail.unicode;
            this.comment += emoji;
        },
        async addComment(postId){
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5000/api/post/comment', {postId, comment: this.comment},
                {
                    headers: {
                        Authorization:  `Bearer ${token}`,
                    },
                },
            )
            if (res.data.success) {
                this.comment = "";
                this.showEmojiPicker = false;
                this.getPost();
            }
        },
        toggleDropdown(postId) {
             console.log("Clicked post ID:", postId);
            console.log("Previous active:", this.activeDropdown);
            this.activeDropdown = this.activeDropdown === postId ? null : postId;
            console.log("Now active:", this.activeDropdown);
        },
    },
};
</script>
<style scoped>
.post-container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.post-container:hover {
    transform: translateY(-5px);
}

.post-header {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
}

.avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-right: 12px;
}

.user-info {
    flex: 1;
}

.username {
    font-weight: 600;
    font-size: 16px;
    color: #1a1a1a;
    margin-bottom: 2px;
}

.timestamp {
    font-size: 14px;
    color: #666;
}

.more-options {
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
}

.more-options:hover {
    background-color: #f5f5f5;
}

.post-content {
    padding: 20px;
}

.post-text {
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    margin-bottom: 16px;
}

.hashtags {
    color: #1da1f2;
    font-weight: 500;
}



.post-actions {
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    color: #666;
}

.action-btn:hover {
    background-color: #f5f5f5;
    color: #333;
}

.like-btn:hover {
    background-color: #fee;
    color: #e91e63;
}

.comment-btn:hover {
    background-color: #e3f2fd;
    color: #2196f3;
}

.share-btn:hover {
    background-color: #e8f5e8;
    color: #4caf50;
}

.action-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Icons using CSS */
.heart-icon::before {
    content: "♡";
    font-size: 25px;
}

.comment-icon::before {
    content: "💬";
    font-size: 16px;
}

.share-icon::before {
    content: "↗";
    font-size: 18px;
    font-weight: bold;
}

.dots-icon::before {
    content: "⋯";
    font-size: 20px;
    font-weight: bold;
}

/* Responsive design */
@media (max-width: 480px) {
    .post-container {
        margin: 10px;
        border-radius: 12px;
    }

    .post-header {
        padding: 12px 16px;
    }

    .post-content {
        padding: 16px;
    }

    .post-actions {
        padding: 12px 16px;
    }

    .action-btn {
        padding: 6px 12px;
        font-size: 13px;
    }
}

/* Animation for engagement */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.action-btn:active {
    animation: pulse 0.2s ease;
}


.post-box {
    background: #fff;
    width: 500px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.post-header {
    display: flex;
    align-items: center;
}

.post-header img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
}

.post-header .user-name {
    font-weight: bold;
    font-size: 16px;
}

textarea {
    width: 100%;
    border: none;
    resize: none;
    height: 100px;
    font-size: 14px;
    padding: 10px;
    border-radius: 8px;
    background: #f5f6f8;
    margin-bottom: 15px;
    outline: none;
}

.image-upload {
    margin-bottom: 15px;
}

.image-upload input[type="file"] {
    display: none;
}

.image-upload label {
    background-color: #e4e6eb;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
}

.post-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.post-actions button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
}

.cancel-btn {
    background-color: #ccc;
    color: #333;
}

.post-btn {
    background-color: #004953;;
    color: #fff;
}
.preview-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
}

    .preview-box .preview-image {
    width: 80px !important;
    height: 80px !important;
    border-radius: 8px !important;
}

    /* Single image (full width) */
.single-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
}

/* Grid container for multiple images */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
  gap: 8px;
}

/* Grid image */
.grid-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.heart-icon.liked::before {
  content: "♥";       /* filled heart */
  color: red;
}
.liked_count {
    color:red;
}

.more-options {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
}

.more-options .dots-icon::before {
  content: '⋮';
  font-size: 18px;
  color: #333;
}

.more-options-dropdown {
  position: absolute;
  top: 23%;
  right: 15px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 10;
  width: 120px;
  border-radius: 6px;
  padding: 6px 0;
}

.more-options-dropdown div {
    display: flex;
    align-items: center;
    padding: 7px 10px;
    cursor: pointer;
    transition: background 0.2s;
    justify-content: center;
}

.more-options-dropdown div:hover {
  background-color: #f2f2f2;
}

.more-options-dropdown i {
  margin-right: 8px;
  font-size: 14px;
}

.more-options-dropdown p {
  margin: 0;
  font-size: 14px;
}
.emoji-picker {
    position: absolute;
    z-index: 100;
    margin-top: 10px;
    width: 372px;
    left: 6%;
    top: 64%;
}
.chat-input-container {
    border-top: 1px solid #e2e8f0;
    padding: 15px;
}

.chat-input {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #f9f9f9;
    border-radius: 25px;
    padding: 5px;
}

.chat-actions {
    display: flex;
    gap: 5px;
    padding-left: 5px;
}

.chat-actions button {
    background: none;
    border: none;
    cursor: pointer;
    color: #004953;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.chat-actions button:hover {
    background-color: #f0f0f0;
}

.chat-actions button svg {
    width: 16px;
    height: 16px;
}

.chat-input input {
    flex: 1;
    padding: 10px;
    border: none;
    outline: none;
    font-size: 14px;
    background: transparent;
}

.send-button {
    background-color: #004953;
    color: white;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
}

</style>