<template>
  <div class="container">
    <header>Login Form</header>
    <div>
        <div class="field">
          <div class="label">Username/Email</div>
          <input type="text" v-model="emailOrUsername"/>
        </div>
        <div class="field">
          <div class="label">Password</div>
          <input type="password" v-model="password"/>
        </div>
        <button  @click.prevent="handleLogin">Login</button>
        <p style="margin-top: 1rem;">
          Don't have an account?
          <a href="/sign-up">Sign up</a>
        </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios
export default {
  data() {
    return {
        emailOrUsername: "",
        password: "",
    };
  },
  mounted() {
     
  },

  methods: {
    async handleLogin() {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            emailOrUsername: this.emailOrUsername,
            password: this.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          let token = res.data.token;
          if (res.data.success && token ) {
               localStorage.setItem('token', res.data.token); 
              this.$router.push({ name: 'Home' }); // Redirect to home/chat page
          }
          
        } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || 'Login failed!');
        }
      },

      navigateTo(route) {
        this.$router.push({ name: route });
      }
  }

};
</script>

<style scoped>
.container{
  width: 100%;
  max-width: 470px;
  background: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 50px 35px 10px 35px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
}
.container header{
  font-size: 35px;
  font-weight: 600;
  margin: 0 0 30px 0;
}
 .field{
  width: 330px;
  height: 45px;
  margin: 45px 0;
  display: flex;
  position: relative;
  gap:25px;
}
 .label{
  position: absolute;
  top: -30px;
  font-weight: 500;
}
 input{
  height: 100%;
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding-left: 15px;
  font-size: 18px;
}
 button{
  width: 64%;
    height: calc(100% + 5px);
    border: none;
    background: #004953;
    margin-top: -20px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.5s ease;
    padding: 11px;
}
</style>
