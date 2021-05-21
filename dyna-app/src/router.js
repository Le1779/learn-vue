import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './pages/auth.vue'
import Home from './pages/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
]

Vue.use(VueRouter)

let router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token != null) {
    next();
  } else {
    if (to.path !== '/auth')
      next('/auth');
    else
      next();
  }
});

export default router
