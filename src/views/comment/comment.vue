<template>
<el-card>
  <!-- 头部导航部分：卡片组件可以分成头和body部分，要当头的加一个 slot="header"   -->
<breadcrumb  slot="header">
<template slot="title">
  评论管理
</template>
</breadcrumb>
<!-- body部分 -->
<el-table>
 <el-table-column label='标题' width='600'></el-table-column>
 <el-table-column label='评论状态'></el-table-column>
 <el-table-column label='总评论数'></el-table-column>
 <el-table-column label='粉丝评论数'></el-table-column>
 <el-table-column label='操作'></el-table-column>
</el-table>

</el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
