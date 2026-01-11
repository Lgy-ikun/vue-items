<template>
便民服务
  <div class="service-container">
    <PublicItem
      :publicList="serviceItemList"
    />
  </div>
</template>


<script setup>
import PublicItem from './components/PublicItem.vue';

const serviceItemList = [
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/csm/2022-12/wcmsAdapterStaticSetting/2022-12/MwG5Np0y7LplLdqY.png',
    name: '电话探访',
    price: '0.00',
    desc: '珠海金恒健康养老服务有限公司'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/common/2024-04/srom/2024-04/xqr86cnJpRGhyzT2.png',
    name: '桶装水配送',
    price: '0.00',
    desc: '凤凰山饮用水公司'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/common/2023-02/srom/2023-02/XjsZeyJBdXSPshc6.png',
    name: '家庭保洁',
    price: '50~80',
    desc: '珠海安佳家政有限公司'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/common/2023-03/srom/2023-03/VauOQlektLNC2awZ.png',
    name: '家具假装改造',
    price: '100~1000',
    desc: '合沐装饰工程（珠海） 有限责任公司'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/common/2023-02/srom/2023-02/cXVpsybnfC9jfzpY.png',
    name: '家电清洗',
    price: '100~200',
    desc: '珠海安佳家政有限公司'
  },
  {
    image: 'https://yl.shizuishan.gov.cn/menhu/assets/img/serviceImg-zhuyi.png',
    name: '体温测量',
    price: '0.00',
    desc: '朝阳街道万盛社区居家和社区养老服务站'
  },
  {
    image: 'https://yl.shizuishan.gov.cn/menhu/assets/img/serviceImg-zhuliao.png',
    name: '陪伴聊天',
    price: '0.00',
    desc: '朝阳街道万盛社区居家和社区养老服务站'
  },
  {
    image: 'https://yl.shizuishan.gov.cn/menhu/assets/img/serviceImg-zhugou.png',
    name: '代缴费用',
    price: '0.00',
    desc: '朝阳街道万盛社区居家和社区养老服务站'
  },
  {
    image: 'https://yl.shizuishan.gov.cn/menhu/assets/img/serviceImg-zhuji.png',
    name: '电路维修',
    price: '0.00',
    desc: '朝阳街道万盛社区居家和社区养老服务站'
  },
  {
    image: 'https://yl.shizuishan.gov.cn/menhu/assets/img/serviceImg-zhujie.png',
    name: '到店理发',
    price: '0.00',
    desc: '朝阳街道万盛社区居家和社区养老服务站'
  }
]

</script>
<style scoped>
.service-container{
  display: flex;
  flex-wrap: wrap;
  row-gap: 14px;
  column-gap: 14px;
  width: 80%;
  margin: 80px auto 0 auto;
  padding-bottom: 40px;
}
</style>
