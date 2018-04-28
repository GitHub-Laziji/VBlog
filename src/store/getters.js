const getters = {
  token: state => state.token.token,
  githubUsername:state => state.configuration.githubUsername,
  blogTitle:state => state.configuration.blogTitle,
  blogDescribe:state => state.configuration.blogDescribe,
  htmlTitle:state => state.configuration.htmlTitle,
  avatarUrl:state => state.user.avatarUrl,
  name:state => state.user.name,
  location:state => state.user.location,
}
export default getters
