<template>
  <div class="container">
    <header>Login Form</header>
    <div>
        <div class="field">
          <div class="label">Username</div>
          <input type="text" v-model="email"/>
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
        email: "",
        password: "",
    };
  },
  mounted() {
    // this.loadGoogleSignIn();
    // let signUp_user = localStorage.getItem("signUp-user-info");
    // if (signUp_user) {
    //   this.$router.push({ name: 'Home' });
    // } 
    // let logIn_user = localStorage.getItem("logIn-user-info");
    // if (logIn_user) {
    //   this.$router.push({ name: 'Home' });
    // } 
  },

  methods: {
    // async handleSignUp() {
    //   try {
    //     // Send signup data to the backend
    //     const response = await axios.post('http://localhost:3000/users', this.signUpData);
    //     localStorage.setItem('user-info', JSON.stringify(response.data)); // Store user data in local storage
    //     this.$router.push({ name: 'Home' });
    //   } catch (error) {
    //     console.error('Signup Error:', error.response.data);
    //     alert('Signup failed. Please try again.');
    //   }
    // },
    // async handleLogin() {
    //   try {
    //       console.log(this.loginData.email)
    //       const response = await axios.get(`http://localhost:3000/users?email=${this.loginData.email}&password=${this.loginData.password}`);
    //       const user = response.data[0]; // since json-server returns array
    //       if (user) {
    //         // Save to localStorage or Vuex if needed
    //         localStorage.setItem('logIn-user-info', JSON.stringify(response.data[0]));
    //         this.$router.push({ name: 'Home' });
    //       } else {
    //         alert('User not found or incorrect credentials');
    //       }
    //   } catch (error) {
    //     console.error('Login Error:', error.response.data);
    //   }
    // },
    // navigateTo(routeName) {
    //   this.$router.push({ name: routeName });
    // },
    // loadGoogleSignIn() {
    //   if (!window.google) {
    //     console.error("Google API not loaded yet.");
    //     return;
    //   }

    //   window.google.accounts.id.initialize({
    //     client_id: "28008010529-efkpti17k9q0u6phtv3er3nslqirqkmn.apps.googleusercontent.com",
    //     callback: this.handleGoogleLogin,
    //     ux_mode: "popup",
    //   });

    //   window.google.accounts.id.renderButton(
    //     document.getElementById("google-login-button"),
    //     { theme: "outline", size: "large" }
    //   );
    // },
    // handleGoogleLogin(response) {
    //   console.log("Google Login Successful", response);
    //   const token = response.credential;

    //   // Store token
    //   localStorage.setItem("google_token", token);

    //   // // Redirect to /home
    //   // this.$router.push("/home");
    // }
   

  async handleLogin() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert('Login successful!',res);
        // Store user/token if needed
        // localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token); // if using JWT later
        this.$router.push({ name: 'Home' }); // Redirect to home/chat page
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
