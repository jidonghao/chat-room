import axios from "axios";

 let baseUrl = "https://sskapi.dhxt.fun/"
//let baseUrl = "http://192.168.8.223:8001/",host = ""

// 响应拦截器 对请求到的数据进行处理
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

let post = (url, data) => axios.post(baseUrl + url, data)

let upImg = (data) => axios.post(baseUrl + 'upLoadImg', data)
let get = (url, data) => axios.get(baseUrl + url, {params: data})
export default {post, upImg, get}
