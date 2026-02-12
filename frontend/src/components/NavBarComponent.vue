<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm px-3 py-2 w-100">
        <div class="container-fluid">
          
          <!-- Logo -->
          <a class="navbar-brand" href="/home">
           <!-- // <img src="@/assets/images/talksy_logo.webp" alt="Logo"> -->
            <h3 class="talksy_logo">Talksy</h3>
          </a>
      
          <!-- Hamburger Menu Button -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- <span class="nav-toggle" @click="toggleMenu()">☰</span> -->
          <!-- Navbar Content -->
          <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              
              <!-- Home -->
              <li class="nav-item">
                <a class="nav-link active" href="/home">
                  <i class="fas fa-home"></i>
                  <span class="d-lg-none ms-2">Home</span>
                </a>
              </li>

      
              <!-- Notifications Dropdown -->
              <li class="nav-item dropdown">
                <a class="nav-link position-relative" href="#" role="button" data-bs-toggle="dropdown">
                  <i class="fas fa-bell"></i>
                  <span class="badge bg-danger position-absolute top-0 start-100 translate-middle badge-notification">3</span>
                  <span class="d-lg-none ms-2">Notifications</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li class="dropdown-header">Notifications</li>
                  <li>
                    <a class="dropdown-item d-flex align-items-start" href="#">
                      <i class="fas fa-heart me-2 text-danger"></i>
                      <div>
                        <div class="fw-bold">John Doe liked your post</div>
                        <small class="text-muted">2m ago</small>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex align-items-start" href="#">
                      <i class="fas fa-comment me-2 text-primary"></i>
                      <div>
                        <div class="fw-bold">New comment from Sarah</div>
                        <small class="text-muted">1h ago</small>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex align-items-start" href="#">
                      <i class="fas fa-calendar me-2 text-success"></i>
                      <div>
                        <div class="fw-bold">Event Reminder</div>
                        <small class="text-muted">30m ago</small>
                      </div>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-center" href="#">See all notifications</a></li>
                </ul>
              </li>
      
              <!-- Friend Requests -->
              <li class="nav-item dropdown">
                <a class="nav-link position-relative" href="/friend/request">
                  <i class="fas fa-user-friends"></i>
                  <span class="badge bg-danger position-absolute top-0 start-100 translate-middle badge-notification">2</span>
                  <span class="d-lg-none ms-2">Friend Requests</span>
                </a>
              </li>
      
              <!-- Add Friends -->
              <li class="nav-item">
                <a class="nav-link" href="/user/list">
                 <i class="fa-solid fa-user-plus"></i>
                  <span class="d-lg-none ms-2">Add Friends</span>
                </a>
              </li>
      
              <!-- Profile Dropdown -->
              <li class="nav-item dropdown">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                  <img :src="userData.user?.profilePhoto" alt="Profile" class="rounded-circle"  style="width: 2.8rem;">
                  <span class="d-lg-none ms-2">Profile</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li class="px-3 py-2 text-center"> 
                    <img :src="userData.user?.profilePhoto" alt="Profile" class="rounded-circle mb-2"  style="width:70px;">
                    <div v-if="userData">
                      <strong>{{userData.user?.name}}</strong>
                      <br>
                      <small class="text-muted">{{userData.user?.bio}}</small>
                    </div>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i> My Profile</a></li>
                  <li><a class="dropdown-item" href="#" @click.prevent="navigateToSettings"><i class="fas fa-cog me-2"></i> Settings</a></li>
                  <li><a class="dropdown-item" href="#"><i class="fas fa-wallet me-2"></i> My Wallet</a></li>
                  <li><a class="dropdown-item" href="#"><i class="fas fa-question-circle me-2"></i> Help Center</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" @click.prevent="logout"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
                </ul>
              </li>
      
            </ul>
          </div>
        </div>
      </nav>
      
</template>
<script>
export default {
    name: 'NavBarComponent',
    props: {
        userData: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
             talksy_logo:'/src/assets/images/talksy_logo.webp',
        };
    },
    mounted() {
      console.log(this.userData)  // Any initialization code can go here
    },
    methods: {
        navigateTo(page) {
            this.$router.push({ name: page });
        },
        logout() {
          // Clear the token from localStorage
          localStorage.removeItem("token");
          // Redirect the user to the login page
          this.$router.push({ name: "Login" });
        },
        navigateToSettings() {
          this.$router.push({
            name: "ProfileSetting",
            params: { userData: this.userData }, // Pass userData as a route param
          });
        },
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



.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--light-text);
}
.nav-link i {
     color: #004953;
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
        margin-left: -15px;
        top: auto;
        right: auto;
    }
}


    .talksy_logo {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: #004953;
      position: relative;
      letter-spacing: 0.5px;
    }



    .talksy_logo::after {
      content: "";
      position: absolute;
      width: 70px;
      height: 3px;
      background: linear-gradient(90deg, #004953 0%, transparent 100%);
      bottom: 0;
      left: 0;
      border-radius: 3px;
    }

</style>