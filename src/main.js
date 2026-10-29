import Vue from 'vue'
import DOMPurify from 'dompurify'
import App from './App'
import util from './utils/util'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import store from './store'

Vue.use(mavonEditor)

// markdown 渲染结果直接进 v-html，必须过一遍消毒，避免文章里混入的
// <script>/onerror 之类在读者浏览器里执行（XSS）。
Vue.prototype.$sanitize = function (html) {
    if (!html) {
        return ""
    }
    return DOMPurify.sanitize(html, {
        ADD_ATTR: ['target'],
        ALLOW_DATA_ATTR: false
    })
}

Vue.prototype.$markdown = function (value) {
    return Vue.prototype.$sanitize(mavonEditor.markdownIt.render(value || ""))
}

Vue.prototype.$reload = function (context) {
    let NewPage = '/empty'
    context.$router.push(NewPage)
    context.$nextTick(() => (context.$router.go(-1)))
}

Vue.prototype.$setTitle = function (title) {
    if (title) {
        document.title = store.state.configuration.htmlTitle + " - " + title
    } else {
        document.title = store.state.configuration.htmlTitle
    }
}
Vue.prototype.$share = function (message) {
    if (!message) {
        message = window.location
    } else {
        let arr = (window.location + "").split("#")
        message = arr[0] + "#" + message
    }
    if (util.copy(message)) {
        Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
            showCancelButton: false,
            showClose: false,
            type: 'success'
        })
    } else {
        Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
            showCancelButton: false,
            showClose: false,
            type: 'warning'
        })
    }
}

Vue.prototype.$mobileShare = function (message) {
    if (!message) {
        message = window.location
    } else {
        let arr = (window.location + "").split("#")
        message = arr[0] + "#" + message
    }
    if (util.copy(message)) {
        Vue.prototype.$dialog.alert({
            title: '分享',
            message: '链接已复制,去分享给好友吧!!'
        })
    } else {
        Vue.prototype.$dialog.alert({
            title: '分享',
            message: '链接复制失败,可能因为浏览器不兼容'
        })
    }
}



Vue.prototype.$util = util

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
