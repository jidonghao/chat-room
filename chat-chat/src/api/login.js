import request from '../utils/request'

let userApi = {
  // 登录的
  login: data => request.post('login', data),
  // 注册的
  register: data => request.post('register', data)
}

export default userApi
