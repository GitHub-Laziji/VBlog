import UserApi from '@/api/user'
const user = {
  state: {
    avatarUrl:null,
    name:null,
    location:null,
    blog:null
  },

  mutations: {
    SET_AVATAR_URL: (state, value) => {
      state.avatarUrl = value
    },
    SET_NAME: (state, value) => {
      state.name = value
    },
    SET_LOCATION: (state, value) => {
      state.location = value
    },
    SET_BLOG: (state, value) => {
      state.blog = value
    }
  },

  actions: {
    GetInfo({ commit }) {
      UserApi.getInfo().then((response)=>{
        let result = response.data
        commit('SET_AVATAR_URL',result['avatar_url'])
        commit('SET_NAME',result['name'])
        commit('SET_LOCATION',result['location'])
        commit('SET_BLOG',result['blog'])
      })
      
    }
  }
}

export default user