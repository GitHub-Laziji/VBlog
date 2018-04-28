import UserApi from '@/api/user'
const user = {
  state: {
    avatarUrl:null,
    name:null,
    location:null
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
    }
  },

  actions: {
    GetInfo({ commit }) {
      UserApi.getInfo().then((result)=>{
        commit('SET_AVATAR_URL',result['avatar_url'])
        commit('SET_NAME',result['name'])
        commit('SET_LOCATION',result['location'])
      })
      
    }
  }
}

export default user