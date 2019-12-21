// 请求和返回拦截工具
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
// config中是请求时携带的配置信息，可以进行修改
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
// 返回拦截，返回的数据有些接口其实并不需要，但是不能返回的是undefined不然会报错，给一个空对象返回
axios.interceptors.response.use(function (response) {
  // 响应数据返回成功的时候
  return response.data ? response.data : {}
//   这里截取了返回值，并进行了修改，所以发送请求的时候返回值也应该修改
}, function () {
// 响应数据返回失败的时候

})
export default axios
