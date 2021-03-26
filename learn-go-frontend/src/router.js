import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/home.vue'
import Auth from './pages/auth.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
