import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage/HomePage'
import AllCategory from '@/pages/AllCategory/AllCategory'
import LiveRoomByCate from '@/pages/LiveRoomByCate/LiveRoomByCate'
import LiveRoom from '@/pages/LiveRoom/LiveRoom'
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
      path: '/allCategory',
      name: 'AllCategory',
      component: AllCategory
    },
    {
      path: '/liveRoomByCate/:cateId',
      name: 'liveRoomByCate',
      component: LiveRoomByCate
    },
    {
      path: '/liveRoom/:roomId',
      name: 'liveRoom',
      component: LiveRoom
    },
    {
      path: '/video/:roomId',
      name: 'live-video',
      component: Video
    }
  ]
})
