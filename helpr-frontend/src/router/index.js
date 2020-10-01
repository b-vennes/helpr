import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing.vue'

import auth from '../middleware/auth';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => auth(to, from, next)
  },
  {
    path: '/ask',
    name: 'Ask',
    component: () => import('../views/Ask.vue'),
    beforeEnter: (to, from, next) => auth(to, from, next),
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import('../views/Card.vue'),
    beforeEnter: (to, from, next) => auth(to, from, next),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
