import { type App } from 'vue'

export default {
  install: (app: App) => {
    app.provide('$typeCheck', (value: any) => {
      if (value === null || value === undefined) return null
      if (Array.isArray(value)) return 'Array'
      return typeof value
    })
  }
}
