
const configuration = {
  state: {
    githubUsername:"",
    blogTitle:"",
    blogDescribe:"",
    htmlTitle:"",
    fontColor:"",
    useBackgroundImage:false,
    backgroundColorLeft:"",
    backgroundColorRight:""
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

      state.fontColor = configuration["fontColor"]
      if(!state.fontColor){
        state.fontColor="#ffffff"
      }
      state.useBackgroundImage = configuration["useBackgroundImage"]
      if(!state.useBackgroundImage){
        state.useBackgroundImage=false
      }
      state.backgroundColorLeft = configuration["backgroundColorLeft"]
      if(!state.backgroundColorLeft){
        state.backgroundColorLeft="#155799"
      }
      state.backgroundColorRight = configuration["backgroundColorRight"]
      if(!state.backgroundColorRight){
        state.backgroundColorRight="#159957"
      }
    },
    // GET_PARAM:(state, name) => {
    //   return state.configuration[name]
    // }
  },

  actions: {
    LocalReload({ commit }, configuration) {
      commit('SET_CONFIGURATION',configuration)
    },
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