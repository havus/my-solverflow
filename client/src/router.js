import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/popular',
      name: 'popular',
      component: () => import(/* webpackChunkName: "popular" */ './views/Popular.vue'),
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: () => import(/* webpackChunkName: "tag" */ './views/Tag.vue'),
    },
    {
      path: '/question/:id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue'),
    },
    {
      path: '/ask-question',
      name: 'ask-question',
      component: () => import(/* webpackChunkName: "ask-question" */ './views/AskQuestion.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
    },
  ],
});
