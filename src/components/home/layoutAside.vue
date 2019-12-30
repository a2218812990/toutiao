<template>
<div class="layout-aside">

<div class="logo">
<img :src=" isCollapse ? smallimg : bigimg" alt="">
</div>
<!-- 左侧导航区域 -->
<el-menu router background-color="#353b4e" text-color="#adafb5" :collapse="isCollapse">
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
 </el-menu-item>

 <el-submenu index='1'>
      <i slot="title" class="el-icon-s-order"></i>
     <span slot="title">内容管理</span>
 <el-menu-item index="/home/publish">发布文章</el-menu-item>
 <el-menu-item index="/home/articles">文章列表</el-menu-item>
 <el-menu-item index="/home/comment">评论管理</el-menu-item>
 <el-menu-item index="/home/material">素材管理</el-menu-item>
 </el-submenu>

 <el-submenu index='2'>
      <i slot="title" class="el-icon-user"></i>
     <span slot="title">粉丝管理</span>
 <el-menu-item index="/home/picture">图文数据</el-menu-item>
 <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
 <el-menu-item index="/home/fanspicture">粉丝画像</el-menu-item>
 <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
 </el-submenu>

 <el-menu-item index="/home/userCenter">
      <i class="el-icon-s-custom"></i>
      <span slot="title">账户信息</span>
 </el-menu-item>
</el-menu>

</div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      isCollapse: false,
      bigimg: require('../../assets/img/logo_admin.png'),
      smallimg: require('../../assets/img/toutiao.png')
    }
  },
  created () {
    eventBus.$on('changecollapse', () => {
      this.isCollapse = !this.isCollapse
    })
  }
}
</script>

<style lang='less' scoped >

.layout-aside{
           width: 220px;
           height:100vh;
           background-color: #353b4e;

       .el-menu{
             border-right: none;
             margin-top: 10px;
       }
      .logo{
           background: #2e2f32;

         img{
             height: 35px;

         }
      }
}
</style>
