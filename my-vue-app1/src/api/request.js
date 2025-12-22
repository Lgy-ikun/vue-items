import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create()
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("👉传入的数据配置后（还没有提交请求）此时的url还没有和params合并", config.url)
    console.log("👉 config.params: ", config.params);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (res) {
    
    //api接收过来的响应数据做点什么
    const {code, data, msg} = res.data;
    if (code === 200) {
      console.log(res.data)
      return data
    } else {
      const errMessage = "网络错误"
      ElMessage.error(msg || errMessage);
      return Promise.reject(msg || errMessage);
    } 
  });

function request(options) {
  options.method = options.method || "get";
  return service(options);
};
export default request