//请求的底层
import axios from 'axios'
// import { getToken } from '@/utils/cookie'

//创建axios实例
const service = axios.create({
baseURL: 'http://192.168.1.128:6768', // api 的 base_url
timeout: 5000 // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(
// config => {
// if (getToken()) {
// config.headers['Auth'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
// }
// return config
// },
// error => {
// // Do something with request error
// console.log(error) // for debug
// Promise.reject(error)
// }
// )



// response 拦截器
service.interceptors.response.use(
response =>{
return response
},
error => {
console.log('err' + error) 
return Promise.reject(error)
}
)

export default service