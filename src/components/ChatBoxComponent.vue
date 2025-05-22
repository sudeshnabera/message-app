<template>
    <div class="chat-container">
        <div class="chat-header">
            <div class="avatar">J</div>
            <div class="info">
                <h2 class="m-0">John Doe</h2>
                <p class="m-0">Online</p>
            </div>
            <div class="header-actions">
                <!-- Video Call Button -->
                <button title="Video Call">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                </button>
                
                <!-- Voice Call Button -->
                <button title="Voice Call">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="chat-messages">
            <div class="message received">
                <div class="content">I'm doing great, thanks for asking! How about you?</div>
                <span class="time">10:32 AM</span>
            </div>

            <div class="message  sent" v-for="(message, index) in this.messages" :key="index">
                <div class="content">{{message.content}}</div>
                <span class="time">{{message.time}}</span>
            </div>
        </div>
        
        <div class="chat-input-container">
            <div class="chat-input">
                <div class="chat-actions">
                    <!-- Document Button -->
                    <button title="Attach Document">
                        <i class="fas fa-file-alt"></i>
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
                
                <input type="text" v-model="newMessage" @click="sendMessage" placeholder="Type a message...">
                
                <button class="send-button"  @click="sendMessage">
                    <i class="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'; // Import Axios
export default {
    name: 'ChatBoxComponent',
    data() {
        return {
            messages: [
                
            ],
            newMessage: '',
            senderId: 1, // hardcoded for testing; replace with actual logged-in user ID
            receiverId: 2,
        };
    },
    methods: {
        
        async sendMessage() {
            const token = localStorage.getItem("token");
            if (this.newMessage.trim() == '') {
                return;
            }
            try {
                const res = await axios.post('http://localhost:5000/api/messages/send', {
                    content: this.newMessage,
                    receiverId: this.receiverId,
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
                console.log('sending message:', res);
                this.messages.push({
                    content: this.newMessage,
                    time: new Date().toLocaleTimeString(),
                    type: 'sent',
                });
                console.log('sending message:', this.messages);

            this.newMessage = '';
            } catch (error) {
                console.error('Error sending message:', error);
            }
         
        }
    },
};
</script>
<style scoped>
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

.chat-header .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #718096;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    color: white;
    font-weight: bold;
}

.chat-header .info {
    flex: 1;
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
    color: #4a5568;
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
    background-color: #4a5568;
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

.send-button:hover {
    background-color: #2d3748;
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