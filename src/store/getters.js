const getters = {
  token: state => state.token.token,
  githubUsername:state => state.configuration.githubUsername,
  blogTitle:state => state.configuration.blogTitle,
  blogDescribe:state => state.configuration.blogDescribe
}
export default getters
