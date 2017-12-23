<template>
  <div style="width: 50%;float: left;color:#aa0000;font-size:20px">
  <span v-show="routerData == 'sectionOne'">订单管理</span>
    <span v-show="routerData == 'index'">主页</span>
    <span v-show="routerData == 'order'">订单详情</span>
    <span v-show="routerData == 'vipDetail'">会员详情</span>
    <span v-show="routerData == 'vip'">会员管理</span>
    <span v-show="routerData == 'sort'">分类管理</span>
    <span v-show="routerData == 'power'">权限管理</span>
    <span v-show="routerData == 'addadmin'">添加管理员</span>
    <span v-show="routerData == 'adminTeam'">管理员组</span>
    <span v-show="routerData == 'addTeam'">添加管理组</span>
    <span v-show="routerData == 'hot'">热搜管理</span>
    <span v-show="routerData == 'addHot'">添加热搜</span>
    <span v-show="routerData == 'edition'">版本管理</span>
    <span v-show="routerData == 'feedback'">服务反馈表单</span>
    <span v-show="routerData == 'startImg'">启动图管理</span>
    <span v-show="routerData == 'manageInfo'">资讯管理</span>
    <span v-show="routerData == 'addConsult'">添加资讯</span>
    <span v-show="routerData == 'infoClass'">资讯分类管理</span>
    <span v-show="routerData == 'addClass'">资讯分类添加</span>
    <span v-show="routerData == 'adimg'">广告图片管理</span>
    <span v-show="routerData == 'addimg'">广告图片添加</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        commList:'commList'
      }
    },
    computed:{
      routerData(){
        return this.$route.name
      }
    },
    watch:{

    }
  }
</script>
<style>
</style>
