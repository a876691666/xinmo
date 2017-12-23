<template>
  <div>
    <p class="pp"><span class="lab">创建时间:</span>{{created_at | formatDate}}</p>
    <p class="pp"><span class="lab">最后登录时间:</span>{{login_time | formatDate}}</p>
    <p class="pp"><span class="lab">是否接受通知:</span>{{(msg_off == 0)?'接受':'不接收'}}</p>
    <p class="pp"><span class="lab">G币余额:</span>{{xjye}}</p>
    <p class="pp"><span class="lab">消费金额:</span>{{xfje}}</p>
    <p class="pp"><span class="lab">用户名称:</span>{{user_name}}</p>
    <p class="pp"><span class="lab">登录名:</span>{{login_name}}</p>
    <p class="pp"><span class="lab">现金消费:</span>{{xxfje}}</p>
    <p class="pp"><span class="lab">G币消费:</span>{{gxfje}}</p>
    <p class="pp"><span class="lab">状态:</span><el-button type="text" @click="statusChange(status)">{{(status == 1)?'可用':'停用'}}</el-button></p>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default{
    name:'vipDetail',
    data(){
      return{
        created_at:'',   // 创建时间
        login_time:'',  // 最后登录时间
        msg_off:'',     // 接受通知
        avatar:'',      // 头像地址
        xjye:'',        //G币余额
        xfje:'',        // 消费金额
        user_name:'',   //用户名称
        login_name:'',  //登录名
        status:'',   // 状态
        xxfje:'', // 现金消费
        gxfje:'',//G 币消费
      }
    },
    created(){
      let _this = this;
      _this.postFetch('/admin/user/detail',{user_id:_this.$route.params.id},function(data){
        console.log(data);
        _this.created_at = data.data.created_at;
        _this.login_time = data.data.login_time;
        _this.msg_off = data.data.msg_off;
        _this.avatar = data.data.avatar;
        _this.xjye = data.data.xjye;
        _this.xfje = data.data.xfje;
        _this.user_name = data.data.user_name;
        _this.login_name = data.data.login_name;
        _this.status = data.data.status;
        _this.xxfje = data.data.xxfje;
        _this.gxfje = data.data.gxfje;
      })
    },filters: {
      formatDate(time) {
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods:{
      statusChange(s){
        let _ts = this;
        let obj = {
          user_id:_ts.$route.params.id,
          type:(s == 1)?0:1
        };
        _ts.postFetch('/admin/user/changeType',obj,function(data){
          console.log(data);
          if (data.error_code == 0){
            _ts.status = (s == 1)?0:1;
          }
        })
      },
      gonew(){
        let _ts = this;
//        /api/getGcoin
        _ts.postFetch('/api/getGcoin',{},function(data){
          console.log(data);
          if (data.error_code == 0){
          }
        })
      }
    }
  }
</script>
<style>
.pp{
  margin-top: 5px;
}
.lab{
  display: inline-block;
  width: 120px;
  text-align: left;
  margin-right: 5px;
}
</style>
