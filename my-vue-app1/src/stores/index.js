import { ref, watch } from "vue"
import { defineStore } from 'pinia'
function initState() {
  return {
    isCollapse: true,
    tags: [
      { path: "/home", 
        name: "home", 
        label: "首页",
        icon: "home" 
      },
    ],
    currentMenu: null,
    menuList: [],
    token: "",
    routerList: [],
  };
}
export const useAllDataStore = defineStore('allData', () => {
  // ========== 1. 状态定义 ==========
  const state = ref(initState())
  //监听变化，决定是否持久化存储本地
  watch(
    state,
    (newObj) => {
    if (!newObj.token) return;
    localStorage.setItem("store", JSON.stringify(newObj))
    },
    {deep: true}
  );
  //从本地存储恢复数据
  function restoreState() {
    const localState = JSON.parse(localStorage.getItem("store"))
    Object.assign(state.value, localState)//属性分配以免，localState某些属性不见，增量更新，避免属性丢失
  }

  function selectMenu(val) {
    if (val.name === "home") {
      state.value.currentMenu = null
    } else {
      state.value.currentMenu= val // 新增：更新当前选中菜单
      const index = state.value.tags.findIndex(item => item.name === val.name)
      if (index === -1) state.value.tags.push(val)
    }
  }

  function removeTag(tag) {
    const index = state.value.tags.findIndex(item => item.name === tag.name)
    state.value.tags.splice(index, 1)
  }

  function updateMenuList(val) {
    state.value.menuList = val
  }

  // 动态添加路由核心方法
  function addMenu(router) {
    const menu = state.value.menuList
    const module = import.meta.glob("../views/**/*.vue")
    const routeArr = []

    // 步骤1：清理旧的动态路由（先收集再批量删除）
    const dynamicRouteNames = router.getRoutes()
      .filter(item => item.parent?.name === 'main' && item.name && item.name !== 'home')
      .map(item => item.name)
    dynamicRouteNames.forEach(name => router.removeRoute(name))

    // 步骤2：处理菜单，生成路由配置
    menu.forEach((item) => {
      if (item.children) {
        item.children.forEach((val) => {
          // 规范化路径：移除开头的斜杠，避免双斜杠
          const url = `../views/${val.url.replace(/^\//, '')}.vue`
          val.component = module[url]
        })
        routeArr.push(...item.children)
      } else {
        const url = `../views/${item.url.replace(/^\//, '')}.vue`
        item.component = module[url]
        routeArr.push(item)
      }
    })
    //把添加的动态路由放在一个数组里面，后期退出登录方便删除这个，这是因为 router.getRoutes() 会返回所有路由（包括静态路由如 /login、/，以及动态添加的路由），而我们只需要删除动态添加的路由
    state.value.routerList = routeArr

    // 步骤3：添加新的动态路由到main下
    routeArr.forEach((item) => {
      router.addRoute("main", item)
    })
  }

  function clean(router) {
    state.value.routerList.forEach(item => {
      console.log("退出登录后需要被删除的动态路由", item)
      if (item) {
        router.removeRoute(item.name)
      }
    })
    initState()//清空原始数据
    localStorage.removeItem("store")//删除本地缓存
  
  }
  // ========== 5. 暴露状态和方法 ==========
  return {
    state,
    selectMenu,
    removeTag,
    updateMenuList,
    addMenu,
    restoreState,
    clean,
  }
})