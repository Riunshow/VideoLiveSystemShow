<template>
  <div>
    <button @click="play">play</button>
    <button @click="refresh">refresh</button>
    <button @click="pause">pause</button>
    <flv-player ref="fp" :mediaDataSource='{
      type: "flv",
      url:"http://127.0.0.1:7001/hks/http.flv",
      isLive:true,
      }'
      :config='{
      // enableStashBuffer:false,
      }' />
  </div>
</template>
<script>
import flvPlayer from '@/components/flvVideo'
 export default {
		name: 'video',
		components: {
			flvPlayer
		},
    data() {
      return {}
    },
    methods: {
      play(){
        this.$refs.fp.play()
      },
      refresh(){
        this.$refs.fp.refresh()
      },
      pause(){
        this.$refs.fp.pause()
      }
    }
  }
</script>
<style>
  .flv-player {
    width: 30%;
  }
</style>