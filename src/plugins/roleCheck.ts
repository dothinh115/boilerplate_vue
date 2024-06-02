import { useAuth } from '@/composables/useAuth'
import { stateStore } from '@/stores/getState'
import { storeToRefs } from 'pinia'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.provide('$roleCheck', (method: string, route: string) => {
      const { permissions } = storeToRefs(stateStore())
      const { user } = useAuth()

      if (user.value?.rootUser) return true
      let result = false
      if (
        permissions.value.filter(
          (x: any) => x.route.method === method && x.route.path.includes(route)
        ).length > 0
      )
        result = true

      return result
    })
  }
}
