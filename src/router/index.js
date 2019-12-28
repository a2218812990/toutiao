import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'
import login from '../views/login/login.vue'
import home2 from '../views/home/home2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '', component: home2 },
      { path: 'comment', component: () => import('../views/comment/comment.vue') },
      { path: 'material', component: () => import('../views/material') },
      { path: 'articles', component: () => import('../views/articlelist') },
      { path: 'publish', component: () => import('../views/publish') },
      { path: 'publish/:id', component: () => import('../views/publish') },
      { path: 'userCenter', component: () => import('../views/user-center') }
    ]
  },
  {
    path: '/login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
