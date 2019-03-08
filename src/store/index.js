import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import user from './modules/user'
import indexPage from './modules/indexPage'
import live from './modules/live'
import gift from './modules/gift'

const plugins = []

// if (process.env.NODE_ENV !== 'development') {
//   plugins.push(createLogger())
// }

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    indexPage,
    live,
    gift
  },
  plugins
})