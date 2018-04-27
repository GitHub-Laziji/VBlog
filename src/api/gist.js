import request from '@/utils/request'
import store from '../store/index'

export default {
  test:function(){
    return request({
      url: ''
    })
  },
  verifyToken:function(){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: '/users/'+githubUsername+'/gists'
    })
  },
  list:function(){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: '/users/'+githubUsername+'/gists'
    })
  },
  single:function(id){
    return request({
      url: '/gists/'+id
    })
  },
  create:function(form){
    let files = {}
    files[form.title]={content:form.content}
    return request({
      url: '/gists',
      method: 'post',
      data:{
        "description": form.description,
        "public": true,
        "files": files
      }
    })
  },
  edit:function(form){
    let files = {}
    files[form.title]={content:form.content}
    return request({
      url: '/gists/'+form.id,
      method: 'PATCH',
      data:{
        "description": form.description,
        "public": true,
        "files": files
      }
    })
  },
  delete:function(id){
    return request({
      url: '/gists/'+id,
      method: 'DELETE',
    })
  },
}