import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/views/home.vue'
import about from '@/views/about.vue'
import toyApp from '@/views/toy-app.vue'
import toyDetails from '@/views/toy-details.vue'
import toyEdit from '@/views/toy-edit.vue'
import dashboard from '@/views/dashboard.vue'
import login from '@/views/login.vue'
import userDetails from '@/views/user-details.vue'
import reviewsExplore from '@/views/reviews-explore.vue'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/toy',
      name: 'toy',
      component: toyApp,
    },
    {
      path: '/toy/:id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/user',
      name: 'user',
      component: userDetails,
    },
    {
      path: '/review',
      name: 'review',
      component: reviewsExplore,
    },
  ],
})

export default router
