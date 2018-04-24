import request from '@/utils/request'

export default {
  test:function(){
    return request({
      url: ''
    })
  },
  list:function(){
    return request({
      url: '/users/GitHub-Laziji/gists'
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
}