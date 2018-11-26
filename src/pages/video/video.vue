<template>
  <div>
    <button @click="applicationRoom">申请直播间</button>
    <flv-player :roomID="roomID" />
  </div>
</template>
<script>
import pathname from '@/config/pathName'
import FlvPlayer from '@/components/FlvVideo'

export default {
  name: 'liveVideo',
  components: {
    FlvPlayer
  },
  data() {
    return {
      roomID: 0
    }
  },
  async created () {
    const data = await this.$request(pathname.LIVELIST, 'get')
    this.roomID = data[0].roomID
    // this.mediaDataParams.url = `http://localhost:9090/live/${data.roomID}.flv`
  },
  mounted(){
  },
  methods: {
    // 申请直播间
    async applicationRoom() {
      const params = {
        title: 'test room', 
        cover: ''
      }
      const result = await this.$request(pathname.APPLICATION, 'post', params)
    },
  }
}
</script>
<style>
  .flv-player {
    width: 30%;
  }
</style>