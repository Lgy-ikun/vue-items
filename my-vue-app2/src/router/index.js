import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: { name: "Login"}
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
    meta: {
      noHeader: true,
    }
    //没登录不显示header标签
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/resources",
    name: "Resources",
    component: () => import("@/views/resources.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/public-service",
    name: "PublicService",
    component: () => import("@/views/public-service.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/activity",
    name: "Activity",
    component: () => import("@/views/activity.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import('@/views/404.vue'),
    meta: {
      noHeader: true,
      requireLogin: true,
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem("userToken")
  const requiredResult = to.meta.requireLogin
  if(requiredResult){
    if(userToken){
      next()
    }else{
      next({name: "Login"})
    }
  }else{
    next()
  }
})
export default router
