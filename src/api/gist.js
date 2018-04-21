import request from '@/utils/request'

export default {
  test:function(){
    return request({
      url: '/raw/365370/8c4d2d43d178df44f4c03a7f2ac0ff512853564e/ring.erl'
    })
  },
  list:function(){
    return request({
      url: 'https://api.github.com/users/GitHub-Laziji/gists'
    })
  }
}