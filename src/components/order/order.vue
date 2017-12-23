<template>
  <div>
    <h1>基本信息</h1>
    <p style="margin-top:20px">订单当前状态：<span>{{stateList[gsState]}}</span>
    </p>
    <p>订单号：<span>{{order_sn}}</span></p>
    <p>购买用户：<span>{{user_name}}</span></p>
    <p>下单时间：<span>{{create_time}}</span></p>
    <p>支付时间：<span>{{pay_time}}</span></p>
    <p>支付方式：<span>{{pay_for}}</span></p>
    <h1 style="margin-top:20px">商品清单</h1>
    <el-table :data="goods" stripe
              style="width:80%;margin-top:10px;text-align:center">
      <el-table-column prop="goods_name" label="商品标题"
                       width="300"
                       align="center"></el-table-column>
      <el-table-column prop="spec" label="购买规格"
                       align="center"></el-table-column>
      <el-table-column prop="num" label="购买数量" width="80"
                       align="center"></el-table-column>
      <el-table-column prop="price" label="费用小计" width="80"
                       align="center"></el-table-column>
      <el-table-column label="退款状态"
                       align="center" width="150">
        <template scope="scope">
          <!--status-->
          <div v-if="scope.row.get_refund.length>0">
            <span @click="goDetail(scope.row.get_refund[scope.$index].order_goods_id)" class="shubiao">有退款</span>
          </div>
          <div v-if="scope.row.get_refund.length<=0">
            <span>无退款</span>
          </div>

          <!--{{scope.row.get_refund[scope.$index].status}}-->
        </template>
      </el-table-column>
    </el-table>
    <div class="fp">
      <p>费用总额：<span>￥{{total}}</span></p>
      <p>运费：<span>+￥{{freight}}</span></p>
      <p>退款金额合计：<span>-￥0.00</span></p>
      <p>订单最终费用：<span>￥{{final_total}}</span></p>
    </div>
    <h1 style="margin-top:20px">收货信息</h1>
    <p style="margin-top:20px">收货人：<span>{{shipping_address.consignee}}</span>
    </p>
    <p>收货手机：<span>{{shipping_address.mobile}}</span></p>
    <p>收货地址：<span>{{shipping_address.address}}</span></p>
    <div v-if="gsState === 2">
      <span>选择物流公司</span>
      <el-select v-model="wuliu" placeholder="请选择">
        <el-option
          v-for="item in wuliOp"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <br>
      <span>填写物流单号</span>
      <el-input v-model="wuliuNum" placeholder="请输入内容"
                style="width: 30%"  type="number"></el-input>
      <br>
      <el-button type="primary" @click="deliver">确认发货</el-button>
    </div>
    </el-form>
    <div v-if="haveExpress">
      <p>物流公司：<span>{{express.freight_name}}</span></p>
      <p>物流单号：<a
        :href="wuliuLink"
        target="_blank" style="text-decoration: underline;">{{express.freight_code}}</a>
      </p>
      <p>操作时间：<span>{{express.freight_time}}</span></p>
      <p>操作人：<span>{{express.admin_name}}</span></p>
    </div>
    <div v-if="haveInvoice">
      <h1 style="margin-top:20px">发票信息</h1>
      <p style="margin-top:20px">开票状态：<span>{{invoice.invoice_type == 1 ? '已开票' : '未开票'}}</span>
      </p>
      <p>开票类型：<span>普通发票</span></p>
      <p>发票抬头：<span>{{invoice.invoice_title}}</span></p>
      <p>税号：<span>{{invoice.invoice_number}}</span></p>
      <div>
        <p>操作时间：<span>{{invoice.invoice_time}}</span></p>
        <p>操作人：<span>{{invoice.admin_name}}</span></p>
      </div>
      <el-button type="primary" style="margin-top:28px" v-if="invoice.invoice_type == 0" @click="yikai">已开发票</el-button>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "order",
    data() {
      return {
        wuliu: '',
        wuliuNum:0,
        wuliOp: [],
        stateList: ['已取消','未支付','待发货','待收货','待评价','已完成','售后处理中','待退款'],
        goods: [],
        gsState: 0,
        order_sn: 0,   // 订单编号
        user_name: '',  // 用户名
        create_time: '', // 下单时间
        pay_time: '',  // 支付时间
        pay_for: '',  // 支付方式
        freight: '',   // 运费
        total: 0,      // 商品总价
        final_total: 0,  // 最后价格
        shipping_address: {
          consignee: '',     // 收货人姓名
          mobile: 0,   //收货人电话
          address: ''  // 收货人地址
        },
        haveExpress: false,
        haveInvoice: false,
        express: {
          freight_id: 0,  // 物流公司id
          freight_code:0, // 物流公司编号
          freight_time: 0,  // 发货时间
          freight_name: '', // 物流公司名称
          admin_name: ''  // 操作人
        },
        invoice: {
          invoice_type: 0,  // 1为已开票,0为未开票  开票状态
          invoice_title: '',  //开票人(公司)
          invoice_number: 0,  //税号
          invoice_time: 0,  //开票时间
          admin_name: ''//操作人
        }
      }
    },
    methods: {
      goDetail(num){
        window.open('/#/shxq/' + num+ '')
      },
      yikai(){
        let _this = this;
        _this.postFetch('/admin/order/invoice',{
          order_id:_this.$route.params.id
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
        let _this = this;
        if(this.wuliu == ''){
          this.$message({
            type: 'warning',
            message: '请选择物流公司'
          });
        }else if(this.wuliuNum == ''){
          this.$message({
            type: 'warning',
            message: '请填写物流编号'
          });
        }else {
          this.postFetch('/admin/order/freight',{
            order_id:_this.$route.params.id,
            freight_id:_this.wuliu,
            freight_code:_this.wuliuNum
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
        }
      },
      getData(){
        let _this = this;
        this.postFetch('/admin/order/detail', {
          order_id: this.$route.params.id
        }, function (data) {
          _this.order_sn = data.data.order_sn;
          _this.user_name = data.data.user_name;
          _this.create_time = data.data.create_time;
          _this.pay_time = data.data.pay_time;
          _this.pay_for = data.data.pay_for;
          _this.freight = data.data.freight;
          _this.total = data.data.total;
          _this.final_total = data.data.final_total;
          _this.shipping_address = data.data.shipping_address;
          _this.gsState = data.data.type;
          if (data.data.express){
            _this.express = data.data.express;
            _this.haveExpress = true;
          }
          if(data.data.invoice){
            _this.invoice = data.data.invoice;
            _this.haveInvoice = true;
          }
          _this.goods = data.data.goods;
          console.log(data.data.goods)
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
      this.postFetch('/admin/order/getFreight',{},function(data){
        _this.wuliOp = data.data;
      },function(e){})
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";
</style>
