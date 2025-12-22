<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
    v-for="p in tableLabel" 
    :key="p.prop"
    :prop="p.prop"
    :label="p.label"
    :width="p.width || 120"
    />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template v-slot="scope">
        <el-button  type="primary" size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button  type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination 
    class="pager"
    background 
    layout="prev, pager, next" 
    :total="config.total"
    @current-change = "handleChange"
  />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
       <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
    <el-form :inline="true" :model="formUser"  :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select  v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>




<script setup name="user">

import { ElMessage,ElMessageBox } from 'element-plus'
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue'
// 修改属性
const tableData = ref([])
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200
  },
  {
    prop: "addr",
    label: "地址",
    width: 200
  },
])
const {proxy} = getCurrentInstance()
const getUserData = async() => {
  console.log("前端传给API的参数", config)
  let data = await proxy.$api.getUserData(config)
  console.log("处理完的数据", data)
  tableData.value = data.list.map(item=>({
      ...item,
      sexLabel : item.sex == 1 ? "男" : "女"
   }))
   console.log("请求axios,mock拦截后的数据", data)
   config.total = data.count
}
const formInline = reactive({
  keyWord: ""
})
const config = reactive({
  name: "",
  page: 1,
  total: 0,
  limit: 10,
})

//方法
const handleSearch = () => {
  config.name = formInline.keyWord
  console.log("赋值后的config: ", config); // 关键：看name是否为输入的内容
  getUserData()
}
const handleChange = (page) => {
  config.page = page
  getUserData()
} 
//返回值：返回一个 Promise 对象 —— 用户点击「确定」时，Promise 会成功 resolve，进入.then回调；用户点击「取消」时，Promise 会失败 reject，不会进入.then。
const handleDelete = (val) => {
  console.log("待删除的ID:", val.id); // 检查是否有值（应为 Mock 生成的 guid）
  ElMessageBox.confirm("你确认要删除吗").then(async () => {
    await proxy.$api.deleteUser({id: val.id})
    ElMessage({
      showClose:true, //提示框右上角显示关闭按钮（用户可手动关掉
      message: "删除成功", //提示文字内容
      type:"success", //提示类型为 “成功”，会显示绿色的对勾图标。
    })
    getUserData()
})
}
const action = ref("add")
const dialogVisible = ref(false)
const formUser = reactive({
  sex: "1"
})
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr:[{ required: true, message: '地址是必填项' }]
})
const handleClose = () => {
  //获取重置表单
  dialogVisible.value = false;  
}
const handleCancel = (time) => {
  dialogVisible.value = false
}
const handleAdd = () => {
  
  action.value = "add"
  for(const item in formUser) {
    delete formUser[item]
  }
  formUser.sex = "1"
  dialogVisible.value = true;
    nextTick(() => {
    if(proxy.$refs["userForm"]){
      proxy.$refs["userForm"].resetFields()
    }
  })
};

const timeDate = (time) => {
  var newTime = new Date(time)
  var year = newTime.getFullYear()
  var month = newTime.getMonth() + 1
  var date = newTime.getDate()
  function add(m) {
    return m < 10 ? "0" + m : m
  }
  return year + "-" +  add(month) + "-" + add(date)
}
const onSubmit = () => {
  
  //先校验
  proxy.$refs["userForm"].validate(async(valid) => {
    if(valid){
      let res = null
      formUser.birth = timeDate(formUser.birth)
      if(action.value == "add"){
        console.log("formUser的值", formUser)
        res = await proxy.$api.addUser(formUser)
      }else{
        res = await proxy.$api.editUser(formUser)
      }
      if(res){
        dialogVisible.value = false
        proxy.$refs["userForm"].resetFields()
        getUserData()
      }
    }else{
      ElMessage({
        showClose: true,
        message: "请输入正确的数据",
      })
    }
  })
}
const handleEdit = (val) => {
  dialogVisible.value = true
  action.value = "edit"
  
  nextTick(() => {
    Object.assign(formUser,{...val,sex:""+val.sex})
  })
}
onMounted(() => {
  getUserData()
})
</script>




<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 90%;
  .pager {
    position: absolute;
    right: 20px;
    bottom: 4%;
  }
  .el-table {
    height: 97%;
  }
}
.select-clearn {
  display: flex;
}
</style>
