import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myLib from './myLib.js'
import axios from './http.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.prototype.myLib = myLib;

Vue.use(ElementUI);
// axios.defaults.baseURL = 'http://localhost:5000/';
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
