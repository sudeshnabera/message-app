<template>
    <div class="bg-white">
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
                                <p class="text-muted">500m away</p>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <button class="btn btn-primary pull-right" @click="sendRequest(user.id)">Add Friend</button>
                            </div>
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
            const response = await axios.get('http://localhost:5000/api/all_user/list', {
                headers: {
                Authorization: token
                }
            });
            console.log('response', response.data);
            this.allUserData = response.data
           
            } catch (error) {
            console.error(error);
            }
        },
        async sendRequest(receiverId) {
            console.log("function called", receiverId);
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/friend/request", 
                    { receiverId },
                    {
                        headers: {
                        Authorization: token
                        }
                    }
                );
                console.log('response', response.data);
                alert(response.data.message);  // Friend request sent
            } catch (error) {
                alert(error.response.data.message);  // Already sent, or error
            }
        }
    }
};
</script>    
<style>
.people-nearby .google-maps{
    background: #f8f8f8;
    border-radius: 4px;
    border: 1px solid #f1f2f2;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .people-nearby .google-maps .map{
    height: 300px;
    width: 100%;
    border: none;
  }
  
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

</style>