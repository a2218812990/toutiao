<template>
<el-container>
  <el-aside :style="{width : collapse ? '60px' : '220px'}" style="min-height:100vh;background-color:#353b4e">
 <layoutAside></layoutAside>
 <!-- 左侧导航部分 -->
  </el-aside>

  <el-container>
    <el-header class="elheader">
<!-- 头部 -->
    <layoutheader></layoutheader>
    </el-header>

    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>

</el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
// import layoutAside from '../../components/home/layoutAside'
// import layoutheader from '../../components/home/layoutheader'
export default {
  data () {
    return {
      collapse: false
    }
  },
  // components: {
  //   'layoutAside': layoutAside,
  //   'layoutheader': layoutheader
  // }
  created () {
    eventBus.$on('changecollapse', () => {
      this.collapse = !this.collapse
    })
  }
}

</script>

<style>

</style>
