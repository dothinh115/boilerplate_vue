import './assets/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from '@/App.vue'
import getMaxLength from './plugins/getMaxLength'
import roleCheck from './plugins/roleCheck'
import typeCheck from './plugins/typeCheck'
import widthCalc from './plugins/widthCalc'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.use(typeCheck)
app.use(getMaxLength)
app.use(roleCheck)
app.use(widthCalc)
