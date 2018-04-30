import request from '@/utils/request'
import store from '../store/index'

export default {
  getBlogReadme:function(){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: '/repos/'+githubUsername+'/'+githubUsername+'.github.io/contents/README.md'
    })
  },
  list:function(){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: '/users/'+githubUsername+'/repos'
    })
  },
  single:function(name){
    let githubUsername=store.state.configuration.githubUsername
    return new Promise((resolve, reject)=>{
      request({
        url: '/repos/'+githubUsername+'/'+name
      }).then((result)=>{
        request({
          url: '/repos/'+githubUsername+'/'+name+'/contents/README.md'
        }).then((sr)=>{
          result['readme_content']=sr['content']
          resolve(result)
        }).catch(()=>{
          result['readme_content']=""
          resolve(result)
        })
      })
      
    })
  },

}