<template>
<el-row class="container" type="flex" align="middle">
  <el-col :span="12">
      <i @click="changeicon" :class="{'el-icon-s-fold': collapse,'el-icon-s-unfold':!collapse}"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
   <el-col :span="12">
       <el-row type="flex" justify="end" class="rigth">
           <div class="photo"><img :src="resultinfo.photo ? resultinfo.photo :  photourl" alt=""></div>
     <el-dropdown @command="clickmenu">
            <span>{{resultinfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item command="info">个人信息</el-dropdown-item>
                 <el-dropdown-item command="git">git地址</el-dropdown-item>
                 <el-dropdown-item command="quite">退出</el-dropdown-item>
             </el-dropdown-menu >
     </el-dropdown>
       </el-row>
   </el-col>
</el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      resultinfo: {},
      photourl: require('../../assets/img/tx.jpg'),
      collapse: false

    }
  },
  created () {
    this.getinfo()
    eventBus.$on('uploadimg', () => {
      this.getinfo()
    })
  },
  methods: {
    // 折叠导航栏和改变图标方向
    changeicon () {
      this.collapse = !this.collapse // 要么折叠要么展开
      eventBus.$emit('changecollapse')
    },
    clickmenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/90heimatoutiao'
      } else {
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    getinfo () {
      this.$axios({ url: '/user/profile' }).then(res => {
        this.resultinfo = res.data
      })
    }

  }
}
</script>

<style lang='less' scoped>
.container{
    height: 60px;
    font-size: 15px;
    .rigth{
        span{
            margin-left: 8px;
        }
.photo{

  img{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  }
}
}
}
</style>
