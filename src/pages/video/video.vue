<template>
  <div>
    <button @click="applicationRoom">申请直播间</button>
    <flv-player :roomID="roomID" />
    <baberrage
      :isShow= "barrageIsShow"
      :barrageList = "barrageList"
      :loop = "barrageLoop"
      :boxWidth="300"
      :boxHeight="300"
      >
    </baberrage>
    <input type="text" :v-model="inputSM">
    <button @click="addToList">send</button>
  </div>
</template>
<script>
import pathname from '@/config/pathName'
import FlvPlayer from '@/components/FlvVideo'
import Baberrage from '@/components/Baberrage'


export default {
  name: 'liveVideo',
  components: {
    FlvPlayer,
    Baberrage
  },
  data() {
    return {
      roomID: 0,
      inputSM: '',
      msg: 'Hello msg',
      barrageIsShow: true,
      currentId : 0,
      barrageLoop: false,
      barrageList: []
    }
  },
  async created () {
    const data = await this.$request(pathname.LIVELIST, 'get')
    this.roomID = data[0].roomID
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
    // 添加弹幕
    addToList (){
      this.barrageList.push({
        id: ++this.currentId,
        avatar: "@/assets/logo.png",
        msg: this.msg,
        // barrageStyle: "normal",
        time: 5,
        type: 0,
        position: 'bottom'
      });
    }
  }
}
</script>
<style>
  .flv-player {
    width: 30%;
  }
</style>