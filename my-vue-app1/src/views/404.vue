<template>  
  <div class="errorDiv">
    <img src="../assets/images/404.png" alt="404错误页面">
    <el-button @click="returnPage"> 点击我返回上一页</el-button>
  </div>
</template>

<script setup>
  import {useRouter} from "vue-router"
  const router = useRouter()

  const returnPage = () => {
    router.go(-2)
  }
</script>

<style scoped>
.errorDiv {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}
img {
    width: 100%;
    height: 100%;
}
.el-button {
  position: absolute;
  left: 43%;
  top: 61%
}
</style>