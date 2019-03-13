import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage/HomePage'
import AllCategory from '@/pages/AllCategory/AllCategory'
import LiveRoomByCate from '@/pages/LiveRoomByCate/LiveRoomByCate'
import LiveRoom from '@/pages/LiveRoom/LiveRoom'
import Video from '@/pages/Video/Video'

import socketio from 'socket.io-client'

Vue.use(Router)

const router =  new Router({
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
      component: LiveRoom,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/video/:roomId',
      name: 'live-video',
      component: Video,
      meta: {
        requireAuth: true
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.length === 0) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }else {
    next()
  }
})


export default router
