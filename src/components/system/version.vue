<template>
 <div>
<el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="版本管理">
    <el-input v-model="editionNo" style="width:20%"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="save">保存</el-button>
    </el-form-item>
    </el-form>
 </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"addHot",

    data() {
      return {
        editionNo:''
      }
    },created(){
      let _this = this;
      _this.postFetch('/admin/system/detail',{},function(data){
        _this.editionNo = data.data.version;
      })
    },
    methods:{
      save(){
        let _this = this;
        _this.postFetch('/admin/system/update',{
          version:_this.editionNo
        },function(data){
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
        }
        })
      }
    }
   }
</script>
