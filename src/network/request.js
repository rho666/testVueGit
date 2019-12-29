import axios from 'axios'

export function request(config) {

  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/w1',
  })

  // 创建拦截器
  instance.interceptors.request.use(fulfill => {
    return fulfill
  }, err => {
    console.log("request拦截器错误:"+err)
  })

  instance.interceptors.response.use(fulfill => {
    return fulfill.data
  }, err => {
    console.log("response拦截器错误:"+err)
  })

  // instance本身是一个Promise对象，所以直接返沪
  return instance(config)
  
}