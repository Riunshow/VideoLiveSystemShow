<template>
  <div id="app">
    <el-container>
      <!-- aside -->
      <el-aside>
        <Aside />
      </el-aside>

      <el-container>
        <!-- header -->
        <el-header>
          <Header />
        </el-header>

        <!-- main -->
        <el-main>
          <router-view/>
        </el-main>

      </el-container>
    </el-container>
    <div class="page-component-up" v-if="userInfo.role == 2">
      <div @click="clickStartLive">
        设置直播间信息
      </div>
    </div>

    <el-dialog title="直播间信息" :visible.sync="liveFormVisible">
      <el-form :model="liveForm">
        <el-form-item label="直播图片" :label-width="formLabelWidth">
          <upload 
            v-on:getImgUrl="getImgUrl"
          />
        </el-form-item>
        <el-form-item label="直播间标题" :label-width="formLabelWidth">
          <el-input v-model="liveForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="直播分类" :label-width="formLabelWidth">
          <el-select v-model="selectCate" placeholder="请选择" @change="changeSelect">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="liveFormVisible = false">取 消</el-button>
        <el-button v-if="canUpdate" type="primary" @click="start">确 定</el-button>
        <el-button v-else disabled>确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="配置信息" :visible.sync="liveInfoVisible">
      <div class="optionsInfo">
        <span>token: {{liveInfoData.token}}</span>
        <span>房间id: {{liveInfoData.roomID}}</span>
        <span>OBS推流地址: rtmp://localhost/live</span>
        <span>流名称: {{liveInfoData.token}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Upload from '@/components/Upload'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    Header,
    Aside,
    Upload
  },
  data () {
    return {
      liveFormVisible: false,
      liveInfoVisible: false,
      formLabelWidth: '100px',
      canUpdate: false, // 确定按钮是否可以点击
      liveForm: {
        title: ''
      },
      selectOptions: [],
      selectCate: '',
      selectCateId: -1,
      liveInfoData: {}
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
		...mapState('indexPage', ['menuList', 'loading'])       
  },
  methods: {
    ...mapActions('live', ['startLive']),
    ...mapActions('indexPage', ['getMenuList']),

    changeSelect(id) {
      this.selectCateId = id
    },

    async clickStartLive() {
      this.selectOptions = []
      this.liveFormVisible = true
      await this.getMenuList()
      this.menuList.map(x => {
        this.selectOptions.push({
          label: x.groupName,
          value: x.liveGroupId
        })
      })
    },

    async start() {
      if (this.liveForm.title == '' || this.liveForm.cover == '' || this.selectCateId == -1) {
        this.$message('填写项不能为空')
        return
      }
      const params = {
        title: this.liveForm.title,
        cover: this.liveForm.cover,
        category: this.selectCateId,
        userID: JSON.parse(sessionStorage.userInfo).id
      }
      const result = await this.startLive(params)
      if (result.success) {
        console.log(result);
        this.liveFormVisible = false

        this.liveInfoVisible = true
        this.liveInfoData = result.data[0] || result.data
      }else {
        this.$message(result.msg)
      }
    },
    // 获取图片url
    getImgUrl(imgUrl) {
      this.liveForm.cover = imgUrl
      this.canUpdate = true
    }
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  
  .el-container {
    height: 100%;
    width: 100%;

    .el-header {
      padding: 0;
      background-color: #fff;
      // height: 72px !important;
      border-bottom: 1px solid rgb(255, 102, 0);
    }
    
    .el-aside {
      background-color: #2c2c2c;
      color: #fff;
      width: auto !important;
      max-width: 200px;
    }
    
    .el-main {
      background-color: #f2f2f3;
      color: #333;
      // text-align: center;
      // line-height: 160px;
    }
  }

  .page-component-up {
    background-color: #fff;
    position: fixed;
    right: 50px;
    bottom: 100px;
    width: 100px;
    height: 40px;
    size: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    z-index: 1000;

    div {
      color: rgb(255, 102, 0);
      display: block;
      line-height: 40px;
      text-align: center;
      font-size: 13px;
    }
  }

  .optionsInfo {
    display: flex;
    flex-direction: column;

    span {
      margin: 10px 0;
    }
  }
}

</style>
