<template>
   <!-- Left Sidebar - Friend List -->
		<div class="sidebar friend-list">
        <div class="filter-menu">
            <button class="filter-button"
                :class="{ active: activeFilter === 'All' }"
                @click="setFilter('All')">All</button>
            <!-- <button class="filter-button">Favorites</button> -->
            <button class="filter-button"
                :class="{ active: activeFilter === 'Groups' }"
                @click="setFilter('Groups')">Groups</button>
        </div>
        <div v-show="activeFilter === 'All'">
            <h2>Friends</h2>
            <div class="friend-item" v-for="friend in friends" :key="friend.id"  @click="selectUser(friend)">
                <img :src='friend.profilePhoto' alt="Friend 1">
                <span>{{friend.name}}</span>
                <span class="status online"></span>
            </div>
        </div>
        <div class="page-wrapper" v-show="activeFilter === 'Groups'">
            <button @click="showModal = true" class="open-modal-btn">+ Create Group</button>
              <div v-if="showModal" class="modal-overlay">
                <div class="modal-box">
                    <div class="modal-header">
                    <h2>Create Group</h2>
                    <button @click="showModal = false" class="close-btn">&times;</button>
                    </div>
                    <label for="file-input" id="file-label">
                        <input id="file-input" type="file" ref="fileInput" @change="previewImage"/>
                        <img id="img-preview" ref="imagePreview" :src="groupImage"/>
                        <p>Click the Image to Upload</p>
                    </label>
                    <input v-model="groupName" placeholder="Group Name" class="modal-input" />

                    <h4>Select Friends</h4>
                    <div class="modal-friend-list">
                    <label v-for="friend in friends" :key="friend._id" class="modal-friend-item">
                        <input type="checkbox" :value="friend._id" v-model="selectedFriendIds" />
                        {{ friend.name }}
                    </label>
                    </div>

                    <button @click="createGroup" class="create-btn">Create</button>
                </div>
            </div>
            <!-- Right Panel: All Groups -->
            <div class="group-list-section">
              <h2>All Groups</h2>
                <div class="friend-item" v-for="group in groups" :key="group._id">
                    <img :src='group.groupPhoto' alt="Friend 1">
                    <span  @click="selectUser(group)">{{group.name}}</span>
                </div>
            </div>
        </div>
		</div>
</template>
<script>
import axios from 'axios'; // Import Axios
export default {
  name: 'ChatUsersComponent',
  props:{
      groups: {
          type: Array,
          required: true
      },
      friends: {
          type: Array,
          required: true
      },
  },
  data() {
    return {
      activeFilter: 'All',
      groupName: '',
      selectedFriendIds: [],   
      showModal: false,
      groupImage: null,
    };
  },
  mounted(){
    
  },
  methods: {
      previewImage(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                this.groupImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
       
        setFilter(filter) {
            this.activeFilter = filter;
        },
         
        async createGroup() {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post('http://localhost:5000/api/groups/create', {
                name: this.groupName,
                memberIds: this.selectedFriendIds,
                groupPhoto: this.groupImage, // Use the profilePhoto data URL
                }, {
                headers: { Authorization:  `Bearer ${token}` }
                });
               
                if(response.data.success){
                    this.showModal = false;
                    this.$toast.success('Group Created Successfully');
                }
                
            } catch (err) {
                console.error(err);
            }
        },
        
        selectUser(friend) {
          this.$emit('user-selected', friend); // emits event to parent
        }
      
    },
};

</script>
<style>

 .filter-menu {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      border-radius: 8px;
    }

    .filter-button {
      background-color: transparent;
      color: #9e9e9e;
      border: none;
      border-radius: 20px;
      padding: 6px 16px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
      border: 1px solid #004953;
      color: #004953;
    }

    .filter-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid #004953;
      color: #004953;
    }

    .filter-button.active {
      background-color: #004953;
      color: #ffffff;
    }
/* Sidebar Styles */
.sidebar {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    padding: 25px !important;
    height: calc(100vh - 100px);
}

.friend-list {
    width: 250px;
}

.friend-list h2 {
    margin-bottom: 20px;
    color: #1c1e21;
    font-size: 20px;
}

.friend-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f2f5;
}

.friend-item img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #004953;
}

.status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: auto;
}

.online {
    background-color: #31a24c;
}

.offline {
    background-color: #65676b;
}

.view-more {
    margin-top: 15px;
    text-align: center;
}

.view-more a {
    color: #1877f2;
    text-decoration: none;
}

.page-wrapper {
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f6f9;
}

.open-modal-btn {
  padding: 7px 10px;
  background-color: #004953;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-top: 50px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.close-btn {
  font-size: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.modal-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.modal-friend-list {
  max-height: 150px;
  overflow-y: auto;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}

.modal-friend-item {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.create-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

/* Groups display */
.group-list-section {
  margin-top: 40px;
  max-height: 350px;
  overflow-y: auto;
}

.group-card {
  background: white;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.member-chips {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.member-chip {
  background-color: #d6e6ff;
  color: #084298;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
}
#file-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  #file-input {
    opacity: 0;
    width: 0px;
  }
  
  #img-preview  {  
    width:90px;
    height:90px;
    border-radius: 50%;
    outline: 3px solid #004953;
    cursor: pointer;
    transition: 200ms ease-in-out;
  }
</style>