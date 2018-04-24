// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import util from './utils/util'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor' 
import 'mavon-editor/dist/css/index.css'
import store from './store'

Vue.use(ElementUI)
Vue.use(mavonEditor)

Vue.prototype.$markdown = function(value){
	return mavonEditor.markdownIt.render(value)
}

Vue.prototype.$reload = function(context){
	let NewPage = '/empty'
    context.$router.push(NewPage)
    context.$nextTick(() => (context.$router.go(-1)))
    
}

Vue.prototype.$util = util

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
