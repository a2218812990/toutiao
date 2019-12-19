<template>
<div class="back">
<el-card class="logincard">
    <div class="logo">
<img src="../../assets/img/logo_index.png" alt="">
</div>
    <el-form ref='myform' :model="rulesForm" :rules="rules">
        <el-form-item   prop="PhoneNumber">
          <el-input v-model='rulesForm.PhoneNumber' placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop='IDCode'>
          <el-input v-model='rulesForm.IDCode' class="ipt" placeholder="请输入验证码"></el-input><el-button style="float:right" plain >发送验证码</el-button>
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
        PhoneNumber: '',
        IDCode: '',
        agreement: false
      },
      rules: {
        PhoneNumber: [{ required: true, message: '手机号不能为空' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法手机号' }],
        IDCode: [{ required: true, message: '验证码不能为空' }, { pattern: /^\d{6}$/, message: '验证码数字长度为6位' }],
        agreement: [{ validator }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.myform.validate((value) => {
        if (value) {
          alert('执行下面的东西')
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
