<template>
  <div>
    <router-link to="/addHot/add" target="_blank">
      <el-button type="primary">添加热搜</el-button>
    </router-link>

    <el-table
      :data="tableData"
      stripe
      style="width: 80%;text-align:center;margin-top:28px">
      <el-table-column
        prop="title"
        label="标签名称"
        width="280"
        align="center">
      </el-table-column>
      <el-table-column
        prop="list_order"
        label="排序值"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="do"
        label="操作"
        width="180"
        align="center">
        <template scope="scope">
          <el-button
            @click="delClick(scope)"
            type="text"
            size="small">
            删除
          </el-button>
          <el-button
            @click="edit(scope)"
            type="text"
            size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <img src="">
    <div class="block" style="margin-top: 45px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total" style="display: inline-block">
      </el-pagination>
      <span
        style="display: inline-block;font-size:14px;line-height: 25px;vertical-align: sub;">共{{total}}条</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "hot",
    data() {
      return {
        tableData: [],
        pageSize: 50,
        total: 0,
        nowPage: 1,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 1,
        currentPage4: 4
      }
    },
    created(){
      this.getData();
    },
    methods: {
      delClick(s){
        let _this = this;
        this.$confirm('此操作将永久删除该热搜词, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/hot/del',
            {hot_id: s.row.id},
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.nowPage = val;
        this.getData()
      },
      edit(s){
        window.open('/#/addHot/'+s.row.id+'')
      },
      getData(){
        let _this = this;
        _this.postFetch('/admin/hot/list', {
          page:_this.nowPage,
          pageSize:_this.pageSize
        }, function (data) {
          _this.tableData  = data.data.list;
          _this.total  = data.data.total;
        })
      }
    }
  }
</script>
<style>
  @import "../../../static/css/others/hot.css";
</style>
