<template>
    <div class="chat-section">
        <div class="chat-header">
            <div class="user-header">
                <span class="user-main">
                    <img src="../assets/images/img-01.jpg" alt="" />
                </span>
                <h2>Ava Davis</h2>
            </div>
            <img src="../assets/images/icon-threedot.png" alt="" class="threedot" />
        </div>

        <div class="all-chat">
            <div class="chat-box">
                <img src="../assets/images/img-01.jpg" alt="" />
                <div class="chat-txt">
                    <h4>Ava <span>* 5m</span></h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
            <div class="chat-box my-message">
                <img src="../assets/images/img-04.jpg" alt="" />
                <div class="chat-txt">
                    <h4>Ava <span>* 5m</span></h4>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
            </div>
            <div class="chat-box">
                <img src="../assets/images/img-01.jpg" alt="" />
                <div class="chat-txt">
                    <h4>Ava <span>* 5m</span></h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>

        <div class="chat-type">
            <img src="../assets/images/icon-plus.png" alt="" />

            <form class="message-type">
                <input type="text" name="text" placeholder="Enter Message...">
                <img src="../assets/images/icon-emoji.png" alt="" />
                <img src="../assets/images/icon-attach.png" alt="" />
            </form>

            <img src="../assets/images/icon-send.png" alt="" class="send-icon" />
        </div>

    </div>
</template>
<script>
</script>
<style scoped>
.chat-section {
    flex-grow: 1;
    height: 100%;
    background: #332F54;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
}

.chat-header {
    width: 100%;
    height: fit-content;
    padding: 10px 4% 5px 4%;
    border-bottom: 2px solid #544F7E;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}

.user-header {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-header .user-main img {
    width: 50px;
    border-radius: 50%;
    border: 3px solid #EEC291;
}

.user-main {
    position: relative;
}

.user-main::after {
    content: '';
    width: 13px;
    height: 13px;
    background: greenyellow;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    z-index: 20;
}

.user-header h2 {
    margin-top: -8px;
    color: #E2D3F4;
}

.threedot {
    width: 40px;
}

.chat-type {
    width: 100%;
    height: 65px;
    border-top: 2px solid #544F7E;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    padding: 12px 4%;
    background: #332F54;
}

.chat-type img {
    width: 25px;
}

.message-type {
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    border: 2px solid #544F7E;
    padding: 10px 15px;
    border-radius: 15px;
}

.message-type input {
    flex-grow: 1;
    font-size: 16px;
    color: #E2D3F4;
}

.message-type input::placeholder {
    color: #9386a2;
}

.all-chat {
    width: 100%;
    height: 72%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 20px 4% 65px 4%;
}

.all-chat::-webkit-scrollbar {
    display: none;
}

.chat-box {
    width: 60%;
    height: fit-content;
    background: #49426E;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    padding: 15px;
    border-radius: 15px;
    gap: 15px;
    margin-bottom: 15px;
}

.chat-box img {
    width: 40px;
    border-radius: 50%;
    border: 3px solid #EEC291;
}

.chat-txt h4 {
   color: #EEC291;
   font-size: 14px;
   margin-bottom: 5px;
}

.chat-txt p {
    color: #DDD9D0;
}

.my-message {
    margin-left: 40%;
    background: #3F3b62;
}

.chat-txt h4 span {
   color: #E2D3F4;
}

.toggle-btn {
    display: none;
}

.toggle-btn img {
   width: 27px;
}

.side-menu .search-bar {
    display: none;
}
</style>