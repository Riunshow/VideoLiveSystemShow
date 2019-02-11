import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage/HomePage'
import Video from '@/pages/Video/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/video/:roomId',
      name: 'live-video',
      component: Video
    }
  ]
})
