<template>
  <div class="order">
    <h1>基本信息</h1>
    <p>开票状态：<span>{{stateList[data.status]}}</span>
    </p>
    <p>申请用户：<span>{{data.passengerinfo.name || data.passengerinfo.nickname}}</span></p>
    <p>申请开票时间：<span>￥{{data.creat_time}}</span></p>
    <p>包含订单号：<span>{{data.order | orderListFormat}}</span></p>

    <h1>发票信息</h1>
    <p>开票金额:<span>￥{{data.total}}</span></p>
    <p>发票抬头:<span>{{data.header}}</span></p>
    <p>纳税人识别号:<span>{{data.taxpayer_number}}</span></p>
    <p>收件人：<span>{{data.recipients}}</span></p>
    <p>联系手机：<span>{{data.mobile}}</span></p>
    <p>收货地址：<span>{{data.address}}</span></p>

    <h1>开寄送信息</h1>
    <div v-if="data.status == '0'"">
      <p style="padding:10px 0;">
        物流公司：
        <el-input v-model="carriers" style="width:200px;"></el-input>
      </p>
      <p style="padding:10px 0;">
        物流单号：
        <el-input v-model="logistics" style="width:200px;"></el-input>
      </p>
      <el-button type="primary" @click="kaipiaoConfirm">确认开票</el-button>
    </div>

    <div v-if="data.status == '1'"">
      <p>物流公司：<span>{{data.carriers}}</span></p>
      <p>物流单号：<span>{{data.logistics}}</span></p>
    </div>

    <div v-if="data.status == '1'">
      <h1>操作信息</h1>
      <p>操作人：<span>{{data.oadmin.adminname}}</span></p>
      <p>开票时间：<span>{{data.finish_time}}</span></p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "invoiceDetail",
    filters:{
      tabFormat(list){
        if(!list) return '无标签';
        var tabList = [];
        for(var i in list) tabList.push(list[i].title);
        return tablist.join(' ');
      },
      orderListFormat(list){
        if(!list) return;
        var orderList = [];
        for(var i in list) orderList.push(list[i].order_sn);
        return orderList.join();
      }
    },
    data() {
      return {
        data:{
          passengerinfo:{}
        },
        stateList:['未开票', '已开票'],
        carriers:'',
        logistics:''
      }
    },
    methods: {
      kaipiaoConfirm(){
        if (this.carriers == "") {
          this.$message({
            type: "warning",
            message: "请输入物流公司"
          });
        } else if (this.logistics == "") {
          this.$message({
            type: "warning",
            message: "请输入物流单号"
          });
        } else {
          let _this = this;
          _this.postFetch( "/admin/invoice/logistics", {inv_id: this.$route.params.id, carriers: _this.carriers, logistics: _this.logistics },
            function (data) {
              if (data.error_code == 1) {
                _this.$message({
                  type: "warning",
                  message: "" + data.error_msg + ""
                });
              } else {
                _this.$message({
                  type: 'success',
                  message: '' + data.error_msg + ''
                });
              }
            }
          );
        }
      },
      getData(){
        let _this = this;
        this.postFetch('/admin/invoice/detail', {
          inv_id: this.$route.params.id
        }, function (data) {
          data = data.data;
          _this.data = data;
          console.log(data)
        })
      }
    },
    created(){
      let _this = this;
      _this.getData();
    }
  }
</script>
<style>
  .order h1{
    margin:40px 0 20px;
  }
  @import "../../../static/css/order/order.css";
</style>
