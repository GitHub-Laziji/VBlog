import Cookie from '@/utils/cookie'

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
      commit('SET_TOKEN',accessToken)
    },
    Cancellation({ commit }) {
      commit('REMOVE_TOKEN')
    },
  }
}

export default token