<template>
  <div>
    <el-form label-width="100px" :inline="true" class="demo-form-inline" label-position="left">
      <router-link to="/bannerAdd" target="_blank">
        <el-button type="primary">添加广告图片</el-button>
      </router-link>
    </el-form>
    <el-table :data="tableData" stripe style="width:85%;margin-top:10px">
      <el-table-column width="200" label="图片名称">
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="bannerEdit(tableData[scope.$index], 1)">
            {{scope.row.banner_id}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="sort" label="图片排序" ></el-table-column>
      <el-table-column width="150" prop="clicks" label="点击次数" ></el-table-column>
      <el-table-column prop="type" label="显示位置" ></el-table-column>
      <el-table-column width="200" prop="update_time" label="更新时间" ></el-table-column>
      <el-table-column label="操作" >
        <template scope="scope">
          <el-button type="text" size="small"
                     @click="bannerDelete(tableData[scope.$index], 1)">
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
          window.open('/#/bannerList/search/' + this.kw + '')
        }
      },
      bannerDelete(data, type){
        let _this = this;
        this.$confirm('此操作将永久删除这条广告图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/banner/delete',
            {banner_id: data.id},
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
      bannerEdit(data, type){
        window.open('/#/bannerEdit/'+data.banner_id)
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
        this.postFetch('/admin/banner/list',data,function(data){
          _this.tableData = data.data.list;
          _this.total  = data.data.total;
        });
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
</style>
