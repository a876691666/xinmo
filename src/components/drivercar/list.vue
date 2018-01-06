<template>
  <div>
    <el-form label-width="100px" :inline="true" class="demo-form-inline" label-position="left">
      <router-link to="/drivercarAdd" target="_blank">
        <el-button type="primary">添加汽车分类</el-button>
      </router-link>
    </el-form>
    <el-table :data="tableData" stripe style="width:85%;margin-top:10px" default-expand-all>
      <el-table-column type="expand">
        <template scope="scope">
          <el-table :data="scope.row.btype" stripe style="width:100%;" :show-header="false">
            <el-table-column width="87" label="" ></el-table-column>
            <el-table-column width="160" prop="title" label="" >
              <template scope="scope">
                <el-button type="text" size="small"
                           @click="drivercarEdit(scope.row, 1)">
                  {{scope.row.title}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column width="150"><template scope="scope"> 2 </template></el-table-column>
            <el-table-column width="200" prop="sort"></el-table-column>
            <el-table-column label="" >
              <template scope="scope">
                <el-button type="text" size="small"
                           @click="drivercarDelete(scope.row, 1)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column width="200" label="分类名称">
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="drivercarEdit(scope.row, 1)">
            {{scope.row.brand}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="150" label="分类等级" ><template scope="scope">1</template></el-table-column>
      <el-table-column width="200" prop="sort" label="排序值" ></el-table-column>
      <el-table-column label="操作" >
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="drivercarDelete(scope.row, 1)">
            删除
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
        stateList:['下架', '上架'],
        treeProps:{
          children:'btype',
          label:'title'
        }
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
          window.open('/#/drivercarList/search/' + this.kw + '')
        }
      },
      drivercarDelete(data, type){
        let _this = this;
        var obj = {};
        obj.id = data.b_id;
        obj.t_id = data.t_id;
        this.$confirm('此操作将永久删除这条广告图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/drivercar/delete', obj,
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
      drivercarEdit(data, type){
        window.open('/#/drivercarEdit/'+(data.id || data.b_id) +'/'+data.t_id)
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
        this.postFetch('/admin/drivercar/list',data,function(data){
          _this.tableData = data.data;
          for(var i in data.data){
            data.data[i].title = data.data[i].brand
          }
          _this.total  = data.data.total;
        });
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return `
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>` + node.label + `</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click="this.append(data)">Append</el-button>
              <el-button style="font-size: 12px;" type="text" on-click="this.remove(node, data)">Delete</el-button>
            </span>
          </span>`;
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
.el-table .el-table.el-table--fit.el-table--striped.el-table--enable-row-hover{
  display: none;
}
.el-table .el-table.el-table--fit.el-table--striped.el-table--enable-row-hover.el-table--enable-row-transition{
  display: block;
}
.el-table__expanded-cell[class*=cell]{
  padding:0;
  /* border-bottom:1px solid #ccc; */
}
</style>
