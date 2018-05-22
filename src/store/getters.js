const getters = {
    token: state => state.token.token,
    githubUsername: state => state.configuration.githubUsername,
    blogTitle: state => state.configuration.blogTitle,
    blogDescribe: state => state.configuration.blogDescribe,
    htmlTitle: state => state.configuration.htmlTitle,
    fontColor: state => state.configuration.fontColor,
    useBackgroundImage: state => state.configuration.useBackgroundImage,
    backgroundColorLeft: state => state.configuration.backgroundColorLeft,
    backgroundColorRight: state => state.configuration.backgroundColorRight,
    audioUrl: state => state.configuration.audioUrl,
    mini: state => state.configuration.mini,
    audioAutoPlay: state => state.configuration.audioAutoPlay,
    webSites: state => state.configuration.webSites,
    avatarUrl: state => state.user.avatarUrl,
    name: state => state.user.name,
    location: state => state.user.location,
    blog: state => state.user.blog,
    followersTotal: state => state.user.followers,
    followingTotal: state => state.user.following,


}
export default getters
