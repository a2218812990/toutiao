<template>
  <el-card>
     <breadcrumb slot='header'>
        <template slot="title">
         账户信息
        </template>
     </breadcrumb>
       <!-- 主体内容 -->
       <el-form  ref="myform" :model="formdata" :rules="rules"  label-width="100px">
           <el-form-item prop="name" style="width:40%" label="用户名">
               <el-input v-model="formdata.name"></el-input>
           </el-form-item>
           <el-form-item style="width:40%" label="简介">
                <el-input v-model="formdata.intro"></el-input>
           </el-form-item>
           <el-form-item prop="email" style="width:40%" label="邮箱">
                <el-input  v-model="formdata.email" ></el-input>
           </el-form-item>
           <el-form-item style="width:40%" label="手机号">
                <el-input v-model="formdata.mobile" disabled=""></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type='primary' @click="saveinfo">保存信息</el-button>
           </el-form-item>
       </el-form>
       <!-- 右边图像上传 -->
       <el-upload action="" class="upimg" :show-file-list="false" :http-request="uploadimg">
           <img :src="formdata.photo?formdata.photo: defaultimg" alt="">
       </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        name: '',
        email: '',
        intro: '',
        mobile: '',
        photo: ''
      },
      defaultimg: require('../../assets/img/tx.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, { max: 6, min: 2, message: '用户名在2到6个字符之间' }],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    //   上传图片
    uploadimg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'PATCH',
        data
      }).then(res => { this.formdata.photo = res.data.photo })
    },
    //   手动校验
    saveinfo () {
      this.$refs.myform.validate().then(res => {
        //   如果校验成功就调用修改用户信息的接口
        this.$axios({ url: '/user/profile', data: this.formdata, method: 'patch' }).then(res => {
          this.$message({ type: 'success', message: '保存成功' })
        })
      })
    },
    //   获取用户信息
    getuserinfo () {
      this.$axios({ url: '/user/profile' }).then(res => {
        this.formdata = res.data
      })
    }
  },
  created () {
    this.getuserinfo()
  }
}
</script>

<style lang='less' scoped>
    .upimg{
        position: absolute;
        right: 450px;
        top:150px;
        img{
            width: 180px;
            height: 180px;
            border-radius: 50%;
            border: 1px dashed #ccc
        }
    }

</style>
