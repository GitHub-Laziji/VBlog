import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    token
  },
  getters
})

export default store
