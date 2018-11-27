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
  </div>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'

export default {
  name: 'App',
  components: {
    Header,
    Aside
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  width: 100%;

  .el-container {
    height: 100%;
    width: 100%;

    .el-header {
      background-color: #f2f2f3;
      height: 64px !important;
    }
    
    .el-aside {
      background-color: #191b2e;
      color: #fff;
      // text-align: center;
      // line-height: 200px;
      width: auto !important;
      max-width: 200px;
    }
    
    .el-main {
      background-color: #f2f2f3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
  }
}

</style>
