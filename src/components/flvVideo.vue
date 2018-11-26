<template>
  <div>
    <video id="videoElement" class="flv-player"></video>
    <button @click="playVideo">play</button>
  </div>
</template>

<script>
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
    }
  },
  // computed: {},
  // watch: {},
  // beforeCreate: function () {},
  created() {

  },
  // beforeMount: function () {},
  mounted() {
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: `http://localhost:9090/api/live/${this.roomID}.flv`
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  },
  methods: {
    playVideo() {
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
</script>

<style scoped>
</style>
