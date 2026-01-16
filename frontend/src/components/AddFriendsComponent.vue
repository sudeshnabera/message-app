<template>
    <!-- <div class="bg-white">
        <div class="row">
            <div class="col-md-8 w-100">
                <div class="people-nearby">
                    <div class="nearby-user"  v-for="user in allUserData.users" :key="user.id">
                        <div class="row">
                            <div class="col-md-2 col-sm-2" >
                                <img :src="user.profilePhoto" alt="user" class="profile-photo-lg">
                            </div>
                            <div class="col-md-7 col-sm-7">
                                <h5><a href="#" class="profile-link">{{user.name}}</a></h5>
                                <p>{{user.bio}}</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button :id="`add-friend-btn-${user._id}`" class="btn btn-primary pull-right" @click="sendRequest(user._id)">Add Friend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
<div class="add-friend-container">
    <div class="header">
        <h1>Add Friends</h1>
    </div>

    <div class="search-container">
        <div class="search-box">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search by name or username..." id="searchInput">
        </div>
    </div>
    <div class="user-grid">
        <div class="user-card" v-for="user in allUserData.users" :key="user.id">
            <div class="user-info">
                <div class="avatar-container">
                    <img :src="user.profilePhoto" alt="Sarah Johnson" class="avatar">
                </div>
                <div class="user-details">
                    <div class="user-header">
                        <h3>{{user.name}}</h3>
                    </div>
                    
                    <p class="bio">{{user.bio}}</p>
                    <p class="username">{{user.email}}</p>
                    <div class="action-buttons">
                        <button class="btn btn-primary add-friend-btn" @click="sendRequest(user._id)" :id="`add-friend-btn-${user._id}`">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            Add Friend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'; // Import Axios  
export default {
    name: 'AddFriendsComponent',
    data() {
        return {
            allUserData: [],
        };
    },
    mounted() {
        this.getAllUserData();
    },
    methods: {
        async getAllUserData(){
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get('http://localhost:5000/api/userlist/list', {
                    headers: {
                    Authorization:  `Bearer ${token}`
                    }
                });
                if(response.data.success){
                    console.log('response', response.data);
                    this.allUserData = response.data
                }
            } catch (error) {
            console.error(error);
            }
        },
        async sendRequest(receiverId) {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/friendrequest/send", 
                    { receiverId },
                    {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log("response.data", response.data)
                if(response.data.success){
                    const addFriendBtn = document.querySelector(`#add-friend-btn-${receiverId}`);
                    addFriendBtn.innerText = "Request Sent";
                    this.$toast.success('Request Sent Successfully');
                    setTimeout(() => {
                        this.getAllUserData();
                    }, 5000);
                }
            } catch (error) {
                alert(error.response.data.message);  // Already sent, or error
            }
        }
    }
};
</script>    
<style>
  .people-nearby .nearby-user{
    padding: 20px 0;
    border-top: 1px solid #f1f2f2;
    border-bottom: 1px solid #f1f2f2;
    margin-bottom: 20px;
  }
  
  img.profile-photo-lg{
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }

.add-friend-container {
    padding: 24px;
    max-width: 100%;
    height: 100vh;
}

/* Header */
.header {
    text-align: center;
    margin-bottom: 32px;
}

.header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1e293b;
}


/* Search */
.search-container {
    max-width: 400px;
    margin: 0 auto 32px;
}

.search-box {
    position: relative;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
}

.search-box input {
    width: 100%;
    padding:6px 12px 6px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.search-box input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}




/* User Grid */
.user-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .user-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* User Card */
.user-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding:16px 0px 16px 16px;
    transition: all 0.2s;
}

.user-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
}

.user-info {
    display: flex;
    gap: 12px;
}

.avatar-container {
    position: relative;
    flex-shrink: 0;
}

.avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.online-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    background: #10b981;
    border: 2px solid white;
    border-radius: 50%;
}

.user-details {
    flex: 1;
    min-width: 0;
}

.user-header h3 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1e293b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
}

.username {
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 15px;
}

.bio {
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}



/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    text-decoration: none;
}

.btn-primary {
    background: #004953;
    color: white;
    border-color: #004953;
}


.btn-primary:disabled {
    background: #e2e8f0;
    color: #64748b;
    cursor: not-allowed;
}

.btn-secondary {
    background: transparent;
    color: #64748b;
    border-color: #e2e8f0;
}

.btn-secondary:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
}

.btn-ghost {
    background: transparent;
    color: #64748b;
    padding: 6px;
    width: 32px;
    height: 32px;
    justify-content: center;
}

.btn-ghost:hover {
    background: #f1f5f9;
}



/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 16px;
    }
    
    .header h1 {
        font-size: 1.5rem;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .btn {
        justify-content: center;
    }
    
    .user-info {
        flex-direction: column;
        text-align: center;
    }
    
    .user-header {
        justify-content: center;
    }
    
    .bio {
        white-space: normal;
        text-align: center;
    }
    
    .mutual-friends {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 12px;
    }
    
    .search-container {
        margin-bottom: 24px;
    }
    
    .section-header {
        flex-direction: column;
        gap: 8px;
        text-align: center;
    }
    
    .stats-card {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}

/* Request Sent State */
.btn-primary.request-sent {
    background: #e2e8f0;
    color: #64748b;
    cursor: not-allowed;
}

.btn-primary.request-sent:hover {
    background: #e2e8f0;
}

</style>