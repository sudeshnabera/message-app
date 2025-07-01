import Vue from 'vue';
import App from './App.vue';
import router from './routes'
import '@fortawesome/fontawesome-free/css/all.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.use(Toast);
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
  
}).$mount('#app');