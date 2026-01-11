import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) //pinia注册
app.use(router) //路由注册
app.use(ElementPlus) //element-plus注册
app.mount('#app') //把vue应用挂载到Dom元素上
