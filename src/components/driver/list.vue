<template>
  <div>
    <el-form label-width="100px" :inline="true" class="demo-form-inline" label-position="left">
      <el-form-item label="" style="margin-left:40px">
        <el-input v-model="kw" placeholder="搜索关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"  stripe   style="width:85%;margin-top:10px">
      <el-table-column prop="nickname" label="会员昵称"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column label="认证状态">
        <template scope="scope">
          {{stateList[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column prop="reg_time" label="注册时间" ></el-table-column>
      <el-table-column prop="passed_time" label="审核通过时间" ></el-table-column>
      <el-table-column width="360" label="操作" >
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="driverDetail(tableData[scope.$index], 1)">
            司机详情
          </el-button>
          <el-button type="text" size="small"
                     @click="driverDetail(tableData[scope.$index]), 2">
            车辆备案
          </el-button>
          <el-button type="text" size="small"
                     @click="driverDetail(tableData[scope.$index]), 3">
            保险信息
          </el-button>
          <el-button type="text" size="small"
                     @click="driverDetail(tableData[scope.$index]), 4">
            司机备案
          </el-button>
          <el-button type="text" size="small"
                     @click="driverDetail(tableData[scope.$index]), 5">
            司机培训
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

    },
    data() {
      return {
        stateOption:'',
        tableData: [],
        currentPage3: 1,
        total:0,
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: '',
        page:1,
        pageSize:15,
        listState: '',
        kw:'',
        stateList:['未认证', '审核通过', '审核中', '审核被拒绝'],
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
          window.open('/#/driverList/search/' + this.kw + '')
        }
      },
      driverDetail(data, type){
        window.open('/#/driverDetail/'+data.id+'/'+type+'/' + this.kw + '')
      },
      getData(){
        let _this = this;
        let data;
        data={
          page:this.page
        };
        if (this.$route.params.oper === 'search'){
          data.keyword  = this.$route.params.value;
        }
        this.postFetch('/admin/driver/list',data,function(data){
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
</style>
