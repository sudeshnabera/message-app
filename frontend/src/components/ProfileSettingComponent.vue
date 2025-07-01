<template>
    <div class="settings-container">
        <h1>Settings</h1>
    
        <!-- Profile Section -->
        <section class="settings-section">
          <h2>Update Your Profile</h2>

          <label for="file-input" id="file-label">
            <input id="file-input" type="file" ref="fileInput" @change="previewImage"/>
            <img id="img-preview" ref="imagePreview" :src="profile.profilePhoto"/>
            <p>Click the Image to Upload</p>
          </label>

          <label>Name</label>
          <input type="text" v-model="profile.name" placeholder="Your name" />

          <label>Bio</label>
          <input type="text" v-model="profile.bio" placeholder="Your Bio" />

          <label>DOB</label>
          <input type="text" v-model="profile.dob" placeholder="Your Date Of Birth" />

          <label>Phone</label>
          <input type="text" v-model="profile.phone" placeholder="Your Phone" />

          <label>Email</label>
          <input type="email" v-model="profile.email" placeholder="Your email" />
    
          <label>Password</label>
          <input type="password" v-model="profile.password" placeholder="New password" />
    
          <button @click="updateProfile">Update Profile</button>
        </section>
    </div>
</template>

<script>
import axios from "axios"; // Import Axios
export default {
    name: "ProfileSettingComponent",
    props: {
        userData: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            profile: { },
            profilePhoto: "https://images.unsplash.com/photo-1620163280053-68782bd98475?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        };
    },
    mounted() {
        console.log("User ID:", this.userData);
        this.profile = this.userData.user;
    },
    methods: {
        previewImage(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                this.profilePhoto = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async updateProfile() {
            const token = localStorage.getItem("token");
            if (!token) {
            alert("You are not authenticated. Please log in again.");
            return;
            }

            try {
            await axios.put(
                "http://localhost:5000/api/user/update",
                this.profile, // Send the updated profile data
                {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
                }
            );
                this.$router.push('/home')
            } catch (error) {
            console.error("Error updating profile:", error.response?.data?.message || error.message);
            alert("Failed to update profile. Please try again.");
            }
        },
    },
};
</script>

<style scoped>
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
    width:140px;
    height:140px;
    border-radius: 50%;
    outline: 3px solid #004953;
    cursor: pointer;
    transition: 200ms ease-in-out;
  }
  .settings-container {
    max-width: 600px;
    margin: 40px auto;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .settings-container h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  .settings-section {
    margin-bottom: 30px;
  }
  
  .settings-section h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #444;
  }
  
  .settings-section label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  .settings-section input[type="text"],
  .settings-section input[type="email"],
  .settings-section input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .settings-section input[type="checkbox"] {
    margin-right: 10px;
  }
  
  button {
    height: 45px;
    border: none;
    background: #004953;
    margin-top: 20px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    padding: 0 15px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .danger-zone h2 {
    color: #c0392b;
  }
  
  button.danger {
    background-color: #e74c3c;
  }
  
  button.danger:hover {
    background-color: #c0392b;
  }
  
</style>    