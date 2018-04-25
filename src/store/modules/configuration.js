
const configuration = {
  state: {
    githubUsername:"",
    blogTitle:"",
    blogDescribe:""
  },

  mutations: {
    SET_CONFIGURATION: (state, configuration) => {
      state.githubUsername = configuration["github-username"]
      state.blogTitle = configuration["blog-title"]
      state.blogDescribe = configuration["blog-describe"]
    },
    // GET_PARAM:(state, name) => {
    //   return state.configuration[name]
    // }
  },

  actions: {
    Init({ commit }, configuration) {
      commit('SET_CONFIGURATION',configuration)
    }
  }
}

export default configuration