<template>
<el-breadcrumb separator=">">
    <el-breadceumb-item to='/home'>首页</el-breadceumb-item>
    <el-breadceumb-item>
        <slot name='title'> </slot>
    </el-breadceumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
