import type { TLogin } from '@/utils/models/login.model'
import { storeToRefs } from 'pinia'
import { useCookies } from 'vue3-cookies'
import useApi from './useApi'
import { authStore } from '@/stores/auth'

export function useAuth() {
  const { cookies } = useCookies()
  const store = authStore()
  const { user } = storeToRefs(store)
  const accessTokenCookie = cookies.get('access_token')

  const getUser = async () => {
    if (!accessTokenCookie) return undefined
    try {
      const fetchUserResult: any = await useApi('/me', {
        headers: {
          authorization: 'Bearer ' + accessTokenCookie
        }
      })
      if (fetchUserResult) user.value = fetchUserResult.data
      return user.value
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (data: TLogin) => {
    const result: any = await useApi('/login', {
      method: 'POST',
      body: data
    })
    cookies.set('access_token', result?.accessToken)
    cookies.set('refresh_token', result?.refreshToken)
    window.location.reload()
    return result
  }

  const logout = async () => {
    cookies.remove('access_token')
    cookies.remove('refresh_token')
    window.location.reload()
  }

  return { login, getUser, logout, user }
}
