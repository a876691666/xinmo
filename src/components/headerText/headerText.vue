<template>
  <div style="width: 50%;float: left;color:#aa0000;font-size:20px">
    <span v-show="routerData == 'index'">主页</span>
    <span v-show="routerData == 'orderList'">订单管理</span>
    <span v-show="routerData == 'orderDetail'">订单详情</span>
    <span v-show="routerData == 'invoiceList'">发票管理</span>
    <span v-show="routerData == 'invoiceDetail'">发票详情</span>
    <span v-show="routerData == 'salaryList'">司机工资结算</span>
    <span v-show="routerData == 'salaryDetail'">工资详情</span>
    <span v-show="routerData == 'userList'">乘客会员列表</span>
    <span v-show="routerData == 'driverList'">司机会员列表</span>
    <span v-show="routerData == 'driverDetail'">司机会员详情</span>
    <span v-show="routerData == 'messageList'">资讯列表</span>
    <span v-show="routerData == 'messageEdit'">资讯详情</span>
    <span v-show="routerData == 'messageAdd'">添加资讯</span>
    <span v-show="routerData == 'sort'">分类管理</span>
    <span v-show="routerData == 'power'">权限管理</span>
    <span v-show="routerData == 'addadmin'">添加管理员</span>
    <span v-show="routerData == 'editadmin'">编辑管理员</span>
    <span v-show="routerData == 'adminTeam'">管理员组</span>
    <span v-show="routerData == 'addTeam'">添加管理组</span>
    <span v-show="routerData == 'editTeam'">编辑管理组</span>
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
