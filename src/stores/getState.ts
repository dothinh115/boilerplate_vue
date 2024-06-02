import { defineStore } from 'pinia'
import { ref } from 'vue'

export type TToastData = {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

type TRoute = {
  _id: string
  path: string
  method: string
}[]

type TPermission = {
  _id: string
  route: {
    _id: string
    path: string
    method: string
  }
  roles: string[]
}[]

export const stateStore = defineStore('stateStore', () => {
  const toastData = ref<TToastData[]>([])
  const loading = ref(0)
  const screenWidth = ref(screen.width)
  const hideSidebar = ref(false)
  const routes = ref<TRoute>([])
  const permissions = ref<TPermission>([])
  const isFromInside = ref(false)

  function increaseLoading() {
    loading.value++
  }

  function decreaseLoading() {
    if (loading.value === 1) {
      setTimeout(() => loading.value--, 100)
    } else loading.value--
  }

  return {
    toastData,
    loading,
    screenWidth,
    hideSidebar,
    routes,
    permissions,
    increaseLoading,
    decreaseLoading,
    isFromInside
  }
})
