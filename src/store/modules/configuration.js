
const configuration = {
  state: {
    githubUsername:"",
    blogTitle:"",
    blogDescribe:""
  },

  mutations: {
    SET_CONFIGURATION: (state, configuration) => {
      state.githubUsername = configuration["github-username"]
      if(!state.githubUsername){
        state.githubUsername="GitHub-Laziji"
      }
      state.blogTitle = configuration["blog-title"]
      if(!state.blogTitle){
        state.blogTitle=state.githubUsername
      }
      state.blogDescribe = configuration["blog-describe"]
      if(!state.blogDescribe){
        state.blogDescribe="欢迎来到"+state.githubUsername+"的个人博客。"
      }
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