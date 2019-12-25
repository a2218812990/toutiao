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
  <el-radio-group v-model="searfrom.radio">
      <el-radio :label="5">全部</el-radio>
       <el-radio :label="1">草稿</el-radio>
        <el-radio :label="2">待审核</el-radio>
        <el-radio :label="3">审核通过</el-radio>
        <el-radio :label="4">审核失败</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item  label="频道列表:">
<el-select placeholder="请选择频道" v-model="searfrom.channel_id">
 <el-option v-for="item in channels" :key="item.id" :label="item.name"
      :value="item.id">
    </el-option>
</el-select>
  </el-form-item>
  <el-form-item  label="时间选择:">
  <el-date-picker
      v-model="value1"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
</el-form>
<div class="title">
    共找到0条符合条件的内容
</div>
<div class="list" v-for="item in list" :key='item.id.toString()' >
   <div class="leftimg">
     <img :src="item.cover.images[0].length?item.cover.images[0]:defaultImg" alt="">
     <div class="info">
       <span>{{item.title}}</span>
       <el-tag :type="item.status | filterscolor"   class='tag'>{{item.status | status }}</el-tag>
       <span class="time">{{item.pubdate}}</span>
   </div>
      </div>
   <div class="right">
       <span><i class="el-icon-edit"></i>修改</span>
       <span><i class="el-icon-delete"></i>删除</span>
   </div>
</div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      searfrom: {
        radio: 5,
        channel_id: null
      },

      value1: '',
      list: [],
      channels: [],
      defaultImg: require('../../assets/img/tx.jpg')
    }
  },
  methods: {
    // 获取文章数据
    getdata () {
      this.$axios({ url: '/articles' }).then(res => {
        this.list = res.data.results
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
    this.getchannels()
    this.getdata()
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
    }
    }
}
</style>
