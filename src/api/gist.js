import request from '@/utils/request'

export default {
  test:function(){
    return request({
      url: ''
    })
  },
  list:function(){
    return request({
      url: 'https://api.github.com/users/GitHub-Laziji/gists'
    })
  },
  create:function(form){
    let files = {}
    files[form.title]={content:form.content}
    return request({
      url: 'https://api.github.com/gists?access_token=T',
      method: 'post',
      data:{
        "description": form.description,
        "public": true,
        "files": files
      }
    })
  },
}