<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 自定义左侧组件 -->
      <common-aside />
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <CommonTab />
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup name="Main">
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '@/components/CommonTab.vue'
</script>

<style lang="less" scoped>
.common-layout, .lay-container {
  height: 100%;
}
.el-header {
  background: rgb(95, 105, 132);
  padding: 0;
}
</style>
