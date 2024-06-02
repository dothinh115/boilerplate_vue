import { defineStore } from 'pinia'
import { ref } from 'vue'

export const authStore = defineStore('authStore', () => {
  const user = ref<{
    _id: string
    rootUser: boolean
    email: boolean
    actived: boolean
    role: string
  }>()
  return { user }
})
