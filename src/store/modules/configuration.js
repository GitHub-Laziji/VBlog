
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
        audioAutoPlay:false,
        webSites:[]
    },

    mutations: {
        SET_CONFIGURATION: (state, configuration) => {
            state.githubUsername = configuration["githubUsername"] || "GitHub-Laziji"

            state.blogTitle = configuration["blogTitle"] || state.githubUsername

            state.blogDescribe = configuration["blogDescribe"] || `欢迎来到${state.githubUsername}的个人博客。`

            state.htmlTitle = configuration["htmlTitle"] || `${state.githubUsername}的博客`

            state.fontColor = configuration["fontColor"] || "#ffffff"

            state.useBackgroundImage = configuration["useBackgroundImage"] || false

            state.backgroundColorLeft = configuration["backgroundColorLeft"] || "#155799"

            state.backgroundColorRight = configuration["backgroundColorRight"] || "#159957"

            //http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3
            state.audioUrl = configuration["audioUrl"] || ""

            state.mini = configuration["mini"] || false

            state.audioAutoPlay = configuration["audioAutoPlay"] || false

            state.webSites = configuration["webSites"] || []
        }
    },

    actions: {
        LocalReload({ commit }, configuration) {
            commit('SET_CONFIGURATION', configuration)
        },
        // 原来用同步 XHR 拉 configuration.json（第三个参数 false），
        // 会把主线程卡住直到请求返回；改成 fetch + Promise，加载失败退回默认配置。
        Init({ commit }) {
            return fetch('static/configuration.json', { cache: 'no-cache' })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('configuration.json ' + response.status)
                    }
                    return response.json()
                })
                .then((configuration) => {
                    commit('SET_CONFIGURATION', configuration)
                })
                .catch(() => {
                    commit('SET_CONFIGURATION', {})
                })
        }
    }
}

export default configuration
