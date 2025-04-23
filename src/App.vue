<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body{
	font-family: 'Jost', sans-serif;
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
.main{
	width: 350px;
	height: fit-content;
	background: red;
	overflow: hidden;
	background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
	margin: auto;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	font-family: 'Jost', sans-serif;
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
  transform: translateY(47px);
	transition: .8s ease-in-out;
}
label{
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 50px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input{
	width: 60%;
	height: 10px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 12px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #573b8a;
	font-size: 1em;
	font-weight: bold;
	margin-top: 30px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #6d44b8;
}
.login{
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
  transform: translateY(47px);
	transition: .8s ease-in-out;
}
.login label{
	color: #573b8a;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-500px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}



@media(max-width:800px) {
    .toggle-btn {
        display: block;
    }
    body {
        padding: 0 3%;
    }

    .main-container {
        min-height: 95vh;
    }
    .side-menu {
        display: none;
        width: 280px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        background: #49426E;
        padding: 20px;
    }
    .side-menu.active {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
    }
    .side-menu ul {
        width: 100%;
        padding: 20px 20px 10px 20px;
    }
    .side-menu ul li {
        margin: 12px 0;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .side-menu ul li img {
        width: 22px;
    }

    .side-menu ul li a {
        font-size: 16px;
    }
    .chat-sec {
        margin-top: 10px;
    }
    .chat {
        gap: 12px;
        margin: 8px 0;
        padding: 8px 17px;
    }
    .chat img {
        width: 30px;
        border: 2px solid #EEC291;
    }
    .chat p {
        font-size: 14px;
    }
    .nav-right .search-bar {
        display: none;
    }
    .side-menu .search-bar {
        display: flex;
        width: 100%;
        padding: 8px 8ppx 8px 10px;
        margin-bottom: 20px;
    }
    .search-bar img {
        width: 20px;
        height: 20px;
    }
    .search-bar input {
        font-size: 16px;
        padding-left: 10px;
    }
    .navbar {
        padding: 15px 4%;
    }
    .nav-left,.nav-right {
        gap: 20px;
    }
    .main-logo {
        width: 100px;
    }
    .setting {
        width: 25px;
    }
    .user img {
        width: 30px;
        border: 2px solid #EEC291;
    }
    .bottom-sec {
        height: 84vh;
        padding: 0 4% 15px 4%;
    }
    .chat-header {
        padding: 10px 4% 0 4%;
    }
    .user-header {
        gap: 12px;
    }
    .user-header .user-main img {
        width: 35px;
        border: 2px solid #EEC291;
    }
    .user-main::after {
        width: 10px;
        height: 10px;
    }
    .user-header h2 {
        font-size: 18px;
    }
    .threedot {
        width: 28px;
    }
    .chat-type {
        height: 65px;
        gap: 10px;
        padding: 12px 4%;
        background: #332F54;
    }
    .chat-type img {
        width: 25px;
    }
    .chat-type .send-icon {
 width: 20px;
    }
    .message-type {
        width: 80%;
        gap: 5px;
        padding: 8px 10px;
    }

    .message-type input {
        width: 80%;
        font-size: 15px;
    }

    .message-type img {
        width: 20px;
    }
    .all-chat {
        height: 76%;
        padding: 15px 4% 0 4%;
    }
    .chat-box {
        width: 70%;
        padding: 12px 15px;
        gap: 12px;
        margin-bottom: 10px;
    }
    .chat-box img {
        width: 30px;
        border: 2px solid #EEC291;
    }
    .chat-txt h4 {
        font-size: 14px;
    }
    .chat-txt p {
        font-size: 14px;
    }
    .my-message {
        margin-left: 30%;
    }
}

@media(max-width:500px) {
    .chat-box {
        max-width: 400px;
        width: 95%;
    }
    .my-message {
        margin-left: 5%;
    }
}



</style>
