<template>
    <div class="chat-container">
        <div class="chat-header">
            <div class="avatar"><img :src="selectedChat.profilePhoto || selectedChat.groupPhoto" alt=""></div>
            <div class="info">
                <h2 class="m-0">{{ selectedChat.name }}</h2>
                <p class="m-0">Online</p>
            </div>
            <div class="header-actions">
                <!-- Video Call Button -->
                <button title="Video Call">
                    <i class="fa-solid fa-video"></i>
                </button>
                
                <!-- Voice Call Button -->
                <button title="Voice Call">
                    <i class="fa-solid fa-phone"></i>
                </button>
            </div>
        </div>
        
        <div class="chat-messages">
            <div class="message" v-for="(message, index) in messages" :key="index" :class="message.sender === userData._id ? 'sent' : 'received'">
                <div class="content">{{message.content}}</div>
                <span class="time">{{message.time}}</span>
            </div>
        </div>
        
        <div class="chat-input-container">
            <div class="preview-box" id="previewBox">
                <img v-for="(img, index) in chatDocs"
                    :key="index"
                    :src="img"
                    class="preview-image" style="width:100px;"
                />
            </div>
            <div class="chat-input">
                <div class="chat-actions">
                    <!-- Document Button -->
                    <button title="Attach Document">
                       <label for="upload-image"><i class="fas fa-file-alt"></i></label> 
                        <input type="file" id="upload-image" style="display: none;" accept="image/*" @change="previewImages">
                    </button>
                    
                    <!-- Emoji Button -->
                    <button title="Emoji">
                        <i class="fas fa-smile"></i>
                    </button>
                    
                    <!-- Camera Button -->
                    <button title="Camera">
                        <i class="fas fa-camera"></i>
                    </button>
                    
                    <!-- Voice Record Button -->
                    <button title="Voice Record">
                        <i class="fas fa-microphone"></i>
                    </button>
                </div>
                
                <input type="text" v-model="newMessage"  placeholder="Type a message...">
                
                <button class="send-button" @click="sendMessage">
                    <i class="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: 'ChatBoxComponent',
    props: {
        userData: {
            type: Object,
            required: true
        },
        selectedChat: {
            type: Object,
            default: null
        }
    },
  
    data() {
        return {
            socket: null,
            messages: [],
            newMessage: '',
            selectedImages:[],
            chatDocs: []
        };
    },
    computed: {
        isGroupChat() {
        return this.selectedChat && Array.isArray(this.selectedChat.members);
        }
    },
    mounted() {
        console.log("selected user",this.selectedChat)
         this.$socket.emit('register_user', this.userData._id);
        if(this.isGroupChat){
             this.$socket.emit('join_group', this.selectedChat._id);
        }
         this.$socket.on("receive_message", (msg) => {
            this.messages.push(msg);
        });
        this.getMessage();
    },
    methods: {
        previewImages(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                this.chatDocs.push(e.target.result); // Store preview base64
                
                };
                reader.readAsDataURL(file);
            }
        },
        sendMessage() {
            if (this.newMessage.trim() === "" && this.chatDocs === null) return;
            const message = {
                sender: this.userData._id,
                content: this.newMessage,
               attachments:  this.chatDocs
            };
             
            console.log(message)
            if (this.isGroupChat) {
                message.groupId = this.selectedChat._id;
            } else {
                message.receiver = this.selectedChat._id;
            }
             this.$socket.emit("send_message", message);
            this.newMessage = "";
            this.chatDocs = null;
        },
        async getMessage(){
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/messages/get", 
                    { receiverId:this.selectedChat._id },
                    {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    }
                );
                if(response.data.success){
                    this.messages = response.data.messages; 
                }
            } catch (error) {
                console.error(error);
            }
        }, 
        
    },
    watch: {
        selectedChat(newVal) {
            if (this.isGroupChat) {
                this.socket.emit("join_group", newVal._id);
            }
            this.getMessage();
        }
    }
};  
</script>
<style>
.chat-container {
    width: 100%;
    max-width: 1024px;
    height: 650px;
    background-color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    background-color: #004953;
    color: white;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
}


.avatar img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
}
.chat-header .info {
    flex: 1;
    margin-left: 10px;
}

.chat-header h2 {
    font-size: 16px;
    margin-bottom: 3px;
}

.chat-header p {
    font-size: 12px;
    opacity: 0.8;
}

.header-actions {
    display: flex;
    gap: 15px;
}

.header-actions button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.header-actions button:hover {
    opacity: 1;
}

.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message {
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 18px;
    position: relative;
    word-wrap: break-word;
}

.message .time {
    font-size: 11px;
    opacity: 0.7;
    margin-top: 5px;
    display: block;
}

.message.received {
    align-self: flex-start;
    background-color: #f2f2f2;
    border-bottom-left-radius: 5px;
}

.message.sent {
    align-self: flex-end;
    background-color: #4a5568;
    color: white;
    border-bottom-right-radius: 5px;
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



/* Responsive adjustments */
@media (max-width: 600px) {
    .chat-container {
        height: 100%;
        border-radius: 0;
    }
    
    body {
        padding: 0;
    }

    .chat-actions {
        gap: 2px;
    }

    .chat-actions button {
        width: 28px;
        height: 28px;
    }

    .chat-actions button svg {
        width: 14px;
        height: 14px;
    }
}
</style>