<template>
    <el-card>
        <!-- 头部导航 -->
       <breadcrumb slot='header'>
       <template slot="title">
             发布文章
       </template>
       </breadcrumb>
     <!-- 主体部分 -->
      <el-form class="myfrom" label-width="100px">
          <el-form-item label="标题" style="width:60%">
              <el-input></el-input>
          </el-form-item>
          <el-form-item label="内容">
                <el-input type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="封面">
              <el-radio-group>
              <el-radio>单图</el-radio>
              <el-radio>三图</el-radio>
              <el-radio>无图</el-radio>
              <el-radio>自动</el-radio>
  </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
           <el-select  placeholder="请选择">
             <el-option v-for="item  in  channels" :key="item.id"  :label="item.name"
      :value="item.id">
             </el-option>
  </el-select>
          </el-form-item>
           <el-form-item>
               <el-button type='primary'>发表</el-button>
               <el-button>存入草稿</el-button>
           </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    getchannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getchannels()
  }
}
</script>

<style lang="less" scoped>

</style>
