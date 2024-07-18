import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import router from './setup/setupRoutes'

const app = createApp(App)
app.use(router)
app.use(PerfectScrollbarPlugin)
app.mount('#app')
