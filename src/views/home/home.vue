<template>
<el-container>
  <el-aside>
 <layoutAside></layoutAside>
  </el-aside>

  <el-container>
    <el-header>头部</el-header>
    <el-main>主题内容</el-main>
  </el-container>

</el-container>
</template>

<script>
import layoutAside from '../../components/home/layoutAside'
export default {
  components: { 'layoutAside': layoutAside }
}
</script>

<style>

</style>
