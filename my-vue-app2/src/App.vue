<template>
  <div class="app-header">
    <Header v-if="!$route.meta.noHeader"/> <!--这里用于控制登录页面路由为login的时候不显示Header组件-->
  </div>
  <div class="router-container"><router-view></router-view></div>
</template>

<script setup>
  import Header from '@/components/Header.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}
.app-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.router-container{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;/* 横向撑满父元素（body） */
  height: 100%;
}
</style>

