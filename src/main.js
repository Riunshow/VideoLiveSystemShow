// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'

import store from './store'
Vue.prototype.$store = store

// reset css
import './assets/reset.css'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { directive } from 'namedavatar/src/vue'
Vue.directive('avatar', directive);

import request from '@/utils/request'

Vue.use(ElementUI)

Vue.prototype.$request = request

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
