<template>
  <div class="drivercar">
    <el-form  label-width="120px" style="width:60%" label-position="left">
      <el-form-item label="上级分类" v-if="flag">
        <el-select v-model="data.b_id" placeholder="请选择">
          <el-option
            v-for="item in l1List"
            :key="item.id"
            :label="item.brand"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="data.title" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="分类排序值">
        <el-input v-model="data.sort" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button v-if="flag2" @click="delClick(data)">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "drivercar",
    filters:{
      tabFormat(list){
        if(!list) return '无标签';
        var tabList = [];
        for(var i in list) tabList.push(list[i].title);
        return tabList.join(' ');
      }
    },
    data() {
      return {
        data:{
          type:-1
        },
        l1List:[],
        id:this.$route.params.id,
        t_id:this.$route.params.t_id,
        adminGroupArr:[{
          id:1,
          value:"司机端"
        },{
          id:0,
          value:"乘客端"
        }],
        flag2:this.$route.name != 'drivercarAdd',
        flag:this.$route.params.t_id !='undefined'
      }
    },
    methods: {
      clickUpFile(){
        this.$refs.fileInput.click()
      },
      save(){
        var update = '/admin/drivercar/update';
        var add = '/admin/drivercar/add';
        let _this = this;
        let filess = _this.$refs.fileInput;
        var obj = {
          brand:this.data.title,
          sort:this.data.sort,
        }
        if(this.data.b_id) obj.b_id=this.data.b_id;
        else if(this.data.id) obj.b_id=this.data.id;
        this.postFetch(_this.$route.name == 'drivercarEdit' ? update : add, obj, function (data) {
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
            _this.$message({
              type: 'success',
              message: data.error_msg
            });
          }
        })
      },
      delClick(data){
        let _this = this;
        debugger;
        this.$confirm('此操作将永久删除这条广告图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/drivercar/delete', data,
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
                window.location.href = '/#/drivercarList/no/no';
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      },
      getData(){
        let _this = this;
        var obj = {
          id: this.id
        };
        if(this.flag) obj.t_id = this.t_id;
        this.postFetch('/admin/drivercar/detail', obj, function (data) {
          data = data.data;
          if(!_this.flag)data.title = data.brand
          _this.data = data;
          console.log(data)
        })
      }
    },
    computed:{

    },
    created(){
      this.postFetch('/admin/drivercar/list',{},function(data){
        _this.l1List = data.data;
      });
      let _this = this;
      if(_this.$route.params.id > 0)_this.getData();
    }
  }
</script>
<style>
  .drivercar h1{
    margin:40px 0 20px;
  }
  .drivercar .el-input{
    width:300px;
    display: inline-block;
  }
  .upData {
    width: 120px;;
    height: 120px;;
    float: left;
    background:url("/static/came_03.jpg")no-repeat;
    background-size: 100% 100%;
  }
  @import "../../../static/css/order/order.css";
</style>
