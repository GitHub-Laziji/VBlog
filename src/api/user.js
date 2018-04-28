import request from '@/utils/request'
import store from '../store/index'

export default {
  verifyToken:function(){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: '/users/'+githubUsername
    })
  },
  getInfo:function(){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: '/users/'+githubUsername
    })
  },
}