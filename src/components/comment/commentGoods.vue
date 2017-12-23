<template>
  <div>
    <el-input placeholder="请输入内容" v-model="searchVal" class="sou" style="margin-bottom:20px;width:300px;float:right;margin-right:30%">
      <el-button slot="append" icon="search" @click="search">搜索</el-button>
    </el-input>

    <el-table
      :data="tableData"
      style="width:100%;clear:both">
      <el-table-column
        label="日期"
      >
        <template scope="scope">
          {{scope.row.created_at | formatDate}}
        </template>
        <!--formatDate-->
      </el-table-column>
      <el-table-column
        label="评论人"
      >

        <template scope="scope">
          <span v-if="scope.row.nickname !=''" @click="menberDetail(scope.row.uid)">
             {{scope.row.nickname}}
          </span>
          <span v-if="scope.row.nickname == ''">
            暂无评论人
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comments"
        label="评论对象"
      >
      </el-table-column>
      <el-table-column
        prop="star"
        label="本次打分"
      >
      </el-table-column>
      <el-table-column
      prop="content"
        label="文字评论内容"
      >
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="del(scope)">删除</el-button>
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
        :total="total" style="display: inline-block">
      </el-pagination><span style="display: inline-block;font-size:14px;line-height: 25px;vertical-align: sub;">共{{total}}条</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default{
    name:"sort",
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        searchVal:'',
        tableData: [],
        total:0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4,
        p:1,
        pageSize:15
      }
    },
    created(){
      this.getData()
    },
    methods: {
      bianji(s){
        window.open('/#/addConsult/' + s.row.id + '')
      },
      del(s){
        console.log(s)
        let _this = this;
        this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/comment/goodsCommentDelete',
            {id:s.row.id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.tableData.splice(s.$index, 1);
                _this.$message({
                  type: 'success',
                  message: '已删除'
                });
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {

        });
      },
      menberDetail(s){
        window.open('/#/vipDetail/'+s+'')
      },
      search(){
        if (this.searchVal==''){
          this.$message({
            type: 'warning',
            message: '请填写搜索值'
          });
        }else {

        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.p = val;
        this.getData()
      },
      getData(){
        let _this = this;
        let obj = {
          page:_this.p,
          pagesize:_this.pageSize
        };
        if (_this.$route.params.id!='no'){
          obj.keyword = _this.$route.params.id;
        }
        _this.postFetch('/api/admin/comment/goodsCommentIndex',obj,function(data){
          _this.tableData = data.data.comments;
        })
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
