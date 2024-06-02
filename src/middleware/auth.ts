import { useAuth } from '@/composables/useAuth'
import { useRouter, type RouteLocationNormalized } from 'vue-router'
import { useCookies } from 'vue3-cookies'

export const authMiddleware = async (to: RouteLocationNormalized) => {
  const { cookies } = useCookies()
  const access_token = cookies.get('access_token')
  const { user, getUser } = useAuth()
  const router = useRouter()

  if (access_token && !user.value) {
    await getUser()
  }

  if (to.name === 'login' && user.value) {
    return router.push({
      path: '/',
      replace: true
    })
  }

  if (to.name !== 'login' && !user.value)
    return router.push({
      path: '/login',
      replace: true
    })
}
