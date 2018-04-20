import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Test from '@/views/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:Test
    }
  ]
})
