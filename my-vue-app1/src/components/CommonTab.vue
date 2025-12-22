<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name" 
      :closable="tag.name!== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="handleMenu(tag)"
      @close="handleClose(tag, index)"
      >
    {{ tag.label }}
    </el-tag>
  </div>
</template>


<script setup>
  import { useRoute,useRouter } from "vue-router";
  import { useAllDataStore } from "@/stores"
  const store = useAllDataStore()
  const route = useRoute()//和useRouter不一样
  const router = useRouter()
  //当你的页面处于不同的路由路径时，useRoute() 返回的路由实例的 name 属性会自动变成对应路由的 name：
  const tags = store.state.tags

  //点击tag跳转页面
  const handleMenu = (tag) => {
    router.push(tag.name)
    store.selectMenu(tag)
  }
  const handleClose = (tag) => {
  // 1. 先删除 Tag（调用 Pinia 的 removeTag 方法）
  store.removeTag(tag)

  // 2. 如果删除的不是当前路由的 Tag，直接返回
  if (route.name !== tag.name) return

  // 3. 核心逻辑：删除后判断 tags 长度
  const currentTags = tags; // 删除后的 tags 数组
  // 3.1 若删除后只剩 2 个 Tag（首页 + 另一个），跳转到非首页的那个
  if (currentTags.length === 2) {
    // 找到非首页的 Tag 并跳转
    const targetTag = currentTags.find(item => item.name !== 'home');
    router.push({ name: targetTag.name });
  } 
  // 3.2 若删除后只剩首页（长度为1），跳首页
  else if (currentTags.length === 1) {
    router.push('/home');
  }
  // 3.3 其他情况（比如还有多个 Tag），跳转到最后一个非首页 Tag
  else {
    const targetTag = currentTags[currentTags.length - 1];
    router.push({ name: targetTag.name });
  }
}
</script>




<style lang="less">
.tags {
  margin: 20px 0 0 20px;
}
.el-tag {
 margin-right: 20px;
}
</style>

