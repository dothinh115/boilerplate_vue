import { type App } from 'vue'

export default {
  install: (app: App) => {
    app.provide('$widthCalc', (widthObj: { [key: string]: number }) => {
      const result: any = {}
      const perChar = 9
      for (const [key, value] of Object.entries(widthObj)) {
        let w = value * perChar
        if (w < 50) w = 50
        else if (w > 300) w = 300
        result[key] = w
      }
      return result
    })
  }
}
