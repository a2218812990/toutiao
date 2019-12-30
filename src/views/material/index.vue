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
       <el-card v-for="(item,index) in list" :key="item.id" class="card">
          <img :src="item.url" alt="" @click="previewimg(index)">
          <el-row class="icon" type="flex" align='middle' justify="space-around">
               <i class="el-icon-star-on" @click="collectphoto(item)" :style="{color:item.is_collected?'red':'#000'}"></i>
              <i  @click='deletephoto(item.id)' class="el-icon-delete-solid"></i>
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
<!-- 弹层显示 -->
<el-dialog :visible="dialogvisibale" @close='dialogvisibale=false' :open="openend">
  <!-- 走马灯 -->
  <el-carousel ref="mycarousel" indicator-position="outside"  height='400px'>
    <el-carousel-item v-for="item in list" :key="item.id">
      <img :src="item.url" alt="" style="width:100%;height:100%">
    </el-carousel-item>
  </el-carousel>
</el-dialog>

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
      loading: false,
      collect: true,
      dialogvisibale: false,
      clickindex: -1
    }
  },
  methods: {
    openend () {
      this.$refs.mycarousel.setActiveItem(this.clickindex)
    },
    // 点击打开弹层
    previewimg (index) {
      // dailog是懒加载，第一次没有弹出之前不能设置index
      this.dialogvisibale = true
      this.clickindex = index
    },
    //   收藏和取消收藏图片
    async collectphoto (target) {
      await this.$axios({
        url: `/user/images/${target.id}`,
        method: 'put',
        data: { collect: !target.is_collected } })
      this.getphoto()
    },
    // 删除图片素材
    async deletephoto (target) {
      await this.$confirm('你确定要删除这张图片吗？')
      await this.$axios({ url: `/user/images/${target}`, method: 'delete' })
      this.getphoto()
    },
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
    async getphoto () {
      let res = await this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentpage, per_page: this.page.pagesize }
      })
      this.page.total = res.data.total_count
      this.list = res.data.results
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
    i{
        cursor: pointer;
    }
    }

}
</style>
