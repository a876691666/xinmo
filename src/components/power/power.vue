<template>
  <div>
    <router-link to="/addadmin" target="_blank">
      <el-button type="primary">添加管理员</el-button>
    </router-link>

    <el-table
      :data="tableData"
      style="width:90%;margin-top:28px">
      <el-table-column
        prop="name"
        label="管理员姓名"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="管理员手机号"
      >
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        label="归属管理组"
      >
        <template scope="scope">
          {{scope.row.admin_auth.group_name}}
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="登录用户名"
      >
      </el-table-column>
      <el-table-column
        prop="does"
        label="操作"
      >
        <template scope="scope">
          <el-button type="text" size="small" @click="delClick(scope)">删除</el-button>
          <el-button type="text" size="small">
            <span @click="oper(scope)">{{scope.row.status == 1?'冻结':'解冻'}}</span>
          </el-button>
          <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: "power",

    data() {
      return {
        tableData: []
      }
    },
    created() {
      let _this = this;
      _this.postFetch('/admin/adminuser/list', {}, (data) => {
        _this.tableData = data.data.list;
      })
    },
    methods: {
      oper(s) {
        let _this = this;
        _this.postFetch('/admin/adminuser/frozen', {
          id: s.row.id,
          status: (s.row.status == 1) ? 0 : 1
        }, function (data) {
          s.row.status = (s.row.status == 1) ? 0 : 1
        })
      },
      edit(s) {
        window.open('/#/editadmin/' + s.row.id + '')
      },
      delClick(s) {
        let _this = this;
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/adminuser/delete',
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
