<template>
  <div class="flvVideo">
    <div v-if="isLive">
      <video id="videoElement" :class="isFullScreenStatus ? 'full-video' : 'flv-player'" ref="videoDom"></video>
    </div>
    <div class="noLive" v-else>
      主播正在赶来的路上，先去看看其他的主播。
    </div>
    <div class="shouldClickToPlay" v-if="canNotPlay">
      您的浏览器不支持自动播放，请点击按钮进行播放
      <button @click="playVideo">play</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import screenfull from 'screenfull'
import flvjs from 'flv.js'

export default {
  name: 'flv-player',
  props: {
    roomID: {
      type: Number,
      required: false
    },
    volume: {
      type: Number,
      required: false
    },
    token: String
  },
  data() {
    return {
      isLive: true,
      canNotPlay: false,
      flvPlayer: null,
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy () {
    if(this.flvPlayer) {
      this.flvPlayer.unload()
    }
  },
  computed: {
    ...mapState('live', ['liveInfo', 'isFullScreenStatus']),
  },
  watch: {
    'liveInfo.status'(val) {
      if (val == 1) {
        this.playVideo()    
      }else {
        this.isLive = false
      }
    }
  },
  methods: {
    playVideo() {
      this.canNotPlay = false
      if (this.roomID && flvjs.isSupported()) {
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: `http://localhost:9090/live/${this.token}.flv`
        })
        this.flvPlayer.attachMediaElement(this.$refs.videoDom)
        this.flvPlayer.load()
        // flvPlayer.play()

        const playPromise = this.flvPlayer.play()
        console.log(playPromise)
        if (playPromise !== null){
            playPromise.catch((err) => {
              console.log('err: ', err)
              this.canNotPlay = true
              return
            })
        }
        this.flvPlayer.volume = this.volume
      }
    },
    fullScreenControl() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle(this.$el)
    },
  }
}
</script>

<style lang="scss" scoped>
.flvVideo {
  width: 100%;
  height: 100%;
  // width: 700px;
  // height: 400px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgb(255, 102, 0);
  border-radius: 5px;
  color: #fff;

  .flv-player {
    width: 700px;
    height: 400px;
  }

  .full-video {
    height: 100vh;
    width: 100vw;
  }

  .noLive {
    position: relative;
    z-index: 300;
    background-color: rgb(0, 0, 0);
    width: 700px;
    height: 400px;
  }

  .shouldClickToPlay {
    position: relative;
    z-index: 300;
    top: -400px;
    width: 700px;
    height: 400px;
    background-color: rgb(0, 0, 0);
  }
}
</style>
