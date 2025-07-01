import Vue from "vue";
import VueRouter from "vue-router";
import LogInComponent from "./components/LogInComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";
import AddFriendsComponent from "./components/AddFriendsComponent.vue";
import SignUpComponent from "./components/SignUpComponent.vue"
import FriendRequestComponent from "./components/FriendRequestComponent.vue";
import ProfileSettingComponent from "./components/ProfileSettingComponent.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LogInComponent,
         meta: { hideNavbar: true }
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUpComponent,
         meta: { hideNavbar: true }
    },
    {
        path: '/home',
        name: 'Home',
        props:true,
        component: HomeComponent
    },
    {
        path: '/user/list',
        name: 'UserList',
        component: AddFriendsComponent
    },
    {
        path: '/friend/request',
        name: 'FriendRequest',
        component: FriendRequestComponent
    },
    {
        path: '/profile/sttings',
        name: 'ProfileSetting',
        props: (route) => ({ userData: route.params.userData }),
        component: ProfileSettingComponent
    },
];

const router = new VueRouter({
  mode: "history", // or 'hash' for hash mode
  routes,
});

export default router;
