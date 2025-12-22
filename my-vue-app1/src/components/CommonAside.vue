<template>
  <el-aside width="200px"> <!-- 固定侧边栏宽度，样式更规整 -->
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false" 
      :default-active="route.path" 
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :width="width"
    >
      <h3 v-show="!isCollapse"style="text-align: center; padding: 10px 0;">通用后台管理系统</h3>
      <h3 v-show="isCollapse"style="text-align: center; padding: 10px 0;">后台</h3>

      <el-menu-item 
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
        @click="handleMenu(item)"
      >
        <!-- 动态渲染Element Plus图标：注意组件名和全局注册的一致（首字母大写） -->
        <el-icon class="icons">
          <component :is="item.iconComp" />
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <!-- 渲染有子孙的菜单（其他） -->
      <el-sub-menu 
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <el-icon>
            <component :is="item.iconComp" />
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <!-- 子菜单渲染 -->
        <el-menu-item
          v-for="child in item.children"
          :index="child.path"
          :key="child.path"
          @click="handleMenu(child)"
        >
          <el-icon>
            <component :is="child.iconComp" />
          </el-icon>
          <span>{{ child.label }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
// 1. 导入Vue3核心API和路由API（Vue3组合式API必须显式导入）
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAllDataStore } from '@/stores'
const store = useAllDataStore()
const route = useRoute()
// 2. 获取路由实例（main.js已全局注册的router实例const router = useRouter()，并不是创建新实例，而是从 Vue 应用的全局上下文中，获取到那个唯一的 router 实例。）
const router = useRouter()

// 3. 菜单数据：修正icon字段为Element Plus全局注册的组件名（首字母大写，驼峰命名）
// const list = ref([
//   {
//     path: '/home',
//     name: 'home',
//     label: '首页',
//     iconComp: 'House',       // 对应Element Plus的House图标（全局注册的组件名）
//     url: 'Home'
//   },
//   {
//     path: '/mall',
//     name: 'mall',
//     label: '商品管理',
//     iconComp: 'VideoPlay',   // 对应VideoPlay图标（原video-play转驼峰+首字母大写）
//     url: 'Mall'
//   },
//   {
//     path: '/user',
//     name: 'user',
//     label: '用户管理',
//     iconComp: 'User',        // 对应User图标
//     url: 'User'
//   },
//   {
//     path: 'other',
//     label: '其他',
//     iconComp: 'Location',    // 对应Location图标
//     children: [
//       {
//         path: '/page1',
//         name: 'page1',
//         label: '页面1',
//         iconComp: 'Setting', // 对应Setting图标
//         url: 'Page1'
//       },
//       {
//         path: '/page2',
//         name: 'page2',
//         label: '页面2',
//         iconComp: 'Setting',
//         url: 'Page2'
//       }
//     ]
//   }
// ])
const list = computed(() => store.state.menuList)
// 4. 计算属性：筛选有无子孙的菜单（Vue3 computed必须基于ref响应式数据）
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))

const isCollapse = computed(() => store.state.isCollapse) //不能直接const isCollapse = store.isCollapse这样的话只能取到一次值，而且不能动态改变数值，template里面的数值不会改变
const width = computed(() => store.state.isCollapse ? "64px" : "180px" )
// 5. 菜单点击事件：el-menu的@select会传递选中的index（即绑定的path）
const handleMenu = (item) => {
  // 过滤无效路由（如静态项index=2、父菜单other），只跳转以/开头的路径
  if (item.path.startsWith('/')) {
    router.push(item.path)
  }
  store.selectMenu(item)
}

</script>

<style scoped>
/* 自定义图标样式（可选） */
.icons {
  margin-right: 8px;
}
.el-aside {
  height: 100%;
  background-color: #545c64;
 
}
.el-menu{
  margin-top: 20px;
  font-size: 19px;
  border-right: 0;
}
.el-menu-item span, .el-sub-menu span {
  font-size: 16px;
}
</style>
