import Vue from 'vue';
import App from './App.vue';
import store from './store'; // Assuming store.js is in the same directory as main.js
import router from './routes'
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
  store: store // Use the Vuex store
}).$mount('#app');