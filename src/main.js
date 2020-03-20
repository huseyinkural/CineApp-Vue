import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Home from './components/Home.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({

  routes: [
    {
      path: '/',
      component: Home
    }
  ]

});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
