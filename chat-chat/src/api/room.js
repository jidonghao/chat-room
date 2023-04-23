import request from '../utils/request'

let room = {
  // 创建或加入
  create: data => request.post('creatAddRoom', data),
  // 获取聊天室
  getRoomList: data => request.get('getRoomList', data)
}

export default room
