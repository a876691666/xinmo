<template>
<div>
<h1>基本信息</h1>
  <p  style="margin-top:20px">订单当前状态：<span>待付款</span></p>
  <p>订单号：<span>14616146464641</span></p>
  <p>购买用户：<span>何沙乐</span></p>
  <p>下单时间：<span>2017年8月10日09:29:35</span></p>
  <p>支付时间：<span>2017年8月10日09:29:35</span></p>
  <p>支付方式：<span>微信支付</span></p>
  <h1 style="margin-top:20px">商品清单</h1>
  <el-table :data="tableData"  stripe   style="width:782px;margin-top:10px;text-align:center">
    <el-table-column prop="name"  label="商品标题"  width="300" align="center"></el-table-column>
    <el-table-column prop="size"   label="购买规格"  width="120" align="center"></el-table-column>
    <el-table-column prop="num" label="购买数量"   width="120" align="center"></el-table-column>
    <el-table-column prop="money" label="费用小计"   width="120" align="center"></el-table-column>
    <el-table-column label="退款状态" width="120" align="center">
              <template scope="scope"><router-link to="/shxq"
                         class="routerLink red" target="_blank">待退款</router-link>
              </template>
    </el-table-column>
    </el-table>
    <div class="fp">
    <p>费用总额：<span>￥6230.00</span></p>
    <p>运费：<span>+￥10.00</span></p>
    <p>退款金额合计：<span>-￥0.00</span></p>
    <p>订单最终费用：<span>￥6000.00</span></p>
    </div>
    <h1 style="margin-top:20px">收货信息</h1>
    <p  style="margin-top:20px">收货人：<span>何沙乐</span></p>
    <p>收货手机：<span>15810473391</span></p>
    <p>收货地址：<span>北京市丰台区宋家庄苇子坑149号庄子商务楼北楼一层新墨公司</span></p>
<h1 style="margin-top:20px">商品发货</h1>
<p  style="margin-top:20px">物流公司：<span>顺丰速递</span></p>
<p >物流单号：<a href="http://www.baidu.com/s?wd=4454584888846468&cl=3"  target="_blank" style="text-decoration: underline;">4454584888846468</a></p>
    <p >操作时间：<span>2017年8月10日11:07:59</span></p>
    <p >发票抬头：<span>新墨（北京）科技有限公司</span></p>
    <p >操作人：<span>何沙乐</span></p>
     <h1 style="margin-top:20px">发票信息</h1>
    <p  style="margin-top:20px">开票状态：<span id="pan">未开发票</span></p>
    <p>开票类型：<span>普通发票</span></p>
    <p>发票抬头：<span>新墨（北京）科技有限公司</span></p>
    <p>税号：<span>91110116MA006FM517</span></p>
    <p>操作时间：<span>2017年8月10日11:07:59</span></p>
    <p>操作人：<span>何沙乐</span></p>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"dfh",
    data() {
      return {
        tableData: [{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
        }],
         formInline: {
          user: '',
          region: ''
        },
        numberValidateForm: {
          tracking: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick() {
        console.log(1);
      }
    }
  }
</script>
<style>
@import "../../../static/css/order/sh.css";
</style>
