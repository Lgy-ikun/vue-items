<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img src="@/assets/images/user.jpg" alt="用户图片"/>
          <div class="user-info">
            <p>Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p class="login-info-time">上次登录时间:<span>2025-07-03</span></p>
          <p class="login-info">上次登录地点:<span>肇庆</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData" size="large">
          <el-table-column
          v-for="(val, key) in tableLabel"
          :key="key"
          :prop="key"
          :label="val"/>
        </el-table>  
      </el-card>
    </el-col>
    <el-col :span="16"><!-- 这个:span一定要写不然不会flex布局 -->
      <div class="num">        <!-- style="display: flex;"这个识别不了 --> 
        <el-card
        class="el-card-count"
        shadow="hover"
        v-for="item in CountData"
        :key="item.name"
        >
          <component :is="item.icon" class="icons" :style="{backgroundColor: item.color}"></component>
          <div class="data-value">
            <p>￥{{ item.value }}</p>
            <h2>{{ item.name }}</h2>
          </div>
        </el-card>
      </div>
      <el-card class="top-echart" shadow="hover">
        <div ref="echart" style="height: 26vh; width: 100%;">
        </div>
      </el-card>

      <div class="graph">
        <el-card>
          <div ref="userechart" style="height: 33vh"></div>
        </el-card>
        <el-card>
          <div ref="videoechart" style= "height: 33vh;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>




<script setup name="Home">
import {ref, reactive} from 'vue'
import { getCurrentInstance, onMounted} from 'vue'
import * as echarts from 'echarts'
const {proxy} = getCurrentInstance()
//这个tableData是假数据，等会使用axios请求mock数据
const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})
const tableData = ref([
    {
      name: "Java",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    },
    {
      name: "Python",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    }
])
const CountData = ref({})
const ChartData = ref({})
const observer = ref()

const getTableData = async function() {
  try {
    const res = await proxy.$api.getTableData()
    tableData.value = res.tableData
    }catch(err) {
    console.log("有错误:", err)
  }
}
const getCountData = async function() {
  try {
    const res = await proxy.$api.getCountData()
    CountData.value = res
    }catch(err) {
    console.log("有错误:", err)
  }
}
const getChartData = async function() {
  try {
    const res = await proxy.$api.getChartData()
    const {orderData, userData, videoData} = res
    //第一个折线图渲染
    xOptions.xAxis.data = orderData.date
    xOptions.series = Object.keys(orderData.data[0]).map(el => {
      return{
       type: 'line',
       name: el,
       data: orderData.data.map(val => val[el]),
       symbol: 'circle',
       symbolSize: 6, // 节点大小
      }
    })
    const oneEchart = echarts.init(proxy.$refs["echart"])
    oneEchart.setOption(xOptions)
    //第二个柱状图渲染
    xOptions.xAxis.data = userData.map(val=> val.date)
    xOptions.series = [
      {
        name: '新增用户',
        data: userData.map(val => val.new),
        type:'bar'
      },
      {
        name: '活跃用户',
        data:userData.map(val => val.active),
        type:'bar'
      }
    ]
    const twoEchart = echarts.init(proxy.$refs["userechart"])
    twoEchart.setOption(xOptions)
    //第三个圆形图渲染
    pieOptions.series = [
      {
        data: videoData,
        type: 'pie'
      }
    ]
    const threeEchart = echarts.init(proxy.$refs["videoechart"])
    threeEchart.setOption(pieOptions)
    //监听页面变化
    //如果监听的容器大小改变了，会执行回调里面的函数

    observer.value = new ResizeObserver((en) => {
      oneEchart.resize()
      twoEchart.resize()
      threeEchart.resize()
    })
    if (proxy.$refs['echart']) {
      observer.value.observe(proxy.$refs['echart'])
    }
  } catch(err) {
    console.log("有错误:", err)
  }
}
onMounted(() => {
  getTableData()
  getCountData()
  getChartData()
})

//柱状图和折线图通用样式，修改
const xOptions = {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {},
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
}
//饼图通用样式
const pieOptions = {
  // 饼图必须的提示框（item触发）
  tooltip: {
    trigger: "item"
  },
  // 基础图例（显示数据分类）
  legend: {
  },
  series: [],
  // 6个易于区分的基础颜色池（涵盖蓝/绿/橙/紫/红/青，无相近色）
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"]
  }

</script>



<style lang="less" scoped>
.user {
  display: flex;
  justify-content: center;
  column-gap: 50px; 
  align-items: center;
  border-bottom: 1px solid #d7ddd8;
  padding-bottom: 16px;
  margin-bottom: 20px;
  img {
    width: 150px;
    height: 150px;
  }
}
.user-info {
  p:first-child {
    color: #646cff;
    font-size: 16px;
    margin-bottom: 15px;
  }

}
.login-info {
  p {
    line-height: 40px;
    color: #999;
    span {
      margin-left: 150px;
      color: #666;
    }
  }
}
.user-table {
  margin-top: 30px;
  height: 50vh
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 10px;
  margin-bottom: 20px;
  .el-card {
    width: 33%; 
    height: 7vh;
    .icons {
      height: 7vh;
      width: 20%;
      color: white;
    }
    .data-value {
      p {
        font-size: 25px;
        line-height: 1.3em;
      }
      h2 {
        color: #aca4a4;
        
      }
    }
  }
  :deep(.el-card .el-card__body) {
    padding: 0;
    display: flex;
    align-items: center;
    column-gap: 15px;
  }
}
.top-echart {
  width: 100%;
  
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 16px; /* 替代margin，flex布局更友好 */
  flex-wrap: wrap; /* 小屏幕自动换行 */
  width: 100%; /* 确保父容器有宽度 */
  box-sizing: border-box;
  .el-card {
    /* 核心：flex:1 让两个卡片平分父宽度，无需固定宽度 */
    flex: 1;
    min-width: 280px;
  }
}
</style>