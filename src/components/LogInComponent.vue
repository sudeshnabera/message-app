<template>
  <div class="main">
    <!-- <input type="checkbox" id="chk" aria-hidden="true"> -->
    <div class="signup" v-if="$route.name === 'SignUp'">
      <form @submit.prevent="handleSignUp">
        <label for="chk">Sign up</label>
        <input
          type="text"
          v-model="signUpData.username"
          placeholder="User name"
          required
        />
        <input
          type="email"
          v-model="signUpData.email"
          placeholder="Email"
          required
        />
        <input
          type="number"
          v-model="signUpData.phone"
          placeholder="BrojTelefona"
          required
        />
        <input
          type="password"
          v-model="signUpData.password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign up</button>
        <p>
          Already have an account?
          <a href="#" @click.prevent="navigateTo('Login')">Login</a>
        </p>
        <div class="social-login">
          <p>Or log in with:</p>
          <div id="google-login-button"></div>
          <button @click.prevent="signInWithFacebook" class="facebook">
            Facebook
          </button>
        </div>
      </form>
    </div>

    <div class="login" v-else>
      <form @submit.prevent="handleLogin">
        <label for="chk">Login</label>
        <input
          type="email"
          v-model="loginData.email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          v-model="loginData.password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?
          <a href="#" @click.prevent="navigateTo('SignUp')">Sign up</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios
export default {
  data() {
    return {
      signUpData: {
        username: "",
        email: "",
        phone: "",
        password: "",
      },
      loginData: {
        email: "",
        password: "",
      },
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
    async handleSignUp() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', this.signUpData);
        alert('Sign up successful!',res);
        localStorage.setItem('token', res.data.token);
        this.$router.push({ name: 'Login' }); // Redirect to login page
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Sign up failed!');
      }
    },

  async handleLogin() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', this.loginData);
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
/* Keep your existing styles here */
.signup p,
.login p {
  text-align: center;
}
</style>
