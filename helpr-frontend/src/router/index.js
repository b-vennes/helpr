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
  },
  {
    path: '/question',
    name: 'Question',
    props: true,
    component: () => import('../views/Question.vue'),
    beforeEnter: (to, from, next) => auth(to, from, next)
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
