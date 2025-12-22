import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/less/index.less'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import '@/api/mock'//当后端返回真实数据的时候，把这个拦截器删了
import api from '@/api/api'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useAllDataStore } from './stores'
function serachRouterNum(to) {
  const result = router.getRoutes().filter((item) => item.name === to.name).length > 0;
  return result
}
router.beforeEach((to, from) => {
  if(to.path !== "/login" && !store.state.token){
    return {name: "login"};
  }if(!serachRouterNum(to)){
    return {name: "404"}
  }
})
const app = createApp(App)//app就是Application.
const pinia = createPinia()
//安装pinia
app.use(pinia)
const store = useAllDataStore()
store.restoreState()
//安装ElementPlus和全局组件
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//挂载全局api
app.config.globalProperties.$api = api// 把导入的这个对象，挂载成全局的$api

//安装路由器实例
store.addMenu(router)
app.use(router)

app.mount('#app')

