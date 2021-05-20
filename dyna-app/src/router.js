import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

Vue.use(VueRouter)

let router = new VueRouter({
	routes
})

export default router
