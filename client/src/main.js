import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/index.css';
import VueSocketIO from 'vue-socket.io'
 
Vue.use (new VueSocketIO({
  connection: 'http://192.168.2.23:3000'
}));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
