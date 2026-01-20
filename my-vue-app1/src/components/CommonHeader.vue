<template>
  <div class="header">
    <div class="l-content">
      <el-button @click="handleCollapse">
        <component :is="'Menu'" class="icons"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="{ path: current.path}">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <img src="@/assets/images/user.jpg" alt="图片">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useAllDataStore } from '@/stores'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const store = useAllDataStore()
store.state.isCollapse = false
const router = useRouter()
const handleCollapse = () => store.state.isCollapse = !store.state.isCollapse
const handleLoginOut = () =>{
  store.clean(router)
  router.push({name: "login"})
}
const current = computed(() => store.state.currentMenu)
</script>

<style scoped>
.header {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgb(93, 83, 87);
  margin: 0;
  padding: 0 10px;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 30%;
}
:deep(.bread span){
  color: #fff !important;
  cursor: pointer !important;
}
.l-content {
  display: flex;
  align-items: center;
  column-gap: 10px;
  
}
.r-content {
  margin-right: 20px
}
.icons {
    width: 20px;
    height: 20px;
    
}
</style>
