<template>
  <el-card
    v-for="item in publicList"
    :key="item.name"
    shadow="hover"
  >
    <img :src="item.image" alt="便民服务图片" class="card-img">
    <p class="name">{{ item.name }}</p>
    <div class="desc-prise">
      <p class="desc">{{ item.desc }}</p>
      <p class="price">￥{{ item.price }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  publicList: {
    type: Array,
    required: true,
    default: () => []
  },
})
</script>

<style scoped lang="less"> 
.el-card{
  border-radius: 13px;
  box-shadow: 0 10px 8px #8c8e8b60;
  cursor: pointer;
}
:deep(.el-card__body){
  display: flex;
  flex-direction: column;
  width: 320px;
  overflow: hidden;
}
.name{
  font-size: 20px;
  font-weight: 500;
  text-overflow: ellipsis;
}
.card-img{
  width: 100%;
  height:200px;
  object-fit: cover;
  border-radius: 13px;
}
.desc-prise{
  width: 100%;;
  display: flex;
  margin-top: -43px;
  margin-bottom: -25px;
  align-items: center;
}
.desc{
  margin-right: 10px;
  color: #666;
  font-size: 15px;
  white-space: nowrap ;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
}
.price{
  font-size: 24px;
  color: #ffd500;
}
</style>