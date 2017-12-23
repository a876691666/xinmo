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
      <el-table-column prop="state" label="退款状态"  width="120" align="center"></el-table-column>
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
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="130px" class="demo-ruleForm" style="width:30%;margin-top:28px" label-position="left">
      <el-form-item label="选择物流公司" id="h1">
        <el-select v-model="formInline.region" placeholder="顺丰" >
          <el-option label="顺丰" value="sf"></el-option>
          <el-option label="圆通" value="yt"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        id="h2"
        label="填写物流单号"
        prop="tracking"
      >
        <input type="text" name="listNumber"  v-on:keyup="bd" id="danhao">
      </el-form-item>
    </el-form>

    <!--     <el-button type="primary" style="margin-top:28px" id="but" v-on:click="chg">确认发货</el-button> -->
    <input type="button" name="btn" id="btn" v-on:click="chg" disabled value="确认发货">
    <div id="sh">
      <p>物流公司：<span>顺丰速递</span></p>
      <p>物流单号：<a href="http://www.baidu.com/s?wd=4454584888846468&cl=3"  target="_blank" style="text-decoration: underline;">4454584888846468</a></p>
      <p>操作时间：<span>2017年8月10日11:07:59</span></p>
      <p>操作人：<span>何沙乐</span></p>
    </div>
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
          state:''
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
          state:''
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
          state:''
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
          state:''
        },{
          name: 'HITAWA携带便捷式水素水机H1500',
          size: '白色 XL',
          num: '*1',
          money:'￥300.00',
          state:''
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
      chg: function (event) {

        document.getElementById("btn").className="hide";
        document.getElementById("h2").className="hide";
        document.getElementById("h1").className="hide";
        document.getElementById("sh").className="show fp";
        document.getElementById("pan").innerHTML="已开发票";
      },
      bd:function(event){
        var a=/^\d+$/;
        var b=document.getElementById("danhao").value;

        if(a.test(b)){
          document.getElementById("btn").disabled=false;
        }
        if(!a.test(b)||b == ''){
          document.getElementById("btn").disabled=true;
        }
      }
    }
  }
</script>
<style>
  @import "../../../static/css/order/order.css";
</style>
