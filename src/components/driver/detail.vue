<template>
  <div class="driver" v-if="type=='1'">
    <h1>会员基本资料</h1>
    <p>会员昵称：<span>{{data.nickname}}</span> </p>
    <p>手机号：<span>{{data.mobile}}</span></p>
    <p>认证状态：<span>{{stateList[data.driver.status]}}</span></p>
    <p>注册时间：<span>{{data.reg_time}}</span></p>
    <p>审核通过时间：<span>{{data.passed_time}}</span></p>
    <br>
    <p>服务人次：<span>{{data.driver.service_number}}</span></p>
    <p>累计里程：<span>{{data.driver.d_trip}}千米</span></p>
    <p>平均分：<span>{{data.driver.d_star}}</span></p>
    <p>会员标签：<span>{{data.driver.labelcount | tabFormat}}</span></p>

    <h1>会员实名信息</h1>
    <p>您的姓名：<span>{{data.driver.name}}</span></p>
    <p>身份证号：<span>{{data.driver.id_number}}</span></p>
    <p>家乡：<span>{{data.driver.prov}} {{data.driver.city}}</span></p>
    <p>初领驾照日期：<span>{{data.driver.first_driving}}</span></p>
    <p>车辆所有人：<span>{{data.driver.owber}}</span></p>
    <p>车辆注册日期：<span>{{data.driver.car_reg_time}}</span></p>
    <p>车辆品牌：<span>{{data.driver.brand}}</span></p>
    <p>车辆类型：<span>{{data.driver.car_type}}</span></p>
    <p>车辆颜色：<span>{{data.driver.color}}</span></p>
    <p>车牌号码：<span>{{data.driver.plate_number}}</span></p>

    <h1>证件照</h1>

    <el-row>
      <el-col :span="12">
        <el-col :span="4">车辆图</el-col>
        <el-col :span="20"><img :src="data.driver.car_pic" alt=""></el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="4">手持身份证</el-col>
        <el-col :span="20"><img :src="data.driver.self_pic" alt=""></el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-col :span="4">身份证正面</el-col>
        <el-col :span="20"><img :src="data.driver.id_front" alt=""></el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="4">身份证背面</el-col>
        <el-col :span="20"><img :src="data.driver.id_back" alt=""></el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-col :span="4">行驶证</el-col>
        <el-col :span="20"><img :src="data.driver.travel_text" alt=""></el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="4">驾照</el-col>
        <el-col :span="20"><img :src="data.driver.driving_pic" alt=""></el-col>
      </el-col>
    </el-row>

    <div v-if="data.driver.status != '1'"">
      <el-row>
        <el-col :span="24">
          <el-col :span="2">备注</el-col>
          <el-col :span="22"><textarea v-model="remark" rows="8" cols="80"></textarea> </el-col>
        </el-col>
      </el-row>
      <el-button type="primary" @click="confirm(1)">审核通过</el-button>
      <el-button type="primary" @click="confirm(3)">拒绝审核</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "driver",
    filters:{
      tabFormat(list){
        if(!list) return '无标签';
        var tabList = [];
        for(var i in list) tabList.push(list[i].title);
        return tabList.join(' ');
      }
    },
    data() {
      return {
        data:{
          driver:{}
        },
        type:this.$route.params.type,
        stateList:['未认证', '审核通过', '审核中', '审核被拒绝']
      }
    },
    methods: {
      getData(){
        let _this = this;
        if(this.type == '1'){
          this.postFetch('/admin/driver/detail', {
            u_id: this.$route.params.id
          }, function (data) {
            data = data.data;
            _this.data = data;
            console.log(data)
          })
        }
      },
      confirm(type){
        var msg = {
          1:'通过',
          3:'拒绝'
        }
        this.$confirm('此操作将' + msg[type] + '用户审核, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/driver/update',
            {u_id: this.data.id,
             type:type},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                data.type = tpye;
                _this.$message({
                  type: 'success',
                  message: '已' + msg[type]
                });
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      }
    },
    computed:{

    },
    created(){
      let _this = this;
      _this.getData();
    }
  }
</script>
<style>
  .driver h1{
    margin:40px 0 20px;
  }
  @import "../../../static/css/order/order.css";
</style>
