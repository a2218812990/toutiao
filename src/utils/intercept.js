// 请求和返回拦截工具
import axios from 'axios'
import router from '../router/index'
import { Message } from 'element-ui'
import jsonBigInt from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
// config中是请求时携带的配置信息，可以进行修改
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
// 因为返回的文章id值太长，json.parse无法处理，但是axios又会自动处理，因此用插件来转化
axios.defaults.transformResponse = [function (data) {
  console.log(jsonBigInt.parse(data))
  return jsonBigInt.parse(data)
}]
// 返回拦截，返回的数据有些接口其实并不需要，但是不能返回的是undefined不然会报错，给一个空对象返回
axios.interceptors.response.use(function (response) {
  // 响应数据返回成功的时候
  return response.data ? response.data : {}
//   这里截取了返回值，并进行了修改，所以发送请求的时候返回值也应该修改
}, function (error) {
// 响应数据返回失败的时候
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:

      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
  // 缺少对错误的后续处理
  return Promise.reject(error)
})
export default axios
