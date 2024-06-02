import { inject } from 'vue'

export const usePlugin = () => {
  const $roleCheck: Function | undefined = inject('$roleCheck')
  const $getMaxLength: Function | undefined = inject('$getMaxLength')
  const $widthCalc: Function | undefined = inject('$widthCalc')
  const $typeCheck: Function | undefined = inject('$typeCheck')

  if (!$roleCheck || !$getMaxLength || !$widthCalc || !$typeCheck) {
    throw new Error('Plugin không khả dụng!')
  }
  return { $roleCheck, $getMaxLength, $widthCalc, $typeCheck }
}
