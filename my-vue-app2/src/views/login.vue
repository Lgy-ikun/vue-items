<template>
  <div class="login">
    <!--标题切换-->
    <div class="login-container">
      <h3>{{ isLogin ? "智慧养老网站登录" :  "智慧养老网站注册"}}</h3>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        class="login-form"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="formData.username"
            :placeholder="isLogin ? '请输入账号' : '请输入注册的账号'"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="formData.password"
            show-password
            :placeholder="isLogin ? '请输入密码' : '请设置密码'"
          >
          </el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" class="login-button">{{ isLogin ? "立即登录" : "立即注册" }}</el-button>
        </el-form-item>    
      </el-form>
      <h5 @click="handleRegister">{{ isLogin ? "注册账号" : "已有账号, 去登录"}}</h5>
    </div> 
  </div>
</template>

<script setup>
import { ref, reactive,computed } from 'vue';
import { ElMessage } from 'element-plus';
import '@/mock/mock.js'
import loginAxios from '@/axios/loginRequest'//导入封装好的axios
import {useRouter} from 'vue-router';
const router = useRouter()
const isLogin = ref(true);
const formData = reactive({
  username: "",
  password: "",
})
const formRules = computed(() => {
  if(isLogin.value){ 
    return{
      username:[{ required: true, message: "请输入账号", trigger: "blur" }],
      password:[{ required: true, message: "请输入密码", trigger: "blur" }],
    };
  }else{
    return{
      username: [
        { required: true, message: "请输入注册的账号", trigger: "blur" },
        { min: 3, max: 20, message: '账号长度需3-20位', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_]+$/, message: '账号仅支持字母、数字、下划线', trigger: 'blur' }
      ],
      password: [
        { required: true, message: "请输入注册的密码", trigger: "blur" },
        { min: 6, max: 18, message: '密码长度需6-18位', trigger: 'blur' },
        { pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/, message: '密码需包含字母和数字', trigger: 'blur' }
      ],
    };
  }
})
//表单引用(用于校验)
const formRef = ref(null)//ref(null) 是 “空盒子”，Vue 帮你在组件挂载后，把 “表单实例” 装进了这个盒子里。
const handleSubmit = async() => {
  if(!formRef.value) return;
  try {
    await formRef.value.validate();
    let res;//此时的res实际为res.data封装过
    if(!isLogin.value){
      ElMessage.success("表单验证通过")
      res = await loginAxios.post('/api/register',{
        username: formData.username,
        password: formData.password
      });
      formData.username = ""
      formData.password = ""
      // console.log(res)
    }else if(isLogin.value){
      res = await loginAxios.get('/api/login',{
        params: {
          username: formData.username,
          password: formData.password
        }
      });
      console.log(res)//打印看看收到的响应数据
      const token = res.data.token
      if(token){
        localStorage.setItem("userToken", token)
      }
      router.push({name: "Home"})
    }
  } catch(err){
    console.error("错误详情（用于调试）：", err);
  }
}
const handleRegister = () => {
  isLogin.value = !isLogin.value
  formData.username = ""
  formData.password = ""
}
</script>

<style lang="less" scoped>
.el-form{
  width: 400px;
  margin-left: -70px;
}
.login{
  width: 100%;
  height: 100%;
  background-color: rgb(245, 235, 224);
  padding: 100px;
  
}
.login-container{
  background-color: rgb(249, 245, 240);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 480px;
  height: 290px;
  margin: auto;
  margin-top: 30vh;

  h5{
    color: rgb(32, 116, 62);
    cursor: pointer;
  }
}
.login-button{
  width: 100%;
}
</style>