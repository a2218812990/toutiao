<template>
<div class="back">
<el-card class="logincard">
    <div class="logo">
<img src="../../assets/img/logo_index.png" alt="">
</div>
    <el-form ref='myform' :model="rulesForm" :rules="rules">
        <el-form-item   prop="mobile">
          <el-input v-model='rulesForm.mobile' placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input v-model='rulesForm.code' class="ipt" placeholder="请输入验证码"></el-input><el-button style="float:right" plain >发送验证码</el-button>
        </el-form-item>
        <el-form-item  prop='agreement'>
        <el-checkbox v-model='rulesForm.agreement'>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
         <el-form-item>
            <el-button @click=" submitForm" style="width:100%;height:40px;" type="primary">登录</el-button>
        </el-form-item>
     </el-form>
</el-card>
</div>
</template>

<script>
export default {
  data () {
    var validator = (rule, value, callBack) => {
      value ? callBack() : callBack(new Error('您必须同意，不然就滚蛋'))
    }
    return {
      rulesForm: {
        mobile: '',
        code: '',
        agreement: false
      },
      rules: {
        mobile: [{ required: true, message: '手机号不能为空' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法手机号' }],
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /^\d{6}$/, message: '验证码数字长度为6位' }],
        agreement: [{ validator }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.myform.validate((value) => {
        if (value) {
          this.$axios.post('/authorizations', this.rulesForm).then(res => {
            //  then中只接受正确时返回的数据
            localStorage.setItem('user-token', res.data.data.token)
            // 将token存储到本地,再跳转到主页（登录页面）
            this.$router.push('/home')
          }).catch(() => {
            // catch中只接受错误时elementui中有一个提示信息插件
            this.$message({
              type: 'warning',
              message: '手机号或验证码错误'

            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>

.back{
     background-image:url('../../assets/img/back.jpg');
     height:100vh;
     background-size: cover;
     display: flex;
     justify-content: center;
     align-items: center;
     .logincard{
           width: 450px;
           height: 320px;
        .logo{
               text-align: center;
               margin-bottom: 20px;
               img{
                   height: 35px;
               }
           }

     }
     .ipt{
        width: 70%;
     }
}
</style>
