// 整个项目api统一管理

import request from "./request"

//请求首页左侧表格的数据


export default {
  getTableData() {
    return request({
      url: '/api/home/getTableData',
      method: "get"//这里不写也默认是get
    });
  },
  getCountData() {
    return request({
      url: '/api/home/getCountData',
      method: "get"//这里不写也默认是get      
    });
  },
  getChartData() {
    return request({
      url: '/api/home/getChartData',
      method: "get"//这里不写也默认是get      
    });
  },
  getUserData(data) {
    return request({
      url: '/api/home/getUserData',
      method: "get",//这里不写也默认是get     
      params: data,
    });    
  },
  deleteUser(data) {
    return request({
      url: '/user/deleteUser',
      method: "get",//这里不写也默认是get     
      params: data,
    });    
  },
  addUser(data) {
    return request({
      url: '/user/addUser',
      method: "post",//向服务端发数据
      data: data,
    });    
  },
  editUser(data) {
    return request({
      url: '/user/editUser',
      method: "post",//向服务端发数据
      data: data,
    });    
  },
  getMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      data: params
    })
}
};