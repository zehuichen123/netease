import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/Views/Home";
import Album from "@/Views/Album";
import Login from "@/Views/Login";
import MySearch from "@/Views/MySearch";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/song/:url_id',
      name: 'Album',
      component: Album,
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/search/',
      name: 'MySearch',
      component: MySearch,
    }
  ]
})
