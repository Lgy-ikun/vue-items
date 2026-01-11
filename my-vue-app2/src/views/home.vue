
<template>
  <div class="home-container">
    <div class="carousel-container">
      <el-carousel :interval="5000" arrow="always" height="400px">
        <el-carousel-item v-for="(item, index) in photoPath" :key="index">
          <img :src="item.path" alt="养老院图片" class="carousel-img">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="card-container">
      <el-card>
        <template #header>
          <div class="card-header">
          <span>什么是智慧养老？</span>
          </div>
        </template>
        <p>智慧养老 是一种基于信息技术的养老服务模式，通过运用现代科技手段，提高老年人生活质量，满足老年人个性化需求，解决社会养老问题。</p>
        <p>智慧养老利用物联网 、移动互联网 、云计算 、大数据 等现代科学技术，围绕老年人的生活起居、安全保障、健康管理、娱乐休闲、学习分享等各方面的内容，支持和服务老年人的生活。它通过综合运用各种高科技手段实现养老服务综合信息以云技术、移动互联网、物联网技术、大数据技术等的结合，从而实现养老服务的个性化供给。智慧养老服务平台利用多元化健康检测数据对用户的身体状况进行监测，将相关数据发送到专业的医疗健康部门、家政服务公司，并让用户的家人实时了解其身体与生活状况。此外，智慧养老还能通过远程监控、传感器等技术手段，对老年人的日常生活进行远程监护，及时应对突发情况，如老人摔倒、忘记关煤气等，保障老年人的安全。</p>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
          <span>智慧养老趋势</span>
          </div>
        </template>
        <p>随着养老需求在我国逐渐发展扩大，我国民政部及各相关部门积极发布各类政策推动我国智慧养老产业的发展。根据2021年10月工业和信息化部、民政部及卫健委还联合发布的《智慧健康养老产业发展行动计划（2021-2025年）》，未来将再培育100个以上示范企业，50个以上示范园区，150个以上示范街道（乡镇）及50个以上示范基地，还提出要推动建设5个以上公共服务平台</p>
        <p>国际上通常看法是，当一个国家或地区60岁以上老年人口占人口总数的10%，或65岁以上老年人口占人口总数的7%，即意味着这个国家或地区的人口处于老龄化社会。截至2022年底，全国60周岁及以上老年人口28004万人，占总人口的19.8%，其中65周岁及以上老年人口20978万人，占总人口的14.9%，人口老龄化程度持续加深。随之而来的是一系列的养老问题，智慧养老产业应运而生。</p>
      </el-card> 
    </div>
  </div>
</template>

<script setup>
  const photoPath = [
    {path: "/public/images/11.png"},
    {path: "/public/images/12.png"},
    {path: "/public/images/13.png"},
    {path: "/public/images/14.png"},
  ]
</script>
<style scoped lang="less">
.home-container{
  width: 100%;
  min-height: 100vh;//很重要这个不然background颜色不能100%覆盖，
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  background-color: rgb(238, 236, 236);
}
.carousel-container{
  width: 80%;
}
.carousel-img{
  width: 100%;
  height: 100%;
  object-fit: cover
}
.el-card{
  flex:1;
  height: 500px
}
.card-header{
    font-size: 18px;      // 标题字号
    font-weight: 600;     // 标题加粗
    color: #2c3e50;       // 标题颜色（深灰蓝，更稳重）
    letter-spacing: 0.5px;// 字间距
  }
.card-container{
  width: 80%;
  display: flex;
  justify-content: space-between;
  gap: 25px;
  padding-top: 16px;
  height: calc(100% - 50px); // 减去标题高度，防止内容溢出
    // 内容超出时滚动
  p{
    font-size: 16px;         // 正文字号（默认12px，调大更易读）
    line-height: 2;        // 行高（1.5-2之间最佳，提升可读性）
    color: #34495e;          // 正文颜色（中灰，比纯黑更柔和）
    letter-spacing: 0.3px;   // 字间距
    margin: 0 0 12px 0;      // 段落间距
    text-align: justify;     // 文字两端对齐（排版更整齐
  }
}
</style>

