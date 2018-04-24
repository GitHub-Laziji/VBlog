import axios from 'axios'
import Vue from 'vue'
import store from '../store/index'


const service = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    let token=store.state.token.token
    if(token){
      config.url = config.url+"?access_token="+token
    }
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
