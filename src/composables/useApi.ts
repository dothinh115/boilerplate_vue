import { jwtDecode } from 'jwt-decode'
import { stateStore, type TToastData } from '../stores/getState'
import { useRoute, useRouter } from 'vue-router'
import settings from '@/configs/settings.json'
import { useCookies } from 'vue3-cookies'
import { storeToRefs } from 'pinia'
import { useAuth } from './useAuth'
import { ofetch } from 'ofetch'

export default async function useApi(
  request: string,
  options?: {
    body?: any
    method?: 'POST' | 'PATCH' | 'GET' | 'DELETE'
    baseURL?: string
    params?: any
    headers?: any
  }
) {
  const { cookies } = useCookies()
  const access_token = cookies.get('access_token')
  const refresh_token = cookies.get('refresh_token')
  const { loading, toastData } = storeToRefs(stateStore())
  const { logout } = useAuth()
  options = {
    ...options,
    baseURL: settings.apiUrl
  }

  const isTokenValid = () => {
    if (!access_token) return true
    try {
      const decoded: any = jwtDecode(access_token)
      if (!decoded || !decoded.exp) return false
      const currentTime = Math.floor(Date.now() / 1000)
      if (decoded.exp < currentTime) return false
      return true
    } catch (error) {
      return false
    }
  }

  const fetch = async () => {
    const isValid = isTokenValid()
    if (!isValid) await refreshToken()

    return await ofetch(request, {
      ...options,
      parseResponse: JSON.parse,
      ...(access_token && {
        headers: {
          authorization: 'Bearer ' + access_token
        }
      })
    }).catch(async (error: any) => {
      if (loading.value) loading.value = 0
      const router = useRouter()
      const route = useRoute()
      if (error.data?.statusCode === 401) {
        await logout()
      } else if (error.data?.statusCode === 403) {
        const newToast: TToastData = {
          message: 'Bạn không có quyền này!',
          type: 'error'
        }
        toastData.value.push(newToast)
        router.push({ path: '/', replace: true })
      } else if (error.data?.statusCode === 404) {
        // throw showError({
        //   statusCode: error.data?.statusCode
        // })
      } else if (error.data?.statusCode === 400) {
        const newToast: TToastData = {
          message: error.data.message,
          type: 'error'
        }
        toastData.value.push(newToast)
        if (route.query.sort) router.push({ query: { sort: undefined }, replace: true })
      } else {
        // clearError({
        //   redirect: '/'
        // })
      }
    })
  }

  const refreshToken = async () => {
    try {
      const refreshTokenResponse: any = await ofetch('/refreshtoken', {
        parseResponse: JSON.parse,
        baseURL: settings.apiUrl,
        method: 'POST',
        body: {
          refreshToken: refresh_token
        }
      })
      cookies.set('access_token', refreshTokenResponse.accessToken)
      cookies.set('refresh_token', refreshTokenResponse.refreshToken)
    } catch (error) {
      await logout()
    }
  }

  return await fetch()
}
