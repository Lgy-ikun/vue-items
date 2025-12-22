import Mock from 'mockjs'
import homeApi from '@/api/mockData/home.js'
import userApi from '@/api/mockData/user'
import permissionApi from './mockData/permission'
Mock.mock('/api/home/getTableData', 'get', homeApi.getTableData)
Mock.mock('/api/home/getCountData', 'get', homeApi.getCountData)
Mock.mock('/api/home/getChartData', 'get', homeApi.getChartData)
Mock.mock(/\/api\/home\/getUserData/, 'get', userApi.getUserList);
//原来没有加正则，导致精准匹配，所以拼接后的url无法被识别拦截
Mock.mock(/\/user\/deleteUser/, 'get', userApi.deleteUser);
Mock.mock(/\/user\/addUser/, 'post', userApi.createUser);
Mock.mock(/\/user\/editUser/, 'post', userApi.updateUser);
Mock.mock(/permission\/getMenu/, "post",permissionApi.getMenu)
