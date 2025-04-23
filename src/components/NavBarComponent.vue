<template>
    <div class="navbar">
        <div class="nav-left">
        <button class="toggle-btn" id="toggleBtn">
            <img src="../assets/images/icon-menu.svg" alt=""/>
        </button>
            <img src="../assets/images/logo.svg" alt="" class="main-logo"/>
        </div>
        <div class="nav-right">
            <form class="search-bar">
                <img src="../assets/images/icon-search.svg" alt="search"/>
                <input type="text" name="" placeholder="Search here...">
            </form>
            <img src="../assets/images/icon-setting.svg" alt="" class="setting"/>
            <a href="#" class="user">
                <img src="../assets/images/img-04.jpg" alt=""/>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NavBarComponent',
    methods: {
        navigateTo(page) {
            this.$router.push({ name: page });
        }
    }
};  
</script>
<style>
.navbar {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 20px 3rem !important;
}

.nav-left,.nav-right {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 30px;
}

.main-logo {
    width: 120px;
}

.search-bar {
    width: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items:center;
    background: #E2D3F4;
    padding: 0px 8px 0px 13px;
    border-radius: 8px;
}

.search-bar img {
    width: 22px;
    height: 22px;
}

.search-bar input {
    width: 100%;
    font-size: 17px;
    font-weight: 400;
    padding-left: 12px;
    color: #332F54;
}

.setting {
    width: 30px;
}

.user {
    position: relative;
}

.user img {
    width: 40px;
    border-radius: 50%;
    border: 3px solid #EEC291;
}

.user::after {
    content: '';
    width: 13px;
    height: 13px;
    background: greenyellow;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
}
</style>