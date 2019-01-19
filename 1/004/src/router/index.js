import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import logEnterGuard from './log-enter.guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user/:userId',
      name: 'user',
      // 2 10. ...and use it in more generic way
      beforeEnter: logEnterGuard,
      component: () => import(/* webpackChunkName: "user-management" */ '@/views/User.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
  ],
});