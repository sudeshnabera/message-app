<template>
  <div class="container">
    <header>Signup Form</header>

    <!-- progress bar (unchanged) -->
    <div class="progress-bar">
      <div class="step" v-for="step in 4" :key="step">
        <p :class="{ active: current >= step }">{{ stepNames[step - 1] }}</p>
        <div class="bullet" :class="{ active: current >= step }">
          <span>{{ step }}</span>
        </div>
        <div class="check fas fa-check" :class="{ active: current > step }"></div>
      </div>
    </div>

    <!-- Animated Form Pages -->
    <div class="form-outer">
      <transition name="fade-slide" mode="out-in">
        <div :key="current" class="page">
          <!-- Page 1 -->
          <div v-if="current === 1">
            <div class="title">Basic Info:</div>
            <label for="file-input" id="file-label">
              <input id="file-input" type="file" ref="fileInput" @change="previewImage"/>
              <img id="img-preview" ref="imagePreview"
              :src="profilePhoto"/>
              <p>Click the Image to Upload</p>
            </label>
            <div class="field">
              <div class="label">Name</div>
              <input type="text" v-model="name"/>
            </div>
            <div class="field">
              <div class="label">Bio</div>
              <input type="text" v-model="bio"/>
            </div>
            <div class="field">
              <button @click.prevent="nextStep">Next</button>
            </div>
          </div>

          <!-- Page 2 -->
          <div v-else-if="current === 2">
            <div class="title">Contact Info:</div>
            <div class="field" >
              <div class="label">Email Address</div>
              <input type="text" v-model="email" />
            </div>
            <div class="field">
              <div class="label">Phone Number</div>
              <input type="number" v-model="phone"/>
            </div>
            <div class="field btns">
              <button @click.prevent="prevStep">Previous</button>
              <button @click.prevent="nextStep">Next</button>
            </div>
          </div>

          <!-- Page 3 -->
          <div v-else-if="current === 3">
            <div class="title">Date of Birth:</div>
            <div class="field">
              <div class="label">Date</div>
              <input type="date" v-model="dob"/>
            </div>
            <div class="field">
              <div class="label">Gender</div>
              <select v-model="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="field btns">
              <button @click.prevent="prevStep">Previous</button>
              <button @click.prevent="nextStep">Next</button>
            </div>
          </div>

          <!-- Page 4 -->
          <div v-else-if="current === 4">
            <div class="title">Login Details:</div>
            <div class="field">
              <div class="label">Username</div>
              <input type="text"  v-model="username"/>
            </div>
            <div class="field">
              <div class="label">Password</div>
              <input type="password"  v-model="password"/>
            </div>
            <div class="field btns">
              <button @click.prevent="prevStep">Previous</button>
              <button @click.prevent="handleSignUp">Submit</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="switch-link" id="toLogin">Already have an account? <a href="/login">Login</a></div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "SignUpComponent",
  data() {
    return {
      current: 1,
      stepNames: ['Name', 'Contact', 'Birth', 'Submit'],
      name: '',
      bio: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      username: '',
      password: '',
      profilePhoto: "https://images.unsplash.com/photo-1620163280053-68782bd98475?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
  },
  methods: {
    nextStep() {
      if (this.current < 4) this.current++;
    },
    prevStep() {
      if (this.current > 1) this.current--;
    },
    submitForm() {
      this.current++; 
      setTimeout(() => {
        alert('Your Form Successfully Signed up');
        location.reload();
      }, 800);
    },
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
    async handleSignUp() {

      try {
        const res = await axios.post('http://localhost:5000/api/auth/register',{ 
          name: this.name,
          bio: this.bio,
          email: this.email,
          phone: this.phone,
          dob: this.dob,
          gender: this.gender,
          username: this.username,
          password: this.password,
          profilePhoto: this.profilePhoto,
         });
        alert('Sign up successful!',res);
        localStorage.setItem('token', res.data.token);
        this.$router.push({ name: 'Login' }); // Redirect to login page
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Sign up failed!');
      }
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

::selection{
  color: #fff;
  background: #004953;
}
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
.container .form-outer{
  width: 100%;
  overflow: hidden;
}
.container .form-outer {
  display: flex;
  width: 400%;
}
.form-outer  .page{
  width: 25%;
  transition: margin-left 0.3s ease-in-out;
}
.form-outer  .page .title{
  text-align: left;
  font-size: 25px;
  font-weight: 500;
}
.form-outer  .page .field{
  width: 330px;
  height: 45px;
  margin: 45px 0;
  display: flex;
  position: relative;
  gap:25px;
}
 .page .field .label{
  position: absolute;
  top: -30px;
  font-weight: 500;
}
 .page .field input{
  height: 100%;
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding-left: 15px;
  font-size: 18px;
}
 .page .field select{
  width: 100%;
  padding-left: 10px;
  font-size: 17px;
  font-weight: 500;
  border: 1px solid lightgrey;
  border-radius: 5px;
}
 .page .field button{
  width: 100%;
  height: calc(100% + 5px);
  border: none;
  background: #004953;
  margin-top: -20px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.5s ease;
}
 .page .field button:hover{
  background: #000;
}
 .page .btns button{
  margin-top: -20px!important;
}
 .page .btns button.prev{
  margin-right: 3px;
  font-size: 17px;
}
 .page .btns button.next{
  margin-left: 3px;
}
.container .progress-bar{
  display: flex;
  margin: 40px 0;
  user-select: none;
  flex-direction: row;
}
.container .progress-bar .step{
  text-align: center;
  width: 100%;
  position: relative;
}
.container .progress-bar .step p{
  font-weight: 500;
  font-size: 18px;
  color: #000;
  margin-bottom: 8px;
}
.progress-bar .step .bullet{
  height: 25px;
  width: 25px;
  border: 2px solid #000;
  display: inline-block;
  border-radius: 50%;
  position: relative;
  transition: 0.2s;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
}
.progress-bar .step .bullet.active{
  border-color: #004953;
  background: #004953;
}
.progress-bar .step .bullet span{
  position: absolute;
  left: 50%;
  top: -13%;
  transform: translateX(-50%);
}
.progress-bar .step .bullet.active span{
  display: none;
}
.progress-bar .step .bullet:before,
.progress-bar .step .bullet:after{
  position: absolute;
  content: '';
  bottom: 11px;
  right: -72px;
  height: 3px;
  width: 65px;
  background: #262626;
}
.progress-bar .step .bullet.active:after{
  background: #004953;
  transform: scaleX(0);
  transform-origin: left;
  animation: animate 0.3s linear forwards;
}
@keyframes animate {
  100%{
    transform: scaleX(1);
  }
}
.progress-bar .step:last-child .bullet:before,
.progress-bar .step:last-child .bullet:after{
  display: none;
}
.progress-bar .step p.active{
  color: #004953;
  transition: 0.2s linear;
}
.progress-bar .step .check{
  position: absolute;
  left: 50%;
  top: 72%;
  font-size: 15px;
  transform: translate(-50%, -50%);
  display: none;
}
.progress-bar .step .check.active{
  display: block;
  color: #fff;
}

.step .bullet.active {
  background-color: #3498db;
  color: white;
}
.step .check.active {
  color: #3498db;
}
.step p.active {
  font-weight: bold;
  color: #3498db;
}
.slide-page {
  display: flex;
  width: 400%;
  transition: margin-left 0.5s ease;
}
.page {
  width: 100%;
  padding: 20px;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
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

.form-outer img {  
  max-width:125px;
  border-radius: 999px;
  outline: 3px solid #004953;
  cursor: pointer;
  transition: 200ms ease-in-out;
  
/* prevents uploaded image from distortion: */
  aspect-ratio: 1;
  object-fit: cover;
}

.form-outer img:hover {
  outline: 8px solid #004953;
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 30px; opacity: 0;}
}
.switch-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
  transition: color 0.3s, transform 0.2s;
}

.switch-link:hover {
  color: #667eea;
  transform: translateY(-1px);
}
</style>