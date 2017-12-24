<template>
  <div>
    <router-link to="/addTeam" target="_blank">
      <el-button type="primary">添加管理组</el-button>
    </router-link>

    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="group_name"
        label="管理组名称">
      </el-table-column>

      <el-table-column
        prop="creat_at"
        label="创建时间">
      </el-table-column>

      <el-table-column
        prop="description"
        label="管理组介绍">
      </el-table-column>

      <el-table-column
        prop="does"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="delClick(scope)">删除</el-button>
          <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  export default{
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    name: "adminTeam",
    data() {
      return {
        tableData: [],
        currentPage1: 1,
        currentPage2: 2,
        currentPage3: 3,
        currentPage4: 4
      }
    },
    created(){
      let _this = this;
      _this.postFetch('/admin/admingroup/list', {}, function (data) {
        _this.tableData = data.data.list;
      })
    },
    methods: {
      delClick(s){
        let _this = this;
        this.$confirm('此操作将永久删除该管理组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/admingroup/delete',
            {id: s.row.id},
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
      edit(s){
        window.open('/#/editTeam/'+s.row.id+'')
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
