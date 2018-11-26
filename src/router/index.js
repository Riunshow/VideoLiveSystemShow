import Vue from 'vue'
import Router from 'vue-router'

import Video from '@/pages/video/Video';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'live-video',
      component: Video
    }
  ]
})
