<template>
  <div>
    <el-form label-width="100px" :inline="true" class="demo-form-inline" label-position="left">
      <el-form-item label="订单状态" >
        <el-select v-model="stateOption" placeholder="请选择">
          <el-option
            v-for="item in stateOp"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单创建时间">
        <el-date-picker
          v-model="value4"
          type="datetimerange"
          :picker-options="pickerOptions2"
          placeholder="选择时间范围"
          align="right">
        </el-date-picker>
      </el-form-item>
      </el-form-item>
      <el-form-item label="" style="margin-left:40px">
        <el-input v-model="kw" placeholder="搜索关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"  stripe   style="width:85%;margin-top:10px">
      <el-table-column width="170" prop="create_time"  label="订单创建时间"></el-table-column>
      <!--      <el-table-column label="订单创建时间">
              <template scope="scope">
                {{scope.row.create_time | formatDate}}
              </template>
            </el-table-column>-->
      <el-table-column width="220" prop="order_sn"   label="订单编号"></el-table-column>
      <el-table-column prop="user_name" label="购买用户"></el-table-column>
      <el-table-column prop="final_total" label="订单金额"></el-table-column>
      <el-table-column prop="payfor" label="支付方式" ></el-table-column>
      <el-table-column prop="business_name" label="所属商家" ></el-table-column>
      <!--      <el-table-column prop="type" label="订单状态" >

            </el-table-column>-->
      <el-table-column label="订单状态">
        <template scope="scope">
          {{stateList[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="compileClick(tableData[scope.$index])">
            操作
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 45px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total" style="display: inline-block">
      </el-pagination><span style="display: inline-block;font-size:14px;line-height: 25px;vertical-align: sub;">共{{total}}条</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default {
    watch:{
      stateOption:function(n,o){
        let _this = this;
        window.open('/#/sectionOne/state/' + n + '')
      },
      dateString:function(n,o){
        let _this = this;
        window.open('/#/sectionOne/date/' + JSON.stringify(n) + '')
      }
    },
    data() {
      return {
        stateOption:'',
        tableData: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4,
        total:0,
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: '',
        page:1,
        pageSize:15,
        listState: '',
        kw:'',
        stateList:['已取消','未支付','待发货','待收货','待评价','已完成','售后处理中','待退款'],
        stateOp: [{
          value: 0,
          label: '已取消'
        }, {
          value: 1,
          label: '未支付'
        }, {
          value: 2,
          label: '待发货'
        }, {
          value: 3,
          label: '待收货'
        }, {
          value: 4,
          label: '待评价'
        }, {
          value: 5,
          label: '已完成'
        }, {
          value: 6,
          label: '售后处理中'
        }, {
          value: 6,
          label: '待退款'
        }
        ]
      }
    },
    /*    filters: {
     formatDate(time) {
     var date = new Date(time*1000);
     return formatDate(date, 'yyyy-MM-dd hh:mm');
     }
     },*/
    methods:{
      handleCurrentChange(val) {
        this.page = val;
        this.getData();
      },
      search(){
        if (this.kw == ''){
          this.$message({
            type: 'warning',
            message: '搜索内容不能为空'
          });
        }else {
          window.open('/#/sectionOne/search/' + this.kw + '')
        }
      },
      compileClick(data){
        window.open('/#/order/' + data.order_id + '')
      },
      getData(){
        let _this = this;
        let data;
        data={
          p:this.page
        };
        if (this.$route.params.oper === 'state'){
          data.type  = this.$route.params.value;
        }
        if (this.$route.params.oper === 'search'){
          data.keyword  = this.$route.params.value;
        }
        if (this.$route.params.oper === 'date'){
          let dateArr = JSON.parse(this.$route.params.value);
          data.create_time  = dateArr[0];
          data.over_time  = dateArr[1];
        }
        this.postFetch('/admin/order/list',data,function(data){
          _this.tableData = data.data.list;
          _this.total  = data.data.total;
        });
      }
    },
    created(){
      this.getData();
    },
    computed:{
      dateString(){
        let arrs = [];
        for (let i = 0;i<this.value4.length;i++){
          let date = this.value4[i];
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let months = (month > 10)?month : '0'+month;
          let strDates = (strDate > 10)?strDate : '0'+strDate;
          let stringNum = year+'-'+months+'-'+strDates;
          arrs.push(stringNum)
        }
        return arrs;
      }
    }

  }
</script>
<style>
  @import "../../../static/css/index/sectionOne.css";
</style>
