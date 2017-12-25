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
      <el-table-column width="220" label="申请用户">
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="compileClick(scope.row)">
            {{scope.row.username}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="create_time"  label="申请开票时间"></el-table-column>
      <el-table-column label="开票金额">
        <template scope="scope">
          ￥{{scope.row.total}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="开票状态" ></el-table-column>
      <el-table-column prop="adminname" label="操作人" ></el-table-column>
      <el-table-column width="200" prop="finish_time"  label="开票时间"></el-table-column>
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
        window.open('/#/invoice/state/' + n + '')
      },
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
        stateList:{ "-1":"已取消", "1":"待接单", "2":"司机接单", "3":"行驶中", "4":"到达（未支付）", "5":"乘客已支付" },
        stateOp: [{
          value: -1,
          label: '已取消'
        }, {
          value: 1,
          label: '待接单'
        }, {
          value: 2,
          label: '司机接单'
        }, {
          value: 3,
          label: '行驶中'
        }, {
          value: 4,
          label: '到达（未支付）'
        }, {
          value: 5,
          label: '乘客已支付'
        }]
      }
    },
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
          window.open('/#/invoiceList/search/' + this.kw + '')
        }
      },
      compileClick(data){
        window.open('/#/invoiceDetail/' + data.id + '')
      },
      getData(){
        let _this = this;
        let data;
        data={

        };
        if (this.$route.params.oper === 'state'){
          data.status  = this.$route.params.value;
        }
        if (this.$route.params.oper === 'search'){
          data.keyword  = this.$route.params.value;
        }
        this.postFetch('/admin/invoice/list',data,function(data){
          _this.tableData = data.data.list;
          _this.total  = data.data.total;
        });
      }
    },
    created(){
      this.getData();
    },

  }
</script>
<style>
</style>
