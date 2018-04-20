import axios from 'axios'
import Vue from 'vue'


const service = axios.create({
  baseURL: "https://gist.githubusercontent.com",
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  }, 
  error => {
   
  }
)


service.interceptors.response.use(
  response => {
    let responseJson = response.data
    return responseJson
  },
  error => {
  }
)

export default service
