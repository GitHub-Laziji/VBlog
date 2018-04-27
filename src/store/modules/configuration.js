
const configuration = {
  state: {
    githubUsername:"",
    blogTitle:"",
    blogDescribe:"",
    htmlTitle:""
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
      state.htmlTitle = configuration["html-title"]
      if(!state.htmlTitle){
        state.htmlTitle=state.githubUsername+"的博客"
      }
    },
    // GET_PARAM:(state, name) => {
    //   return state.configuration[name]
    // }
  },

  actions: {
    Init({ commit }) {
      let xmlhttp
      if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest()
      }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
      }
      xmlhttp.open("GET","../../../static/configuration.json",false)
      xmlhttp.send()
      let configuration = JSON.parse(xmlhttp.responseText)
      commit('SET_CONFIGURATION',configuration)
    }
  }
}

export default configuration