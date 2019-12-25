<template>
<el-card>
<breadcrumb slot="header">
<template slot="title">
文章列表
</template>
</breadcrumb>
<!-- 头部 -->
<!-- 主体 -->
<el-form  class="forms">
  <el-form-item  label="文章状态:">
  <el-radio-group v-model="searfrom.radio" @change="changegrt">
      <el-radio :label="5">全部</el-radio>
       <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item  label="频道列表:">
<el-select placeholder="请选择频道" v-model="searfrom.channel_id" @change="changegrt">
 <el-option v-for="item in channels" :key="item.id" :label="item.name"
      :value="item.id">
    </el-option>
</el-select>
  </el-form-item>
  <el-form-item  label="时间选择:">
  <el-date-picker
      v-model="searfrom.value1"
      type="daterange"
      value-format="yyyy-MM-dd"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
     @change="changegrt"
      >
    </el-date-picker>
  </el-form-item>
</el-form>
<div class="title">
    共找到{{page.total}}条符合条件的内容
</div>
<div class="list" v-for="item in list" :key='item.id.toString()' >
   <div class="leftimg">
     <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
     <div class="info">
       <span>{{item.title}}</span>
       <el-tag :type="item.status | filterscolor"   class='tag'>{{item.status | status }}</el-tag>
       <span class="time">{{item.pubdate}}</span>
   </div>
      </div>
   <div class="right">
       <span><i class="el-icon-edit"></i>修改</span>
       <span @click="deletes(item.id)"><i class="el-icon-delete"></i>删除</span>
   </div>
</div>
<el-row type="flex" justify="center">
<el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size="page. pagesize"
  :current-page="page.currentpage"
  @current-change="pagechange"
  >
</el-pagination>
</el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      searfrom: {
        radio: 5,
        channel_id: null,
        value1: []
      },
      list: [],
      channels: [],
      defaultImg: require('../../assets/img/tx.jpg'),
      page: {
        total: 0,
        pagesize: 10,
        currentpage: 1
      }
    }
  },
  methods: {
    // 分页功能
    pagechange (newpage) {
      this.page.currentpage = newpage
      this.methodchange()
    },
    // 重复代码封装
    methodchange () {
      let params = {
        page: this.page.currentpage,
        per_page: this.page.pagesize,
        status: this.searfrom.radio === 5 ? null : this.searfrom.radio,
        channel_id: this.searfrom.channel_id,
        begin_pubdate: this.searfrom.value1.length ? this.searfrom.value1[0] : null,
        end_pubdate: this.searfrom.value1.length > 1 ? this.searfrom.value1[1] : null

      }
      this.getdata(params)
    },
    // 文章删除功能
    deletes (id) {
      this.$confirm('您确定要删除这篇文章吗？').then(() => {
        this.$axios({ url: `/articles/${id.toString()}`, method: 'delete' }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.changegrt()
        })
      })
    },
    // 文章筛选功能
    changegrt () {
      this.page.currentpage = 1
      this.methodchange()
    },
    // 获取文章数据
    getdata (params) {
      this.$axios({ url: '/articles', params }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 获取频道
    getchannels () {
      this.$axios({ url: '/channels' }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  filters: {
    status (value) {
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterscolor (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  created () {
    this.getdata({ page: 1, per_page: 10 })
    this.getchannels()
  }
}
</script>

<style lang="less" scoped>
.forms{
    margin-left:50px;
    border-bottom: 1px dashed #ccc

}
.title{
    margin: 20px 0;
    height: 60px;
    font-size: 14px;
    line-height:60px;
    border-bottom: 1px dashed #ccc;
    color:#323745
}
.list{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 20px;
    .leftimg{
          display: flex;
         img{
             width:140px;
             height: 100px;
         }

         }
         .info{
         display: flex;
         flex-direction:column;
         margin-left: 10px;
         height: 105px;
        justify-content: space-between;
           .time{
               font-size: 14px;
           }
         .tag{
            width:60px;
            text-align: center;
         }

    }
    .right{
       span{
        font-size: 14px;
        margin-right:8px;
        cursor: pointer;

    }
    }
}
</style>
