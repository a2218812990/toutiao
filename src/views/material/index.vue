<template>
<el-card v-loading="loading">
    <!-- 头部 -->
<breadcrumb slot="header">
<template slot="title">
    素材管理
</template>
</breadcrumb>
<!-- 主体 -->
<el-row type="flex" justify="end">
<el-upload action="" :http-request="uploadfile" :show-file-list="false">
    <el-button size="small" type="primary">发布图片</el-button>
</el-upload>
</el-row>
<el-tabs v-model="activeName" type="card" @tab-click="tabclick">
 <el-tab-pane label="全部图片" name="all">
     <div class="photo" >
       <el-card v-for="item in list" :key="item.id" class="card">
          <img :src="item.url" alt="">
          <el-row class="icon" type="flex" align='middle' justify="space-around">
              <i class="el-icon-delete-solid"></i>
                <i class="el-icon-star-on"></i>
          </el-row>
       </el-card>
     </div>
     </el-tab-pane>
    <el-tab-pane label="收藏图片" name="collect">
        <div class="photo" >
       <el-card v-for="item in list" :key="item.id" class="card">
          <img :src="item.url" alt="">
       </el-card>
     </div>
        </el-tab-pane>
</el-tabs>
<el-row type="flex" justify="center">
<el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size="page.pagesize"
  :current-page="page.currentpage"
  @current-change='cliclkpage'
  >
</el-pagination>
</el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        pagesize: 8,
        currentpage: 1
      },
      loading: false

    }
  },
  methods: {
    //   文件上传事件
    uploadfile (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({ url: '/user/images', method: 'post', data }).then(res => {
        this.loading = false
        this.getphoto()
      })
    },
    //  点击翻页事件
    cliclkpage (newPage) {
      this.page.currentpage = newPage
      this.getphoto()
    },
    //   收藏和全部切换事件
    tabclick () {
      this.page.currentpage = 1
      this.getphoto()
    },
    getphoto () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentpage, per_page: this.page.pagesize }
      }).then(res => {
        this.page.total = res.data.total_count
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getphoto()
  }
}
</script>

<style lang='less' scoped>
.photo{
    display: flex;
    flex-wrap: wrap;

    // justify-content: space-between;

    .card{
        width: 200px;
        height:220px;
        margin: 20px 50px;
        position: relative;
       img{
           width: 100%;
           height: 100%;

       }
       .icon{
           width: 100%;
           height: 36px;
           position: absolute;
           left:0;
           bottom: 0;
           font-size: 22px;
           background-color:#f4f5f6;
           line-height: 30px;

    }
    }

}
</style>
