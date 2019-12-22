<template>
<el-card>
  <!-- 头部导航部分：卡片组件可以分成头和body部分，要当头的加一个 slot="header"   -->
<breadcrumb  slot="header">
<template slot="title">
  评论管理
</template>
</breadcrumb>
<!-- body部分 -->
<el-table  v-loading="loading" :data="list">
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
<!-- 分页插件 -->
<el-row style="height:80px" type="flex" justify="center" align="middle">
<el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size='page.pagesize'
  :current-page="page.currentpage"
  @current-change='clickPage'
  >
</el-pagination>
</el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        total: 0, // 一共多少条
        currentpage: 1, // 当前的页数
        pagesize: 10 // 每页显示多少个数
      }

    }
  },
  methods: {
  //  点击翻页事件
    clickPage (newPage) {
      this.page.currentpage = newPage
      this.commentlist()
    },
    // 获取文章信息
    commentlist () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentpage, per_page: this.page.pagesize } }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
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
