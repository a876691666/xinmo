<template>
  <div>
    <el-form label-width="100px" :inline="true" class="demo-form-inline" label-position="left">
      <el-form-item label="日期" >
        <el-select v-model="dateSelectChange" placeholder="请选择">
          <el-option
            v-for="item in dateSelect"
            :key="item"
            :label="item+'月'"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算状态" >
        <el-select v-model="typeSelectChange" placeholder="请选择">
          <el-option
            v-for="(item, index) in typeSelect"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" style="margin-left:40px">
        <el-input v-model="kw" placeholder="搜索关键词"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData"  stripe   style="width:85%;margin-top:10px">
      <el-table-column prop="date" label="工资月份"></el-table-column>
      <el-table-column prop="name"  label="司机姓名"></el-table-column>
      <el-table-column label="本次工资金额">
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="compileClick(scope.row)">
            ￥{{scope.row.total}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="发放状态" >
        <template scope="scope">
          {{stateList[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column prop="adminname" label="操作人" ></el-table-column>
      <el-table-column prop="time" label="发放时间" ></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button v-if="scope.row.type=='0'" type="text" size="small"
          @click="salaryUpdate(scope.row)">
          确认发放工资
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
      dateSelectChange(n){
        window.open('/#/salaryList/date/' + n + '')
      },
      typeSelectChange(n){
        window.open('/#/salaryList/type/' + n + '')
      }
    },
    data() {
      return {
        dateSelectChange:'',
        typeSelectChange:'',
        tableData: [],
        dateSelect: [1,2,3,4,5,6,7,8,9,10,11,12],
        typeSelect: ['未发工资', '已发工资'],
        currentPage3:1,
        total:0,
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: '',
        page:1,
        pageSize:15,
        listState: '',
        kw:'',
        stateList:['未发工资', '已发工资']
      }
    },
    methods:{
      compileClick(data){
        window.open('/#/salaryDetail/' + data.id + '')
      },
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
          window.open('/#/salaryList/search/' + this.kw + '')
        }
      },
      salaryUpdate(data){

          let _this = this;
          this.$confirm('此操作将发放工资, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postFetch('/admin/salary/ypdate', {id: data.id}, function (data) {
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
        let data;
        data={
          page:this.page
        };
        if (this.$route.params.oper === 'type'){
          data.type  = this.$route.params.value;
        }
        if (this.$route.params.oper === 'date'){
          data.month  = this.$route.params.value;
        }
        if (this.$route.params.oper === 'search'){
          data.keyword  = this.$route.params.value;
        }
        this.postFetch('/admin/salary/list',data,function(data){
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
