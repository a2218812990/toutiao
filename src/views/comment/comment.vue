<template>
<el-card>
  <!-- 头部导航部分：卡片组件可以分成头和body部分，要当头的加一个 slot="header"   -->
<breadcrumb  slot="header">
<template slot="title">
  评论管理
</template>
</breadcrumb>
<!-- body部分 -->
<el-table  :data="list">
 <el-table-column prop='title'  label='标题' width='600'></el-table-column>
 <el-table-column :formatter='formatter' prop='comment_status' label='评论状态'></el-table-column>
 <el-table-column prop='total_comment_count' label='总评论数'></el-table-column>
 <el-table-column prop='fans_comment_count' label='粉丝评论数'></el-table-column>
 <el-table-column label='操作'>
     <template slot-scope="obj">
      <el-button size='small' type='text'>修改</el-button>
      <el-button  @click='openorclose(obj.row)' size='small' type='text'>{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
     </template>
 </el-table-column>
</el-table>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    commentlist () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' } }).then(res => {
        this.list = res.data.results
      })
    },
    formatter (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    },
    openorclose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你确定要${mess}评论吗？`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } }).then(res => {
          this.commentlist()
        })
      })
    }
  },
  created () {
    this.commentlist()
  }

}
</script>

<style>

</style>
