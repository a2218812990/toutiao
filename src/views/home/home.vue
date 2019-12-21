<template>
<el-container>
  <el-aside style="width:220px">
 <layoutAside></layoutAside>
 <!-- 左侧导航部分 -->
  </el-aside>

  <el-container>
    <el-header class="elheader">
<!-- 头部 -->
    <layoutheader></layoutheader>
    </el-header>

    <el-main>主题内容</el-main>
  </el-container>

</el-container>
</template>

<script>
// import layoutAside from '../../components/home/layoutAside'
// import layoutheader from '../../components/home/layoutheader'
export default {
  // components: {
  //   'layoutAside': layoutAside,
  //   'layoutheader': layoutheader
  // }
}

</script>

<style>

</style>
