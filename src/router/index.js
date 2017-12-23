import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import sectionOne from '@/components/sectionOne/sectionOne'
import order from '@/components/order/order'
import dfh from '@/components/order/dfh'
import sh from '@/components/order/sh'
import shxq from '@/components/order/shxq'
import vip from '@/components/vip/vip'
import vipDetail from '@/components/vip/vipDetail'
import cssCommon from '@/components/cssCommon/cssCommon'
import hot from '@/components/others/hot'
import addMerchant from '@/components/merchant/addMerchant'
import power from '@/components/power/power'
import addadmin from '@/components/power/addadmin'
import adminTeam from '@/components/power/adminTeam'
import addTeam from '@/components/power/addTeam'
import addHot from '@/components/others/addHot'
import edition from '@/components/others/edition'
import feedback from '@/components/others/feedback'
import startImg from '@/components/others/startImg'
import manageInfo from '@/components/manageInfo/manageInfo'
import addConsult from '@/components/manageInfo/addConsult'
import infoClass from '@/components/manageInfo/infoClass'
import addClass from '@/components/manageInfo/addClass'
import adimg from '@/components/manageInfo/adimg'
import addimg from '@/components/manageInfo/addimg'
import commentGoods from '@/components/comment/commentGoods'
import commentInfo from '@/components/comment/commentInfo'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/sectionOne/:oper/:value',
      name: 'sectionOne',
      component: sectionOne
    },
    {
      path: '/order/:id',
      name: 'order',
      component: order
    },
    {
      path: '/dfh',
      name: 'dfh',
      component: dfh
    },
    {
      path: '/sh',
      name: 'sh',
      component: sh
    },
    {
      path: '/shxq/:id',
      name: 'shxq',
      component: shxq
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
      path: '/cssCommon',
      name: 'cssCommon',
      component: cssCommon
    },
     {
      path: '/hot',
      name: 'hot',
      component: hot
    },
    {
      path: '/addMerchant/:id/:oper',
      name: 'addMerchant',
      component: addMerchant
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
      path: '/addadmin/:id',
      name: 'addadmin',
      component: addadmin
    },
    {
      path: '/adminTeam',
      name: 'adminTeam',
      component: adminTeam
    },
    {
      path: '/addTeam/:id',
      name: 'addTeam',
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
