<template>
 <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="素材库" name="material">
        <div class="photolist">
          <el-card v-for="item in list" :key="item.id" class="card">
              <img @click="selectimg(item.url)" :src="item.url" alt="">
          </el-card>
        </div>
        <!-- 分页插件放置 -->
        <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="getpage">
       </el-pagination>
       </el-row>
        </el-tab-pane>

    <el-tab-pane label="上传图片" name="upload">
      <el-upload  action="" :http-request="uploadimg" :show-file-list="false" class="uploads" >
         <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>
    <!-- 放上组件 点击图片 =>弹层 =>放置一个组件 => 组件 => tab页 => 素材 /上传 -->
<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }

    }
  },
  methods: {
    //  上传图片
    uploadimg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({ url: '/user/images', method: 'post', data }).then(res => {
        this.$emit('selectoneimg', res.data.url)
      })
    },

    //   点击选择图片
    selectimg (url) {
      this.$emit('selectoneimg', url)
    },

    //   翻页功能
    getpage (newpage) {
      this.page.currentPage = newpage
      this.getmaterial()
    },
    //   获取素材
    getmaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }

  },
  created () {
    this.getmaterial()
  }
}
</script>

<style lang="less" scoped>
.photolist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .card{
          width: 150px;
          height: 150px;
          margin: 20px 0px;
          img{
              width: 100%;
              height: 100%;
          }
    }

}
 .uploads{
      display: flex;
      justify-content: center;
          i{
             font-size: 50px;
             padding: 50px;
             border: 1px dashed #ccc;
          }
    }
</style>
