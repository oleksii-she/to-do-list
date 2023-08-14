import './assets/styles/main.scss'

import globalComponents from './components/global'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(globalComponents)
app.use(router)

app.mount('#app')
