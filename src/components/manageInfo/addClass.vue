<template>
 <div>
<el-form label-width="100px" label-position="left">
  <el-form-item label="分类名称" style="width:30%">
    <el-input v-model="title"></el-input>
  </el-form-item>
  <el-form-item  style="width:30%;margin-top:18px"
    label="分类排序值"
  >
    <el-input v-model.number="sort" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item  style="width:30%;margin-top:18px"
    label="是否显示"
  >
    <el-checkbox v-model="checked"></el-checkbox>
  </el-form-item>
  <el-form-item style="margin-top:20px">
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button type="danger" @click="del" v-if="id>0">删除</el-button>
  </el-form-item>
</el-form>
 </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"addConsult",
    data() {
      return {
        checked:false,
        id:0,
        title:'',
        sort:''
      }
    },
    created(){
      let _this = this;
      if(this.$route.params.id!='no'){
        _this.postFetch('/admin/articlecategory/edit/'+this.$route.params.id+'',{},function(data){
          console.log(data);
          _this.title = data.data.title;
          _this.sort = data.data.sort;
          _this.id = data.data.id;
          _this.checked = (data.data.is_show == 1)?true:false;
        },function(e){
          console.log(e)
        })
      }
    },
    methods:{
      onSubmit(){
        let _this = this;
//        /admin/articlecategory/update
        let obj = {
          title:_this.title,
          sort:_this.sort,
          code:'guang',
          is_show:(_this.checked)?1:0
        };
        let url = (this.$route.params.id!='no')?'/admin/articlecategory/update':'/admin/articlecategory/add';
        if (this.$route.params.id != 'no'){
          obj.id = _this.id;
        }
        _this.postFetch(url,obj,function(data){

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
            _this.$router.push({path: '/infoClass'});
          }
        },function(e){
        })
      },
      del(){
        let _this = this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/articlecategory/del',
            {id:_this.id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.$message({
                  type: 'success',
                  message: '已删除'
                });
                _this.$router.push({path: '/infoClass'});
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      }
    }

  }
</script>
<style>
@import "../../../static/css/order/addConsult.css";
</style>
