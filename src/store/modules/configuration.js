
const configuration = {
  state: {
    githubUsername:"",
    blogTitle:"",
    blogDescribe:"",
    htmlTitle:""
  },

  mutations: {
    SET_CONFIGURATION: (state, configuration) => {
      state.githubUsername = configuration["githubUsername"]
      if(!state.githubUsername){
        state.githubUsername="GitHub-Laziji"
      }
      state.blogTitle = configuration["blogTitle"]
      if(!state.blogTitle){
        state.blogTitle=state.githubUsername
      }
      state.blogDescribe = configuration["blogDescribe"]
      if(!state.blogDescribe){
        state.blogDescribe="欢迎来到"+state.githubUsername+"的个人博客。"
      }
      state.htmlTitle = configuration["htmlTitle"]
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