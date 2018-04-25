import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import configuration from './modules/configuration'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    token,
    configuration
  },
  getters
})

export default store
