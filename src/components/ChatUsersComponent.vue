<template>
    <div class="side-menu" id="SideMenu">
        <ul>
          <li>
            <img src="../assets/images/home-icon.png" alt=""/>
            <a href="#" class="active">Home</a>
          </li>
          <li>
            <img src="../assets/images/group-icon.png" alt=""/>
            <a href="#">Groups</a>
          </li>
          <li>
            <img src="../assets/images/profile-icon.png" alt=""/>
            <a href="#">Profile</a>
          </li>
          <li>
            <img src="../assets/images/notification-icon.png" alt=""/>
            <a href="#">Notifications</a>
          </li>
          <li>
            <img src="../assets/images/logout-icon.png" alt=""/>
            <a href="#">Logout</a>
          </li>
        </ul>
        <div class="chat-sec">
            <div class="chat">
                <img src="../assets/images/img-05.jpg" alt=""/>
                <p>Liam Brown</p>
            </div>
            <div class="chat">
                <img src="../assets/images/img-02.jpg" alt=""/>
                <p>Emma Johnson</p>
            </div>
            <div class="chat">
                <img src="../assets/images/img-03.jpg" alt=""/>
                <p>Sophia Martinez</p>
            </div>
            <div class="chat">
                <img src="../assets/images/img-06.jpg" alt=""/>
                <p>Noah Wilson</p>
            </div>
          </div>
    </div>
</template>
<script>

</script>
<style scoped>


.side-menu {
    width: 250px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

.side-menu::-webkit-scrollbar {
    display: none;
}

.side-menu ul {
    list-style-type: none;
    background: #332F54;
    padding: 40px 20px 20px 20px;
    border-radius: 20px;
}

.side-menu ul li {
    margin: 15px 0;
    display: flex;
    align-items: center;
    gap: 15px;
}

.side-menu ul li:first-child {
    margin-top: 0;
}

.side-menu ul li img {
    width: 25px;
}

.side-menu ul li a {
    text-decoration: none;
    color: #E2D3F4;
    font-weight: 500;
    font-size: 18px;
    transition: 0.4s;
}

.side-menu ul li a:hover, .side-menu ul li .active {
    color: #fff;
}

.chat-sec {
    width: 100%;
    height: fit-content;
    margin-top: 20px;
}

.chat {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;
  background: #332F54;
  padding: 10px 20px;
  border-radius: 15px;
  transition: 0.4s;    
}
.chat img {
    width: 35px;
    border-radius: 50%;
    border: 3px solid #EEC291;
}

.chat p {
    font-size: 17px;
    color: #E2D3F4;
    font-weight: 500;
    transition: 0.4s;
}

.chat:hover {
    background: #E2D3F4;
}

.chat:hover p {
    color: #332F54;
}
</style>