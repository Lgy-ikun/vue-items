import axios from "axios"
import { ElMessage } from "element-plus";
const loginAxios = axios.create()

//创建请求拦截器
loginAxios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error('请求拦截器错误：', error);
    return Promise.reject(error); // 抛出错误，供业务层捕获
  }
    
);

//创建响应拦截器
loginAxios.interceptors.response.use(
  (respond) => {
    const resData = respond.data || {}
    if(resData.code === 200){
        ElMessage.success(resData.msg || "操作成功")
        return resData
      }else{
        ElMessage.error(resData.msg || "操作失败")
        return Promise.reject(new Error(resData.msg || "业务请求失败"))
      }
    
  },
  (error) => {
    ElMessage.error("网络异常，请检查网络连接")
    console.error('响应拦截器网络错误：', error);
    return Promise.reject(error)
  }
)

export default loginAxios