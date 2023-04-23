import mqtt from "mqtt";

let userInfo = JSON.parse(localStorage.getItem("userInfo"))
// console.log(userInfo)
let useMqtt = {
  connection: {
    host: '', // mqtt服务器地址
    port: 8083,
    endpoint: '/mqtt',
    clean: true, // 保留会话
    connectTimeout: 4000, // 超时时间
    reconnectPeriod: 4000, // 重连时间间隔
    // 认证信息
    clientId: 'roomChat_' + userInfo && userInfo.id || Math.ceil(Math.random() * 1000),
    username: '', // 用户名
    password: '', // 密码
  },
  subscription: { // 订阅
    topic: 'room/chat/#',
    qos: 2,
  },
  publish: {  // 发布
    topic: 'room/chat',
    qos: 2
  },
  receiveNews: '',
  qosList: [
    {label: 0, value: 0},
    {label: 1, value: 1},
    {label: 2, value: 2},
  ],
  client: {
    connected: false,
  },
  message: '',
  subscribeSuccess: false,
  /***
   * 创建链接
   */
  createConnection(callback) {
    // 连接字符串, 通过协议指定使用的连接方式
    // ws 未加密 WebSocket 连接
    // wss 加密 WebSocket 连接
    // mqtt 未加密 TCP 连接
    // mqtts 加密 TCP 连接
    // wxs 微信小程序连接
    // alis 支付宝小程序连接
    const {host, port, endpoint, ...options} = this.connection
    const connectUrl = `wss://${host}${endpoint}`
    try {
      this.client = mqtt.connect(connectUrl, options)
    } catch (error) {
      console.log('mqtt.connect error', error)
    }

    this.client.on('connect', () => {
      console.log('Connection succeeded!')
      this.doSubscribe()
    })
    this.client.on('error', error => {
      console.log('Connection failed', error)
    })
    this.client.on('message', callback)
  },
//订阅主题
  doSubscribe() {
    const {topic, qos} = this.subscription
    this.client.subscribe(topic, {qos}, (error, res) => {
      if (error) {
        console.error('订阅主题错误', error)
        return
      }
      this.subscribeSuccess = true
      console.log('订阅主题： res', res)
    })
  },
//取消订阅
  doUnSubscribe() {
    const {topic} = this.subscription
    this.client.unsubscribe(topic, error => {
      if (error) {
        console.error('取消订阅错误', error)
      }
    })
  },
//消息发布
  doPublish(payload) {
    const {topic, qos} = this.publish
    this.client.publish(topic, payload, qos, error => {
      if (error) {
        console.error('发布错误:', error)
      }
    })
  },
//断开连接
  destroyConnection() {
    if (this.client.connected) {
      try {
        this.client.end()
        this.client = {
          connected: false,
        }
        console.log('成功断开连接！')
      } catch (error) {
        console.log('断开连接失败', error.toString())
      }
    }
  }
}


export default useMqtt
