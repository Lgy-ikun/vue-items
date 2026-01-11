const userDB = JSON.parse(localStorage.getItem('mockUserDB')) || {};//每次刷新执行一次
//注册
const handleRegister = (req) => {
  try {
    const {username, password} =  JSON.parse(req.body)
    if (!username || !password) {
      return {
        code: 400,
        msg: "账号或者密码不能为空",
        data: null
      }
    }
    if (username.length < 3 || username.length > 20 || password.length < 6 || password.length > 18) {
      return { 
        code: 400,
        msg: "账号/密码格式错误", 
        data: null 
      }
    }


    if (userDB[username]) {
      return {
        code: 400,
        msg: "该账号已注册,请直接登录",
        data: null
      }
    }
    userDB[username] = password;
    localStorage.setItem("mockUserDB", JSON.stringify(userDB))
    console.log(username,password)
    console.log("注册成功，当前的数据库", userDB)
    return {
      code: 200,
      msg: "注册成功",
      data: null
    }
  } catch (err) {
    return {
      code: 500,
      msg: "注册参数格式错误",
      data: null
    }
  }
}

//登录
const handleLogin = (req) => {
  try {
    // 步骤1：从 req.url 中提取查询参数部分（? 后面的内容）
    // split('?') 分割 URL，索引 0 是路径，索引 1 是查询参数（无参数时为 undefined，用 || '' 兜底）
    const queryStr = req.url.split('?')[1] || '';
    
    // 步骤2：使用 URLSearchParams 解析查询字符串（推荐，简洁高效）
    const urlParams = new URLSearchParams(queryStr);
    
    // 步骤3：获取对应的 username 和 password 参数
    const username = urlParams.get('username');
    const password = urlParams.get('password');
    if (!username || !password) {
      return {
        code: 400,
        msg: "账号或者密码不能为空",
        data: null
      }
    }
    if (username.length < 3 || username.length > 20 || password.length < 6 || password.length > 18) {
      return { 
        code: 400,
        msg: "账号/密码格式错误", 
        data: null 
      }
    }
    if(!userDB[username]) {
      return { 
        code: 400,
        msg: "没有此账号,请注册", 
        data: null 
      }
    }
    if(password !== userDB[username]) {
      return { 
        code: 400,
        msg: "密码错误,请重新输入", 
        data: null 
      }
    }
    console.log("登录成功：", username);
    console.log("当前用户数据库：", userDB);
    const mockToken = `JWT_MOCK_${username}_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
    return {
      code: 200,
      msg: "登录成功",
      data: {
        username: username,
        token: mockToken
      } // 可返回用户信息，供前端使用
    }
  } catch(err) {
    return {
      code: 500,
      msg: "登录参数格式错误",
      data: null
    }
  }
}
export {handleRegister, handleLogin}