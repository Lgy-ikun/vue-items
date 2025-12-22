import Mock from 'mockjs'
console.log('👉 Mock 文件被加载了！'); // 关键验证点
// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) return {};
  const params = new URLSearchParams(search);
  const obj = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  return obj;
}

let List = [] 
const count = 200
//模拟200条用户数据
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  )
}
console.log("mock生成的数据", List)


export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    //Mock.js 处理函数中的 config 和 Axios 拦截器中的 config 是不同来源、不同用途的两个对象，只是恰好同名而已。
  console.log('👉 Mock 被触发了！');
  console.log("Mock生成的config", config) // 确保能执行到
  const params = param2Obj(config.url);
  const name = params.name || ''; // 单独解构，更安全
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  
  const mockList = List.filter(user => {
    if (name && !user.name.includes(name)) return false;
    return true;
  });
  
  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
  
  return {
    code: 200,
    data: {
      list: pageList,
      count: mockList.length,//手动计算输出了多少个数据
    }
  };
},
/**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    console.log('👉 Mock删除元素 被触发了！');
    const { id } = param2Obj(config.url)

    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */

  /* JSON.parse() 的作用是将 JSON 字符串转换为 JavaScript 对象，这是我们能操作数据的前提*/
  createUser: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }

}