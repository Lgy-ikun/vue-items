import { createRouter, createWebHashHistory} from "vue-router"
import Main from "@/views/Main.vue"
//指定路由规则

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: []
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue")
  }
]
const router = createRouter({
    //设置路由模式
    history: createWebHashHistory(),
    routes,

})


//暴露路由器

export default router