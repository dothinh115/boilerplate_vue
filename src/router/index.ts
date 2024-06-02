import { authMiddleware } from '@/middleware/auth'
import { isInsideMiddleware } from '@/middleware/isInside'
import HomePage from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/route',
      name: 'route',
      children: [
        {
          path: ':post/:id?',
          name: 'post',
          component: () => import('@/views/RoutePage.vue')
        },
        {
          path: ':post/new',
          name: 'new',
          component: () => import('@/views/RoutePage.vue'),
          beforeEnter: isInsideMiddleware
        }
      ]
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('@/views/MePage.vue'),
      children: [
        {
          path: ':field',
          name: 'me-field',
          component: () => import('@/views/MePage.vue')
        }
      ]
    }
  ]
})

router.beforeEach(authMiddleware)

export default router
