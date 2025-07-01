<template>
  <div id="app">
    <NavBarComponent v-if="!$route.meta.hideNavbar" :userData="userData"/>
    <router-view :userData="userData.user"  />
  </div>
</template>
 
<script>
import axios from 'axios'; // Import Axios
import NavBarComponent from "./components/NavBarComponent.vue";

export default {
  name: 'App',
  components: {
     NavBarComponent,
  },
  data() {
    return {
      userData: {}, // Load userData as needed
    };
  },
   computed: {
    isAuthPage() {
    const authPages = ["Login", "SignUp"];
    return authPages.includes(this.$route.name);
    },
  },
  mounted() {
    this.getLoginUserData();
  },
 methods: {
    async getLoginUserData() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get('http://localhost:5000/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.userData = response.data;
        } catch (error) {
          console.error(error);
        }
    },
  }
};

</script>

<style scoped>
#app{
  width:100%;
  max-width: 1024px;
  margin:auto;
  box-shadow: 0px 0px 25px #9e8faf92;
}
@media (max-width: 1024px) {
  .main-container {
      padding: 0 15px;
  }
  
  .friend-list {
      width: 200px;
  }
  
  .right-sidebar {
      width: 250px;
  }
}

@media (max-width: 768px) {
  .main-container {
      flex-direction: column;
  }
  
  .friend-list, .right-sidebar {
      width: 100%;
      height: auto;
  }
  
  .search-bar {
      width: 200px;
  }
}

@media (max-width: 576px) {
  .nav-container {
      padding: 10px;
  }
  
  .logo h1 {
      font-size: 20px;
  }
  
  .search-bar {
      width: 150px;
  }
  
  .post-actions {
      flex-direction: column;
      gap: 10px;
  }
}
</style>
