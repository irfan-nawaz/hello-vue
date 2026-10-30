import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

import App from './App.vue'
import { installRuntimeCompiler } from './kit/runtimeCompiler'
import router from './router'
import { undoPlugin } from './stores/plugins/undo'

installRuntimeCompiler()

const app = createApp(App)

const pinia = createPinia()
pinia.use(undoPlugin)

app.use(pinia)
app.use(PiniaColada, { queryOptions: { staleTime: 5_000 } })
app.use(router)

app.mount('#app')
