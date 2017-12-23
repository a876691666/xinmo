<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input5" class="sou" style="margin-bottom:20px;width:30%">
      <el-button slot="append" icon="search" @click="search">搜索</el-button>
    </el-input>
    <el-table  :data="tableData" stripe  style="width: 100%;text-align:center;clear:both">
      <el-table-column prop="date"  label="注册时间" align="center">
        <template scope="scope">
          {{scope.row.created_at |formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="user_name"   label="会员昵称" align="center"></el-table-column>
      <el-table-column prop="xfje" label="消费金额" align="center"></el-table-column>
      <el-table-column prop="xxfje" label="现金消费" align="center"></el-table-column>
      <el-table-column prop="gxfje" label="G币消费" align="center"></el-table-column>
      <el-table-column prop="login_time" label="最后登录时间" align="center">
        <template scope="scope">
          {{scope.row.login_time |formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template scope="scope">

          <el-button type="text" @click="operUser(scope)"> {{scope.row.status?'可用':'停用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="look(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 45px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="allpage" style="display: inline-block">
      </el-pagination><span style="display: inline-block;font-size:14px;line-height: 25px;vertical-align: sub;">共{{allpage}}条</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default{
    name:"vip",
    data() {
      return {
        input5: '',
        select: '',
        tableData:[],
        page:1,
        total_p:0,
        pageSize:50,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4
      }
    },filters: {
      formatDate(time) {
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created(){
      this.getData()
    },
    computed:{
      allpage(){
        if (typeof this.total_p == "undefined"){
          return 0;
        }
        return this.pageSize *this.total_p;
      }
    },
    methods: {
      operUser(s){
        let _ts = this;
        _ts.postFetch('/admin/user/changeType',{
          user_id:s.row.id,
          type:(s.row.status == 0)?1:0
        },function(data){
          if (data.error_code == 0){
            s.row.status = (s.row.status == 0)?1:0
          }
          console.log(data)
        })
      },
      search(){
        if(this.input5 == ''){

        }else {
          window.open('/#/vip/'+this.input5+'')
        }
      },
      look(id){
        window.open('/#/vipDetail/'+id+'')
        console.log(id)
      },
      getData(){
        let _this = this;
        let obj ={
          page:_this.page,
          pageSize:_this.pageSize
        }
        if (_this.$route.params.id!='no'){
          obj.keyword = _this.$route.params.id;
        }
        _this.postFetch('/admin/user/list',obj,function(data){
          console.log(data);
          _this.tableData = data.data.user;
          _this.total_p = data.data.total_p;
        },function(e){
          console.log(e)
        })
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getData()
      }
    }
  }
</script>
<style>
  @import "../../../static/css/vip/vip.css";
</style>
