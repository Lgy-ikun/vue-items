<template>
    <!--列表容器-->
  <div class="resources-list">
    <ResourcesActivityItem 
      :resourcesList="resourcesList"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ResourcesActivityItem from './components/ResourcesActivityItem.vue';
const resourcesList =ref([
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/common/2023-06/oorg/2023-06/049GV3KDPLnnmSD1.png',
    title: '珠海市养老中心',
    desc: '珠海市养老中心位于珠海市香洲区南屏镇濂泉路和南泉路交汇处，交通便利，紧邻竹仙洞公园，闹中取静，空气清新，环境优美；占地面积1.1万平方米，总建筑面积6万平方米，总床位1100张，其中养老床位900张，医疗床位200张，集养老、医疗、护理、康复、安宁疗护于一体。中心依托省级高水平医院——珠海市人民医院特色优质的医疗、护理、康复资源和经过系统培训的护工团队，为入住老人提供全天候的医疗保障，开展专业养老、疾病诊疗等服务项目；通过入住前健康体检、每日常规巡诊、专家定期查房等，配合个性化的康复训练指导、营养膳食服务和健身娱乐活动，全程关注老人的身体健康。',
    contact: '2157991', // 重命名 date 为 contact，语义更准确（原数据是联系方式而非日期）
    address: '珠海市香洲区南屏镇濂泉路22号'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-gero/zhuhaidashjfgdhJNJ3dejasda/gero/2022-09/gero/basic/Gu663AAmauk4zxdl.png',
    title: '爱晖护老院',
    desc: '爱晖护老院成立于2002年12月，占地面积二千多平方米，位于香洲区拱北街道港昌路132号，拥有130张床位。根据老年人的需要，设有单人房、双人房、三人房、四人房。全新的酒店式设计装修，房间宽敞明亮，阳光充足，空气流畅，环境干净，为各位长者提供最佳的养老胜地。院内设有医务室，并在卫健局注册备案，配备心电监护仪、心电图机、电子制氧机、负压吸痰机、超声波雾化器等多种医疗及健身康乐设施，聘请临床经验丰富的老年病专家及多年临床护理经验的护理师五名，以及30多名经过严格培训上岗的专业护理人员及多名管理人员，从生活照料、康复护理、精神慰藉、文体娱乐、医疗保健等为入住长者提供全方位的优质服务。',
    contact: '0756-8289362',
    address: '拱北昌平路57号19栋二楼1-7单元、一楼梯间4-5单元'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-gero/zhuhaidashjfgdhJNJ3dejasda/gero/2023-06/gero/basic/oHoqUkEYr2pjiquv.png',
    title: '九明（珠海）养老服务有限公司',
    desc: '珠海九明医养中心（九明（珠海）养老服务有限公司）位于珠海市斗门区港霞东路268号，即原斗门区人民医院，占地面积19230㎡，其中医院区约10000㎡，养老区约9000㎡，主要针对失能、半失能老人创建了集“医疗、康复、养老”三位于一体的医养中心，解决“看病的地方不养老、养老的地方看病难”的问题，让长者真正实现老有所医，老有所养，老有所乐！全院采用人性化无障碍通道，设有老年大学，可为老人提供丰富的娱乐活动，给老人创造可以健康、安心的生活环境，提高老人自身的生活品质，让老人住得安心，家属更放心。',
    contact: '5556267',
    address: '斗门区井岸镇港霞东路268号B区'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-hcss/zhuhaidashjfgdhJNJ3dejasda/common/2023-02/oorg/2023-02/uG2M1BVCKJ0i0jEp.png',
    title: '井岸镇社会福利中心',
    desc: '井岸镇敬老院位于井岸镇尖峰前路，依山傍水，山清水秀，空气清新，环境优美，是由斗门区井岸镇人民政府筹集超千万资金兴建起，自1995年投入使用为长者提供院舍养老服务，是全国模范敬老院、广东省二级敬老院、广东省居家养老服务示范单位、星光老年之家。井岸镇敬老院占地面积13330平方米，建筑面积约5000平方米，120张床位。院内管理规范、贴心服务，并且设有厨房、餐厅、洗衣房、活动室、音乐室、阅览室、棋牌室、医务室、娱乐室、幸福农场等集医疗、健身、娱乐、生活为一体的硬件设施设备。敬老院精选了一支专业综合团队，包括心理咨询师、社会工作师、高级营养师、医生、护士、厨师及优秀护理员等，以全心全意为长者服务为宗旨。井岸镇敬老院致力于成为一所融养老、健身、文娱康乐活动于一体的长者乐园，是长者养老的好地方。',
    contact: '0756-515167',
    address: '井岸镇尖峰前路379号'
  },
  {
    image: 'https://jbinfo-ipp.oss-cn-hangzhou.aliyuncs.com/ipp-mod-gero/zhuhaidashjfgdhJNJ3dejasda/gero/2023-02/gero/basic/98tzWtk4j26Wk92t.png',
    title: '珠海福慧长者家园养老服务有限公司',
    desc: '福慧长者家园，位于香洲区港昌路401号，床位数180张，入住老人103人，由珠海福慧家园长者酒店管理有限公司运营。是一家医养护结合、品质养老的酒店式养老机构，为长者提供24小时生活护理、心理护理、健康管理和人文关怀服务。福慧家园秉承“为长者带来尊严体面的乐龄生活”的宗旨，以及“以长者为尊，以服务为本”的服务理念，全力为每一位长者打造“家”的温暖。',
    contact: '0756-7182671',
    address: '珠海市香洲区港昌路401号福慧长者家园'
  }
])
</script>

<style lang="less" scoped>
.resources-list{
  margin: auto;
  margin-top: 80px;
  width: 80%;
}
</style>