// 桌面端 UI 库按布局懒加载：只在桌面 Layout（以及不经过 Layout 的 404 页）里注册，移动端不拉。
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
