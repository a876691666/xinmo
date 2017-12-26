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

// 会员管理
import vip from '@/components/vip/vip'
import vipDetail from '@/components/vip/vipDetail'

// 权限管理
import power from '@/components/power/power'
import addadmin from '@/components/power/addadmin'
import adminTeam from '@/components/power/adminTeam'
import addTeam from '@/components/power/addTeam'

// 其他管理
import hot from '@/components/others/hot'
import addHot from '@/components/others/addHot'
import edition from '@/components/others/edition'
import feedback from '@/components/others/feedback'
import startImg from '@/components/others/startImg'

// 内容管理
import manageInfo from '@/components/manageInfo/manageInfo'
import addConsult from '@/components/manageInfo/addConsult'
import infoClass from '@/components/manageInfo/infoClass'
import addClass from '@/components/manageInfo/addClass'
import adimg from '@/components/manageInfo/adimg'
import addimg from '@/components/manageInfo/addimg'

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
      path: '/vip/:id',
      name: 'vip',
      component: vip
    },
    {
      path: '/vipDetail/:id',
      name: 'vipDetail',
      component: vipDetail
    },
    {
      path: '/manageInfo/:id',
      name: 'manageInfo',
      component: manageInfo
    },
    {
      path: '/addConsult/:id',
      name: 'addConsult',
      component: addConsult
    },
    {
      path: '/infoClass',
      name: 'infoClass',
      component: infoClass
    },
    {
      path: '/addClass/:id',
      name: 'addClass',
      component: addClass
    },
     {
      path: '/hot',
      name: 'hot',
      component: hot
    },
    {
      path: '/adimg',
      name: 'adimg',
      component: adimg
    },
    {
      path: '/addimg/:id',
      name: 'addimg',
      component: addimg
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
      path: '/addHot/:id',
      name: 'addHot',
      component: addHot
    },
    {
      path: '/edition',
      name: 'edition',
      component: edition
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/startImg',
      name: 'startImg',
      component: startImg
    },
    {
      path: '*',
      component:index
    }
  ]
})
