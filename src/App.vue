<template>
  <div id="app">
    <el-container>
      <!-- header -->
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <!-- aside -->
        <el-aside width="200px">Aside</el-aside>
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
export default {
  name: 'App',
  components: {
    Header
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
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
  }
}

</style>
