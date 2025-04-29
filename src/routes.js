import Vue from "vue";
import VueRouter from "vue-router";
import LogInComponent from "./components/LogInComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";
import AddFriendsComponent from "./components/AddFriendsComponent.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LogInComponent
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: LogInComponent
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/user/list',
        name: 'UserList',
        component: AddFriendsComponent
    },
];

const router = new VueRouter({
  mode: "history", // or 'hash' for hash mode
  routes,
});

export default router;
