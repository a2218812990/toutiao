<template>
<div class="cover">
    <!-- 封面组件有多少个div取决于images的数组长度 -->

    <div @click="opendialog(index)" class="cover-images" v-for="(item,index) in list" :key="index">
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog  :visible="dialogVisible" @close="closedialog">
      <addCoverImg @selectoneimg="getimg"></addCoverImg>
    </el-dialog>
</div>
</template>

<script>
export default {
  props: ['list'],
  getindex: -1,
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  methods: {
    // 子传父接受改变img的url
    getimg (url) {
      //  props过来的数据只能读取，不能修改，所以这里不能直接改，要再传到爷爷组件
      this.$emit('selecttwoimg', url, this.getindex)
      this.closedialog()
    },
    opendialog (index) {
      this.dialogVisible = true
      this.getindex = index
    },
    closedialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>

.cover{
    margin:30px 100px;
    display: flex;
    .cover-images{
        border: 1px solid #CCC;
        width:250px;
        height: 250px;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
