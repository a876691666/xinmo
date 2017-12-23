<template>
 <div>
 <router-link  to="/addimg/no" target="_blank"> <el-button type="primary">广告图片添加</el-button></router-link>

    <el-table
      :data="tableData"
      style="width:100%;margin-top:28px">
      <el-table-column
        prop="title"
        label="图片名称"
        >
      </el-table-column>
      <el-table-column
        prop="sort"
        label="图片排序"
        >
      </el-table-column>
      <el-table-column
        prop="views"
        label="点击次数"
        >
      </el-table-column>
      <el-table-column
        label="显示位置"
        >

        <template scope="scope">
          {{statusList[scope.row.site]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="delClick(scope.row.id,scope.$index)">
            删除
          </el-button>
          <el-button type="text" size="small"
                     @click="compileClick(scope.row.id)">
            编辑
          </el-button>
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
 </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"adimg",

    data() {
        return {
          tableData: [],
          pageSize: 15,
          total: 0,
          nowPage: 1,
          currentPage1: 5,
          currentPage2: 5,
          currentPage3: 1,
          currentPage4: 4,
          statusList:['','主页banner','主页中部横图','主页中部banner','新入住品牌','逛banner','新客专享','人气推荐','新品到货','人气搭配']
      }
    },
    created(){
      this.getData()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.nowPage = val;
        this.getData();
        console.log(`当前页: ${val}`);
      },
      getData(){
        let _this = this;
        _this.postFetch('/admin/banner/list',{p:_this.nowPage},function(data){
          _this.tableData = data.data.data;
          _this.total = data.data.total;
        },function(e){

        })
      },
      delClick(num,i){
        let _this = this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/banner/del',
            {id: num},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.tableData.splice(i, 1);
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
      compileClick(num){
        window.open('/#/addimg/' + num + '');
      }
    }
   }
</script>
<style>
@import "../../../static/css/sort/sort.css";
</style>
