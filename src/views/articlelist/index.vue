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
  <el-radio-group v-model="radio">
      <el-radio :label="5">全部</el-radio>
       <el-radio :label="1">草稿</el-radio>
        <el-radio :label="2">待审核</el-radio>
        <el-radio :label="3">审核通过</el-radio>
        <el-radio :label="4">审核失败</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item  label="频道列表:">
<el-select placehoder="请选择频道">
 <el-option>
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
<div class="list">
   <div class="leftimg">
     <img src="../../assets/img/tx.jpg" alt="">
     <div class="info">
       <span>标题足够长就会报服务器数据库异常，但是又没有限制最大字数</span>
       <el-tag class='tag'>标签一</el-tag>
       <span class="time">2019-12-24 19:35:31</span>
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
      radio: 5,
      value1: ''
    }
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
