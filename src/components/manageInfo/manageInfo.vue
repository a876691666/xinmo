<template>
  <div>
    <router-link  to="/addConsult/no" target="_blank">
      <el-button type="primary" style="float:left">资讯添加</el-button>
    </router-link>
    <el-input placeholder="请输入内容" v-model="searchVal" class="sou" style="margin-bottom:20px;width:450px;float:right;margin-right:30%">
      <el-button slot="append" icon="search" @click="search">搜索</el-button>
    </el-input>

    <el-table
      :data="tableData"
      style="width:100%;clear:both">
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="created_user"
        label="发布人"
      >
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="发布时间"
      >
        <template scope="scope">
          {{scope.row.created_at | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
      >

        <template scope="scope">
          {{scope.row.updated_at | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="page_view"
        label="真实点击量"
      >
      </el-table-column>
      <el-table-column
        label="所属分类"
      >
        <template scope="scope">
          <!--{{scope.row.get_category[0].title}}-->
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template scope="scope">
          <span v-if="scope.row.status == 1">已上架</span>
          <span v-if="scope.row.status == 0">未上架</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="del(scope)">删除</el-button>
          <el-button type="text" size="small" @click="bianji(scope)">编辑</el-button>
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
        pageSize:50
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
        let _this = this;
        this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/article/del',
            {id:s.row.id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.tableData.splice(s.$index, 1);
                this.$message({
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
      search(){
        if (this.searchVal==''){
          this.$message({
            type: 'warning',
            message: '请填写搜索值'
          });
        }else {
          window.open('/#/manageInfo/' + this.searchVal + '')
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
          p:_this.p
        };
        if (_this.$route.params.id!='no'){
          obj.title = _this.$route.params.id
        }
        _this.postFetch('/admin/article/list',obj,function(data){
          console.log(data);
          _this.tableData = data.data.data;
          _this.total = data.data.total
        },function(e){
          console.log(e)
        })
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
