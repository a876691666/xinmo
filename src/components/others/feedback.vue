<template>
  <div>
    <el-table  :data="tableData" stripe  style="width: 100%;text-align:center;">
      <el-table-column label="提交日期" align="center">
        <template scope="scope">
          {{scope.row.created_at | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="user_name"   label="您的姓名" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="content" label="反馈问题" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" size="small">
            <span v-if="scope.row.status == 0" @click="chuli(scope)">未处理</span>
            <span v-if="scope.row.status == 1">已处理</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template scope="scope">
          <el-input v-model="scope.row.back_contents" placeholder="请输入内容" :disabled="scope.row.status == 1"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 45px;">
      <el-pagination
        @size-change="handleSizeChange"
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
  export default{
    name:"feedback",
    data() {
      return {
        state:"未操作",
        tableData:[],
        pageSize: 15,
        total: 0,
        nowPage: 1,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4
      }
    },
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods:{
      getData(){
        let _this = this;
        _this.postFetch('/admin/feedback/list',{
          page:_this.nowPage,
          pageSize:_this.pageSize
        },function(data){
          _this.tableData = data.data.list;
          _this.total = data.data.total;
        })
      },
      handleSizeChange(val) {
        this.nowPage = val;
        this.getData();
      },
      chuli(s){
        if(!s.row.back_contents){
          this.$message({
            type: 'warning',
            message: '请填写处理内容'
          });
        }else {
          let _this = this;
          _this.postFetch('/admin/feedback/changeType',{
            feedback_id: s.row.id,
            back_contents: s.row.back_contents
          },function(data){
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
              this.getData();
            }
          })
        }
      }
    },
    created(){
      this.getData();
    }
  }
</script>
