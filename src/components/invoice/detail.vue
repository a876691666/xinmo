<template>
  <div class="order">
    <h1>基本信息</h1>
    <p>订单当前状态：<span>{{data.status}}</span>
    </p>
    <p>订单号：<span>{{data.order_sn}}</span></p>
    <p>订单费用：<span>￥{{data.cost}}</span></p>
    <p>行驶距离：<span>{{data.driving_distance}}</span></p>
    <p>行驶时长：<span>{{data.driving_time}}</span></p>
    <p>下单时间：<span>{{data.create_time}}</span></p>
    <p>完成时间：<span>{{data.finish_time}}</span></p>
    <p>支付时间：<span>{{data.pay_time}}</span></p>
    <p>支付方式：<span>{{data.paytype}}</span></p>
    <p>是否开票：<span>{{data.is_invoice}}</span></p>
    <p>司机被投诉：<span>{{data.complaint == '0' ? '否' : '是'}}</span></p>

    <!-- <h1>出行信息</h1>
    <p>预约上车地址：<span></span></p>
    <p>经度：<span></span></p>
    <p>纬度：<span></span></p>
    <br />
    <p>预约下车地址：<span></span></p>
    <p>经度：<span></span></p>
    <p>纬度：<span></span></p>

    <h1>出行轨迹</h1>
    <p></p> -->

    <h1>乘客信息</h1>
    <p>乘客姓名：<span>{{data.passenger}}</span></p>
    <p>评分：<span>{{data.passenger_score || '无评分'}}</span></p>
    <p>标签：<span>{{data.passenger_label | tabFormat}}</span></p>

    <h1>司机信息</h1>
    <p>司机姓名：<span>{{data.driver}}</span></p>
    <p>评分：<span>{{data.driver_score || '无评分'}}</span></p>
    <p>标签：<span>{{data.driver_label | tabFormat}}</span></p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "order",
    filters:{
      tabFormat(list){
        if(!list) return '无标签';
        var tabList = [];
        for(var i in list) tabList.push(list[i].title);
        return tablist.join(' ');
      }
    },
    data() {
      return {
        data:{

        }
      }
    },
    methods: {
      yikai(){
        let _this = this;
        _this.postFetch('/admin/invoice/detail',{
          inv_id:_this.$route.params.id
        },function(data){
          if (data.error_code == 0){
            _this.getData();
          }else {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          }
        })
      },
      deliver(){

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
    computed:{
      wuliuLink(){
        return `http://www.baidu.com/s?wd=${this.express.freight_code}&cl=3`
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
</style>
