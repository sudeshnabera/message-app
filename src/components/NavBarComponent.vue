<template>
        <div class="nav-container navbar navbar-expand-lg sticky-top w-100">
            <!-- Logo -->
             <div>
                <a class="navbar-brand" href="#">
                    <img src="/placeholder.svg?height=40&width=120" alt="Logo">
                </a>
             </div>
            
            
            <!-- Search Bar - Visible on desktop -->
            <!-- <div class="search-container d-none d-lg-block">
                <i class="fas fa-search search-icon"></i>
                <input type="text" placeholder="Search...">
            </div> -->
            
            <!-- Hamburger Menu Button -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <i class="fas fa-bars"></i>
            </button>
            
            <!-- Navbar Content -->
            <div class="collapse navbar-collapse" id="navbarContent">
                <!-- Search Bar - Visible on mobile -->
                <!-- <div class="search-container d-block d-lg-none">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" placeholder="Search...">
                </div> -->
                
                <!-- Main Navigation -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                            <i class="fas fa-home"></i>
                            <span class="d-lg-none ms-2">Home</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-newspaper"></i>
                            <span class="d-lg-none ms-2">News Feed</span>
                        </a>
                    </li>
                    <!-- Payment -->
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-wallet"></i>
                            <span class="d-lg-none ms-2">Payments</span>
                        </a>
                    </li>
                    
                    <!-- Notifications Dropdown -->
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-bell"></i>
                            <span class="badge-notification">3</span>
                            <span class="d-lg-none ms-2">Notifications</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <div class="dropdown-header">Notifications</div>
                            
                            <a class="dropdown-item" href="#">
                                <div class="icon">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div class="content">
                                    <div class="title">John Doe liked your post</div>
                                    <div class="subtitle">Your photo received a new like</div>
                                </div>
                                <div class="time">2m</div>
                            </a>
                            
                            <a class="dropdown-item" href="#">
                                <div class="icon">
                                    <i class="fas fa-comment"></i>
                                </div>
                                <div class="content">
                                    <div class="title">New comment from Sarah</div>
                                    <div class="subtitle">Sarah commented on your photo</div>
                                </div>
                                <div class="time">1h</div>
                            </a>
                            
                            <a class="dropdown-item" href="#">
                                <div class="icon">
                                    <i class="fas fa-calendar"></i>
                                </div>
                                <div class="content">
                                    <div class="title">Event Reminder</div>
                                    <div class="subtitle">Team meeting starts in 30 minutes</div>
                                </div>
                                <div class="time">30m</div>
                            </a>
                            
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-center" href="#">See all notifications</a>
                        </div>
                    </li>
                    
                    <!-- Friend Requests Dropdown -->
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user-friends"></i>
                            <span class="badge-notification">2</span>
                            <span class="d-lg-none ms-2">Friend Requests</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <div class="dropdown-header">Friend Requests</div>
                            
                            <a class="dropdown-item" href="#">
                                <div class="icon">
                                    <img src="/placeholder.svg?height=36&width=36" alt="User" style="border-radius: 50%;">
                                </div>
                                <div class="content">
                                    <div class="title">Michael Johnson</div>
                                    <div class="subtitle">2 mutual friends</div>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-primary">Accept</button>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="icon">
                                    <img src="/placeholder.svg?height=36&width=36" alt="User" style="border-radius: 50%;">
                                </div>
                                <div class="content">
                                    <div class="title">Emily Wilson</div>
                                    <div class="subtitle">5 mutual friends</div>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-primary">Accept</button>
                                </div>
                            </a>
                            
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-center" href="#">See all requests</a>
                        </div>
                    </li>
                    <li>
                        <a class="nav-link" href="/user/list">
                            <i class="fa-solid fa-user-group"></i>
                            <span class="d-lg-none ms-2">Add Friends</span>
                        </a>
                    </li>
                    <!-- Profile Dropdown -->
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                            <img src="/placeholder.svg?height=30&width=30" alt="Profile" style="border-radius: 50%;">
                            <span class="d-lg-none ms-2">Profile</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end profile-dropdown">
                            <div class="profile-header">
                                <div class="profile-pic">
                                    <img src="/placeholder.svg?height=60&width=60" alt="Profile">
                                </div>
                                <div class="profile-info" v-if="userData">
                                    <h6>{{userData.user.username}}</h6>
                                    <p>{{userData.user.email}}</p>
                                </div>

                            </div>
                            
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-user me-2"></i> My Profile
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-cog me-2"></i> Settings
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-wallet me-2"></i> My Wallet
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-question-circle me-2"></i> Help Center
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-sign-out-alt me-2"></i> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</template>
<script>
export default {
    name: 'NavBarComponent',
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            
        };
    },
    mounted() {
      console.log(this.userData)  // Any initialization code can go here
    },
    methods: {
        navigateTo(page) {
            this.$router.push({ name: page });
        }
    }
};  
</script>
<style>
 
.navbar {
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
}

.navbar-brand img {
    height: 40px;
}

.nav-item {
    position: relative;
    margin: 0 5px;
}

.nav-link {
    color: var(--text-color);
    font-weight: 500;
    padding: 0.5rem 0.8rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    transition: all 0.2s;
}

.nav-link:hover {
    background-color: var(--hover-bg);
}

.nav-link.active {
    color: var(--primary-color);
}

.badge-notification {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--notification-bg);
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
}

.dropdown-menu {
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 360px;
    padding: 0.5rem 0;
}

.dropdown-menu.profile-dropdown {
    width: 280px;
}

.dropdown-header {
    font-weight: bold;
    color: var(--text-color);
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--secondary-color);
}

.dropdown-item {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
}

.dropdown-item:hover {
    background-color: var(--hover-bg);
}

.dropdown-item .icon {
    width: 36px;
    height: 36px;
    background-color: var(--secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
}

.dropdown-item .content {
    flex: 1;
}

.dropdown-item .title {
    font-weight: 500;
    margin-bottom: 2px;
}

.dropdown-item .subtitle {
    font-size: 0.8rem;
    color: var(--light-text);
}

.dropdown-item .time {
    font-size: 0.75rem;
    color: var(--light-text);
}

.profile-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--secondary-color);
}

.profile-pic {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
}

.profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-info h6 {
    margin-bottom: 2px;
}

.profile-info p {
    margin-bottom: 0;
    color: var(--light-text);
    font-size: 0.9rem;
}

.search-container {
    position: relative;
    width: 240px;
}

.search-container input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border-radius: 20px;
    border: none;
    background-color: var(--secondary-color);
}

.search-container input:focus {
    outline: none;
    background-color: #E4E6E9;
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--light-text);
}

/* Mobile optimizations */
@media (max-width: 991.98px) {
    .navbar-collapse {
        background-color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        z-index: 1000;
    }
    
    .search-container {
        width: 100%;
        margin-bottom: 1rem;
    }
    
    .dropdown-menu {
        width: 100%;
        position: static !important;
        transform: none !important;
        margin-top: 0.5rem;
    }
    
    .nav-item {
        margin: 5px 0;
    }
    
    .nav-link {
        width: 100%;
        border-radius: 8px;
        justify-content: flex-start;
        padding: 0.75rem 1rem;
    }
    
    .nav-link i {
        margin-right: 10px;
    }
    
    .badge-notification {
        position: relative;
        display: inline-flex;
        margin-left: 10px;
        top: auto;
        right: auto;
    }
}
</style>