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
			<div class="friend-item" v-for="friend in friends" :key="friend.id">
				<img :src='friend.profilePhoto' alt="Friend 1">
				<span>{{friend.name}}</span>
				<span class="status online"></span>
			</div>
			
		</div>
</template>
<script>
import axios from 'axios'; // Import Axios
export default {
  name: 'ChatUsersComponent',
  data() {
    return {
      friends: [
       
      ],
      activeFilter: 'All',
    };
  },
  mounted(){
    this.getAllfriendsData();
  },
  methods: {
        async getAllfriendsData() {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get('http://localhost:5000/api/friend/list', {
                    headers: {
                        Authorization: token
                    }
                });
                console.log('response', response.data.friends);
                this.friends = response.data.friends;
            } catch (error) {
                console.error(error);
            }
        },
        setFilter(filter) {
            this.activeFilter = filter;
        },
   }
};

</script>
<style scoped>

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
    padding: 20px;
    height: calc(100vh - 100px);
    overflow-y: auto;
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

</style>