<template>
  <div class="header-container">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="false" 
    text-color= "rgb(255,255,255)"
  >
    <el-menu-item class="logo-item" @click="toHome" index="">
      <div class="logo">智慧养老</div>
    </el-menu-item>
    <el-menu-item class="spacer-item" index=""></el-menu-item>
    <el-menu-item index="/home">首页简介</el-menu-item>
    <el-menu-item index="/resources">养老资源</el-menu-item>
    <el-menu-item index="/public-service">便民服务</el-menu-item>
    <el-menu-item index="/activity">活动风采</el-menu-item>
    <el-popconfirm placement="bottom-end"  title="你确定退出登录吗" @confirm="handleLogout">
      <template #reference>
      <el-button class="logout-button">退出登录</el-button>
      </template>
    </el-popconfirm>
    
    
  </el-menu>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const activeIndex = ref("/home")
const toHome = () => {
  router.push({ name: "Home" })
}
const handleSelect = (index) => {
  router.push(index)
}

//监听
watch( () => route.path, (newValue,oldValue) => {
  //数据变化要做的事
  activeIndex.value = newValue
},{ immediate: true })//路由刷新或者直接填写跳转只能算是初始值，没有新值，所以只能加一个immediate: true，路由刷新的时候执行一次
//退出登录
const handleLogout = () => {
  localStorage.removeItem("userToken")
  router.push("/login")
}
</script>



<style scoped type="less">
.header-container {
  width: 100%;
  height: 70px;
  padding: 0 16%;
  margin-top: 0px;
  background-color: rgb(18, 138, 30);
  padding-top: 7px;
}
.el-menu-demo {
  display: flex;
  justify-content:space-between;
  align-items: center;
  border: none;
  background-color: rgb(18, 138, 30);
  
}
.spacer-item {
  flex-grow: 1;
  pointer-events: none;
}
.el-menu-item {
  padding: 0 30px;
}
.logo {
  font-size: 28px;
  font-weight: bold;
  color: #ffbb01; /* 文字主色（金色，和你之前的 active-text-color 一致） */
  /* 文字描边：webkit 内核兼容 */
  -webkit-text-stroke: 1px #fff;
  /* 可选：添加发光效果 */
  text-shadow: 0 0 8px rgba(36, 50, 114, 0.8);
  cursor: pointer;
}
.logout-button{
  padding: 20px 30px;
  margin-left: 15px;
}

</style>