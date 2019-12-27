<template>
    <el-card>
        <!-- 头部导航 -->
       <breadcrumb slot='header'>
       <template slot="title">
             发布文章
       </template>
       </breadcrumb>
     <!-- 主体部分 -->
      <el-form class="myfrom" label-width="100px" :model="formdata" :rules="formrules" ref="myform">
          <el-form-item label="标题" style="width:60%" prop="title">
              <el-input v-model="formdata.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
                <el-input type="textarea" :rows="4" v-model="formdata.content"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
              <el-radio-group v-model="formdata.cover.type">
                   <!-- // 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
  </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
           <el-select  placeholder="请选择" v-model="formdata.channel_id">
             <el-option v-for="item  in  channels" :key="item.id"  :label="item.name"
      :value="item.id">
             </el-option>
  </el-select>
          </el-form-item>
           <el-form-item>
               <el-button @click="publishArticle()" type='primary'>发表</el-button>
               <el-button @click="publishArticle(true)">存入草稿</el-button>
           </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],

      formdata: {// 校验表单要绑定给表单
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null

      },
      //   校验规则也要绑定给表单
      formrules: {
        title: [{ required: true, message: '文章标题不能为空' }, { min: 5, max: 30, message: '文字长度在5到30字之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      // 这个方法是监听路由的变化，并作出相应的反应
      if (to.params.id) {

      } else {
        //  这是发布不带id的url
        this.formdata = {// 校验表单要绑定给表单
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null

        }
      }
    }
  },

  methods: {

    //   获取频道数据
    getchannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    //   手动校验表单数据
    publishArticle (draft) {
      this.$refs.myform.validate(isOk => {
        if (isOk) {
        //   手动验证通过的话，调用发布文章的接口或者修改接口，用判断的方式，为了简写用三元表达式
          let{ id } = this.$route.params
          this.$axios({
            url: id ? `/articles/${id}` : 'articles',
            method: id ? 'put' : 'post',
            params: { draft },
            data: this.formdata
          }).then(res => {
            //    发布完成后要跳转到文章列表
            this.$message({ type: 'success', message: '操作成功' })
            this.$router.push('/home/articles')
          })
        }
      })
    },

    //   获取文章数据，修改和发布共用，为了区分通过获取pamars中是否有id来进行操作
    getarticleinfo () {
      let { id } = this.$route.params
      if (id) {
        this.$axios({ url: `/articles/${id}`
        }).then(res => {
          this.formdata = res.data
        })
      }
    }
  },

  created () {
    this.getchannels()
    this.getarticleinfo()
  }
}
</script>

<style lang="less" scoped>

</style>
