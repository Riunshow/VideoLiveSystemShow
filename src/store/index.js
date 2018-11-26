import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import indexPage from './modules/indexPage'

const plugins = []
if (process.env.NODE_ENV !== 'development') {
  plugins.push(createLogger())
}
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    indexPage
  },
  plugins
})