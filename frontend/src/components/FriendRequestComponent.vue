<template>
  <!-- <div id="fb">
    <div v-if="friendRequests.length === 0" class="loading">No Friend Requests</div>

    <div v-else class="requests-container">
      <div
        v-for="request in friendRequests"
        :key="request._id"
        class="friend-request-card"
      >
        <img
          :src="request.senderId?.profilePhoto || 'default-avatar.png'"
          alt="Profile Photo"
          class="profile-photo"
        />

        <div class="friend-info">
          <p class="friend-name">{{ request.senderId?.name || 'Unknown User' }}</p>
          <p class="friend-email">{{ request.senderId?.email || 'No Email' }}</p>
        </div>

        <div class="friend-actions">
          <button class="accept-btn" @click="acceptRequest(request.senderId?._id)">Accept</button>
          <button class="decline-btn" @click="declineRequest(request.senderId?._id)">Decline</button>
        </div>
      </div>
    </div>
  </div> -->

  <div class="add-friend-container">
    <div class="search-container">
        <div class="search-box">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search by name or username..." id="searchInput">
        </div>
    </div>
    <div v-if="friendRequests.length === 0" class="loading">No Friend Requests</div>

    <div v-else class="user-grid">
        <div class="user-card"  v-for="request in friendRequests" :key="request._id">
            <div class="user-info">
                <div class="avatar-container">
                    <img  :src="request.senderId?.profilePhoto || 'default-avatar.png'" alt="Sarah Johnson" class="avatar">
                </div>
                <div class="user-details">
                    <div class="user-header">
                        <h3>{{ request.senderId?.name || 'Unknown User' }}</h3>
                    </div>
                    
                    <p class="bio">{{ request.senderId?.bio}}</p>
                    <p class="username">{{ request.senderId?.email || 'No Email' }}</p>
                    <div class="action-buttons">
                        <button class="btn btn-primary add-friend-btn" @click="acceptRequest(request.senderId?._id)">Accept
                        </button>
                        <button type="button" style="border:1px solid #6C757E;" class="btn btn-outline-secondary">Cancel</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FriendRequest',
  data() {
    return {
      friendRequests: [],
    };
  },
  mounted() {
    this.getFriendRequests();
  },
  methods: {
    async getFriendRequests() {
        const token = localStorage.getItem("token");
        console.log('Token:', token);
        try {
          const response = await axios.get('http://localhost:5000/api/friendrequest/get',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if(response.data.success){
            console.log('Friend requests:',  response.data.friendRequests);
            this.friendRequests = response.data.friendRequests; 
            
          }
        } catch (error) {
          console.error('Error fetching friend requests:', error.response?.data?.message || error.message);
        }
    },
    async acceptRequest(requestId) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert('You are not authenticated. Please log in again.');
        return;
      }
      console.log('Token:', token);
      try {
        const response = await axios.post("http://localhost:5000/api/friendrequest/accept",
              {requestId}, // Empty body
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Correctly include the token in the headers
                },
              }
            );
        console.log('Request accepted:', response.data);

        // Remove the accepted request from the list
        this.friendRequests = this.friendRequests.filter(request => request.id !== requestId);

        // Show a success message
        alert('Friend request accepted successfully!');
      } catch (error) {
        console.error('Error accepting friend request:', error.response?.data?.message || error.message);
      }
    },
  },
 
};
</script>
<style scoped>
#fb {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  height: 90vh;
}

#fb-top {
  background-color: #f0f2f5;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

#fb-top p {
  margin: 0;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-links {
  font-size: 14px;
  color: #1877f2;
  cursor: pointer;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #555;
}

.requests-container {
  padding: 15px;
}

.friend-request-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-photo {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.friend-info {
  flex-grow: 1;
}

.friend-name {
  font-weight: 600;
  margin: 0;
}

.friend-email {
  font-size: 14px;
  color: #555;
}

.friend-actions button {
  margin-left: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.accept-btn {
  background-color: #42b72a;
  color: white;
}

.decline-btn {
  background-color: #e53935;
  color: white;
}

</style>