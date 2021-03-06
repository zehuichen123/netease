// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './store/store';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://47.106.156.233:3000';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
