<template>
  <div class="flvVideo">
    <div v-if="isLive">
      <video id="videoElement" class="flv-player"></video>
    </div>
    <div v-else>
      主播正在赶来的路上，先去看看其他的主播。
    </div>
    <!-- <button @click="playVideo">play</button> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import flvjs from 'flv.js'
export default {
  name: 'flv-player',
  props: {
    roomID: {
      type: Number,
      required: false
    },
  },
  data() {
    return {
      isLive: false,
    }
  },
  async created() {
    if (this.liveInfo.status == 1) {
      this.isLive = true
      this.playVideo()
    }
  },
  mounted() {
    // this.playVideo()
  },
  computed: {
		...mapState('live', ['liveInfo'])    
  },
  methods: {
    playVideo() {
      if (this.roomID && flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: `http://localhost:9090/live/${this.roomID}.flv`
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flvVideo {
  width: 700px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.24);

  .flv-player {
    width: 700px;
    height: 400px;
  }
}
</style>
