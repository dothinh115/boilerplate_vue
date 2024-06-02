import { stateStore } from '@/stores/getState'
import { storeToRefs } from 'pinia'
import { type RouteLocationNormalized } from 'vue-router'

export const isInsideMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const { isFromInside } = storeToRefs(stateStore())
  if (to.name !== from.name && from.name !== undefined) isFromInside.value = true
}
