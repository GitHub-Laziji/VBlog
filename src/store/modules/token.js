import Cookie from '@/utils/cookie'
import UserApi from '@/api/user'
import store from '../index'
import Vue from 'vue'

const TOKEN_KEY = "TOKEN_KEY"
const token = {
  state: {
    token: Cookie.getAttribute(TOKEN_KEY)
  },

  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
      Cookie.setAttribute(TOKEN_KEY,value,30)
    },
    REMOVE_TOKEN: (state) => {
      state.token = null
      Cookie.remove(TOKEN_KEY)
    }
  },

  actions: {
    Authentication({ commit }, accessToken) {
      UserApi.verifyToken(accessToken).then((result)=>{
        let githubUsername=store.state.configuration.githubUsername
        if(githubUsername==result['login']){
          commit('SET_TOKEN',accessToken)
          Vue.prototype.$message({
            message: 'Token绑定成功',
            type: 'success'
          })
        }else{
          Vue.prototype.$message({
            message: 'Token用户不一致',
            type: 'error'
          })
        }
      }).catch(()=>{
        
      })
    },
    Cancellation({ commit }) {
      commit('REMOVE_TOKEN')
    },
  }
}

export default token