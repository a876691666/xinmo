<template>
 <div>
      <el-form label-position="left" label-width="100px" class="demo-ruleForm">
  <el-form-item label="标签名称"  style="width:30%">
    <el-input v-model="title"></el-input>
  </el-form-item>
  <el-form-item
    label="排序值"
    style="width:30%"
  >
  <el-input  v-model.number="sort" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item
    label="是否显示"
    style="width:30%"
  >
    <el-radio class="radio" v-model="radio" label="1">是</el-radio>
    <el-radio class="radio" v-model="radio" label="0">否</el-radio>
  </el-form-item>
  <el-form-item>
    <el-button type="primary"  @click="submitForm()">保存</el-button>
    <el-button type="danger" @click="resetForm()" v-if="id!='add'">删除</el-button>
  </el-form-item>
</el-form>
 </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"addHot",
    data() {
      return {
        radio:'1',
        id:this.$route.params.id,
        title: '',
        sort: ''
      }
    },
    created(){
      if(this.$route.params.id!='add'){
        let _this = this;
        _this.postFetch('/admin/hot/edit',{
          hot_id:_this.$route.params.id
        },function(data){
          console.log(data)
          _this.radio = ''+data.data.is_show+'';
          _this.title = data.data.title;
          _this.sort = data.data.list_order;
        })
      }
    },
     methods: {
      submitForm() {
        let _this = this;
        let url = '/admin/hot/add';
        let obj = {
          title:this.title,
          list_order:this.sort,
          is_show:this.radio
        };
        if(_this.$route.params.id != 'add'){
          url='/admin/hot/update';
            obj.hot_id= _this.id;
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
              message: '已删除'
            });
            _this.$router.push({path: '/hot'});
          }
        })
      },
      resetForm() {
        let _this = this;
        this.$confirm('此操作将永久删除该热搜词, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/hot/del',
            {hot_id:_this.id},
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
                _this.$router.push({path: '/hot'});
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
