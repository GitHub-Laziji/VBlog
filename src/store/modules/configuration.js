
const configuration = {
    state: {
        githubUsername: "",
        blogTitle: "",
        blogDescribe: "",
        htmlTitle: "",
        fontColor: "",
        useBackgroundImage: false,
        backgroundColorLeft: "",
        backgroundColorRight: "",
        audioUrl: "",
        mini: false,
        audioAutoPlay:false
    },

    mutations: {
        SET_CONFIGURATION: (state, configuration) => {
            state.githubUsername = configuration["githubUsername"]
            if (!state.githubUsername) {
                state.githubUsername = "GitHub-Laziji"
            }
            state.blogTitle = configuration["blogTitle"]
            if (!state.blogTitle) {
                state.blogTitle = state.githubUsername
            }
            state.blogDescribe = configuration["blogDescribe"]
            if (!state.blogDescribe) {
                state.blogDescribe = "欢迎来到" + state.githubUsername + "的个人博客。"
            }
            state.htmlTitle = configuration["htmlTitle"]
            if (!state.htmlTitle) {
                state.htmlTitle = state.githubUsername + "的博客"
            }

            state.fontColor = configuration["fontColor"]
            if (!state.fontColor) {
                state.fontColor = "#ffffff"
            }
            state.useBackgroundImage = configuration["useBackgroundImage"]
            if (!state.useBackgroundImage) {
                state.useBackgroundImage = false
            }
            state.backgroundColorLeft = configuration["backgroundColorLeft"]
            if (!state.backgroundColorLeft) {
                state.backgroundColorLeft = "#155799"
            }
            state.backgroundColorRight = configuration["backgroundColorRight"]
            if (!state.backgroundColorRight) {
                state.backgroundColorRight = "#159957"
            }

            //http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3
            state.audioUrl = configuration["audioUrl"]
            if (!state.audioUrl) {
                state.audioUrl = ""
            }

            state.mini = configuration["mini"]
            if (!state.mini) {
                state.mini = false
            }

            state.audioAutoPlay = configuration["audioAutoPlay"]
            if (!state.audioAutoPlay) {
                state.audioAutoPlay = false
            }
        },
        // GET_PARAM:(state, name) => {
        //   return state.configuration[name]
        // }
    },

    actions: {
        LocalReload({ commit }, configuration) {
            commit('SET_CONFIGURATION', configuration)
        },
        Init({ commit }) {
            let xmlhttp
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest()
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
            }
            xmlhttp.open("GET", "../../../static/configuration.json", false)
            xmlhttp.send()
            let configuration = JSON.parse(xmlhttp.responseText)
            commit('SET_CONFIGURATION', configuration)
        }
    }
}

export default configuration