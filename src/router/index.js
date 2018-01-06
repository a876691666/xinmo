import Vue from 'vue'
import Router from 'vue-router'

// 主页
import index from '@/components/index/index'

// 订单管理
import orderList from '@/components/order/list'
import orderDetail from '@/components/order/detail'

// 发票管理
import invoiceList from '@/components/invoice/list'
import invoiceDetail from '@/components/invoice/detail'

// 司机工资
import salaryList from '@/components/salary/list'
import salaryDetail from '@/components/salary/detail'

// 资讯管理
import messageList from '@/components/message/list'
import messageDetail from '@/components/message/detail'

// 广告图管理
import bannerList from '@/components/banner/list'
import bannerDetail from '@/components/banner/detail'

// 分类管理
import drivercarList from '@/components/drivercar/list'
import drivercarDetail from '@/components/drivercar/detail'

// 会员管理
import userList from '@/components/user/list'

// 司机管理
import driverList from '@/components/driver/list'
import driverDetail from '@/components/driver/detail'

// 权限管理
import power from '@/components/power/power'
import addadmin from '@/components/power/addadmin'
import adminTeam from '@/components/power/adminTeam'
import addTeam from '@/components/power/addTeam'

// 其他管理
import version from '@/components/system/version'
import bootimg from '@/components/system/bootimg'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/orderList/:oper/:value',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/invoiceList/:oper/:value',
      name: 'invoiceList',
      component: invoiceList
    },
    {
      path: '/invoiceDetail/:id',
      name: 'invoiceDetail',
      component: invoiceDetail
    },
    {
      path: '/salaryList/:oper/:value',
      name: 'salaryList',
      component: salaryList
    },
    {
      path: '/salaryDetail/:id',
      name: 'salaryDetail',
      component: salaryDetail
    },
    {
      path: '/userList/:oper/:value',
      name: 'userList',
      component: userList
    },
    {
      path: '/driverList/:oper/:value',
      name: 'driverList',
      component: driverList
    },
    {
      path: '/driverDetail/:id/:type',
      name: 'driverDetail',
      component: driverDetail
    },
    {
      path: '/messageList/:oper/:value',
      name: 'messageList',
      component: messageList
    },
    {
      path: '/messageEdit/:id',
      name: 'messageEdit',
      component: messageDetail
    },
    {
      path: '/messageAdd',
      name: 'messageAdd',
      component: messageDetail
    },
    {
      path: '/bannerList',
      name: 'bannerList',
      component: bannerList
    },
    {
      path: '/bannerEdit/:id',
      name: 'bannerEdit',
      component: bannerDetail
    },
    {
      path: '/bannerAdd',
      name: 'bannerAdd',
      component: bannerDetail
    },
    {
      path: '/drivercarList',
      name: 'drivercarList',
      component: drivercarList
    },
    {
      path: '/drivercarEdit/:id/:t_id',
      name: 'drivercarEdit',
      component: drivercarDetail
    },
    {
      path: '/drivercarAdd',
      name: 'drivercarAdd',
      component: drivercarDetail
    },

     {
      path: '/version',
      name: 'version',
      component: version
    },
     {
      path: '/bootimg',
      name: 'bootimg',
      component: bootimg
    },

    {
      path: '/power',
      name: 'power',
      component: power
    },
    {
      path: '/addadmin',
      name: 'addadmin',
      component: addadmin
    },
    {
      path: '/editadmin/:id',
      name: 'editadmin',
      component: addadmin
    },
    {
      path: '/adminTeam',
      name: 'adminTeam',
      component: adminTeam
    },
    {
      path: '/addTeam/',
      name: 'addTeam',
      component: addTeam
    },
    {
      path: '/editTeam/:id',
      name: 'editTeam',
      component: addTeam
    },
    {
      path: '*',
      component:index
    }
  ]
})
