<template>
  <el-card
    v-for="item in resourcesList"
    :key="item.title"
    shadow="hover"
  >
    <img :src="item.image" alt="养老中心图片" class="card-img">
    <div class="right-contain">
      <h2 class="title">{{ item.title }}</h2>
      <p class="desc">{{ item.desc }}</p>
      <p>
        <span class="contact">{{ item.contact ? "电话: " + item.contact : item.date ?  "日期：" + item.date : "暂无消息"}}</span>
        <span class="address">地址：{{ item.address }}</span>
      </p>
    </div>
  </el-card>
</template>

<script setup>
import {defineProps} from 'vue'
const props = defineProps({
  resourcesList: {
    type: Array,
    required: true,
    default: () => []
  }
}) //子组件里用 props.resourceList 就能拿到数据（模板里可直接写 resourceList）
</script>

   <!-- image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/common/2023-06/oorg/2023-06/049GV3KDPLnnmSD1.png',
    title: '珠海市养老中心',
    desc: '珠海市养老中心位于珠海市香洲区南屏镇濂泉路和南泉路交汇处，交通便利，紧邻竹仙洞公园，闹中取静，空气清新，环境优美；占地面积1.1万平方米，总建筑面积6万平方米，总床位1100张，其中养老床位900张，医疗床位200张，集养老、医疗、护理、康复、安宁疗护于一体。中心依托省级高水平医院——珠海市人民医院特色优质的医疗、护理、康复资源和经过系统培训的护工团队，为入住老人提供全天候的医疗保障，开展专业养老、疾病诊疗等服务项目；通过入住前健康体检、每日常规巡诊、专家定期查房等，配合个性化的康复训练指导、营养膳食服务和健身娱乐活动，全程关注老人的身体健康。',
    contact: '2157991', // 重命名 date 为 contact，语义更准确（原数据是联系方式而非日期）
    address: '珠海市香洲区南屏镇濂泉路22号' -->
<style scoped>
.el-card{
  margin-bottom: 20px;
  border-radius: 20px;
  
}
:deep(.el-card__body){
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
}
.card-img{
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 16px 0;
  line-height: 1.4;
}
.info-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
}
.right-contain{
  width:1000px;
}
.contact {
  color: #38b2ac; /* 清新的蓝绿色，区分联系方式 */
  font-weight: 500;
  margin-right: 40px;
}
.desc {
  font-size: 14px;
  color: #666; /* 新增：文字颜色更柔和 */
  line-height: 1.6; /* 行高，影响多行高度 */
  /* 多行省略核心属性 */
  display: -webkit-box; /* 弹性盒模型，用于多行省略 */
  -webkit-line-clamp: 3; /* 显示 3 行，可按需调整（2/4都行） */
  -webkit-box-orient: vertical; /* 垂直排列 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.address {
  color: #9f7aea; /* 淡紫色，区分地址 */
  line-height: 1.6;
}
</style>