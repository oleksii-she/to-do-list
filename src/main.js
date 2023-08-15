import './assets/styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toaster from '@meforma/vue-toaster'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(Toaster)
app.use(PulseLoader)
app.mount('#app')
