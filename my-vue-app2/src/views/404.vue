<template>
  <div class="not-found-page">
    <h1>404 - 页面不存在</h1>
    <p>你访问的路由不存在，请检查 URL 是否正确</p>
    <!-- 返回上一页按钮 -->
    <el-button type="primary" @click="goBack" class="back-btn">
      返回上一页
    </el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

// 返回上一页函数
const goBack = () => {
  // 方式 1：使用 vue-router 的 back 方法（推荐，贴合路由生态）
  router.back();
  
  // 方式 2：使用浏览器原生 history 方法（效果一致，备选）
  // window.history.back();
};
</script>

<style lang="less" scoped>
.not-found-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  h1 {
    font-size: 64px;
    color: #409eff;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
  }

  .back-btn {
    font-size: 16px;
    padding: 10px 24px;
  }
}
</style>