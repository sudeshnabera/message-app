<template>
  <div class="main-container">
    <div class="d-flex w-100 gap-4">
      <ChatUsersComponent :groups="groups" :friends="friends"  @user-selected="openChatWithUser"/>
      <ChatBoxComponent  :userData="userData"
        :selectedChat="selectedChat"
        v-if="activeChat"
        :key="selectedChat?._id"/>
      <PostComponent :userData="userData" v-else/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios
import ChatUsersComponent from './ChatUsersComponent.vue';
import ChatBoxComponent from './ChatBoxComponent.vue';
import PostComponent from './PostComponent.vue';
export default {
  components: {
    ChatUsersComponent, 
    ChatBoxComponent,
    PostComponent
  },
  props:['userData'],
  name: 'HomeComponent',
  data() {
    return {
      friends:[],
      groups:[],
      selectedChat: null, 
      activeChat:false,
       socket: null,
    };
  },
  mounted() {
    this.getAllfriendsData();
    this.getUserGroups();
      this.$socket.on("new_message_notification", (notif) => {
            this.handleNotification(notif);
        });
  },
  methods: {
      async getAllfriendsData() {
          const token = localStorage.getItem("token");
          try {
              const response = await axios.get('http://localhost:5000/api/friendrequest/accept/friends', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              console.log('accept friend response', response.data);
              this.friends = response.data.friendList;
          } catch (error) {
              console.error(error);
          }
      },
      async getUserGroups(){
          const token = localStorage.getItem("token");
          try {
            const response = await axios.get('http://localhost:5000/api/groups/get', {
              headers: { Authorization:  `Bearer ${token}` }
              });
            if(response.data.success){
                  this.groups = response.data.allGroups ;
              }  
          } catch (error) {
            console.error(error);
          }
      },
      openChatWithUser(friend) {
        console.log("friend", friend);
        this.activeChat = true;
        this.selectedChat = friend;
      },
      handleNotification(notification) {
         
              this.$toast.info(`New message from ${notification.from}: ${notification.content}`);
          
      }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    position: relative;
}


a {
    text-decoration: none;
    cursor: pointer;
}

button,input {
    background: none;
    border: none;
    outline: none;
}

.main-container {
  max-width: 1920px;
  width: 100%;
  min-height: fit-content;
  height: 100%;

  /* border-radius: 25px; */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  /* border: 5px solid #E2D3F4; */
  box-shadow: 0px 0px 25px #9e8faf92;
  margin: auto;
}

.bottom-sec {
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 4% 20px 4%;
  gap: 20px;
  overflow: hidden;
}





</style>