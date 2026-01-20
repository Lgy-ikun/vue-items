<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h2>欢迎登录</h2>
      <el-form-item>
        <el-input type="text" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
      <el-form-item>
        <h4>测试账号: admin 测试密码: admin</h4>
        <h4>测试账号: xiaoxiao 测试密码: xiaoxiao</h4>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {reactive, getCurrentInstance} from "vue"
import {useAllDataStore} from "@/stores"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"

const loginForm = reactive({
    username: "",
    password: ""
})
const instance = getCurrentInstance()
const proxy = instance.proxy
const store = useAllDataStore()
const router = useRouter()


const handleLogin = async () => {
  try {
     const res = await proxy.$api.getMenu(loginForm)
     console.log("后端返回的 menuList:", res.menuList); // 查看是否有 /user
     //拿到菜单在哪里显示？跨组件 pinia
     store.updateMenuList(res.menuList)
     store.state.token = res.token
     store.addMenu(router)
     router.push('/home')
   } catch(err) {
      ElMessage.error("登录失败，请稍后重试！")
      console.error("登录错误详情：", err)
  }

}
</script>

<style lang="less" scoped>
.body-login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/background.png");
  background-image: linear-gradient(90deg, red , blue);
  background-size: 100%;
}
.login-container{
  background-color: rgb(255, 255, 255);
  width: 25%;
  height: 300px;
  border: 2px solid rgb(224, 222, 230);
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgb(164, 165, 164);
  padding-top: 20px;
  h2{
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
  }
  .el-form-item {
    width: 100%;
    display: flex;
    justify-content: center;
    :deep(.el-form-item__content) {
      width: 70%;
      flex: none !important;
      display: flex;
      justify-content: center;
  }
  }
}

</style>
