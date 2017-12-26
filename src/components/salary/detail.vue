<template>
  <div class="order">
    <h1>工资情况</h1>
    <p>工资月份：<span>{{data.date}}</span></p>
    <p>司机姓名：<span>{{data.name}}</span></p>
    <p>工资金额：<span>￥{{data.total}}</span></p>
    <p>发放状态：<span>{{stateList[data.type]}}</span></p>

    <h1>工资明细</h1>
    <el-table :data="data.orderlist"  stripe   style="width:85%;margin:20px 0;">
      <el-table-column prop="order_sn" label="订单编号"></el-table-column>
      <el-table-column prop="cost" label="订单金额"></el-table-column>
      <el-table-column prop="finish_time" label="完成时间"></el-table-column>
      <el-table-column prop="cost" label="对应收益"></el-table-column>
    </el-table>
    <div v-if="data.type == '0'"">
      <el-button type="primary" @click="salaryUpdate">确认发工资</el-button>
    </div>

    <div v-if="data.type == '1'">
      <h1>操作信息</h1>
      <p>操作人：<span>{{data.adminname}}</span></p>
      <p>操作时间：<span>{{data.time}}</span></p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "salaryDetail",
    data() {
      return {
        data:{

        },
        stateList:['未发工资', '已发工资'],
        carriers:'',
        logistics:''
      }
    },
    methods: {
      salaryUpdate(){
        let _this = this;
        this.$confirm('此操作将发放工资, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/salary/ypdate', {id: this.data.id}, function (data) {
            if (data.error_code === 1) {
              _this.$message({
                type: 'warning',
                message: '' + data.error_msg + ''
              });
            } else {
              _this.$message({
                type: 'success',
                message: '' + data.error_msg + ''
              });
            }
          }, function (e) {
            console.log(e)
          })
        }).catch(() => {
        });


      },
      getData(){
        let _this = this;
        this.postFetch('/admin/salary/detail', {
          id: this.$route.params.id
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
