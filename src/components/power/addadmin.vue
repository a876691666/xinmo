<template>
  <div>
    <div v-if="adminGroupArr!=''">
      <el-form  label-width="120px" style="width:60%" label-position="left">
        <el-form-item label="管理员名字">
          <el-input v-model="user_name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="管理员手机号">
          <el-input v-model="mobile" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-radio class="radio" v-model="ateam" :label="item.id" v-for="(item,index) in adminGroupArr">{{item.name}}</el-radio>

        </el-form-item>
        <el-form-item label="状态">
          <el-radio class="radio" v-model="status" :label="1">可用</el-radio>
          <el-radio class="radio" v-model="status" :label="0">不可用</el-radio>
        </el-form-item>
        <el-form-item label="管理商家" >
          <el-select v-model="state1" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.short_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录用户名">
          <el-input v-model="login_name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="password" style="width:30%" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button v-if="id>0" @click="delClick">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span v-if="adminGroupArr==''">请添加若干管理组</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"addadmin",
    data(){
      return{
        pId:this.$route.params.id,
        id:0,
        adminGroupArr:[],
        state1: '',
        user_name:'',
        mobile:'',
        ateam:[],
        login_name:'',
        password:'',
        options:[],
        status:'',
      }
    },
    created(){
      let _this = this;
      _this.postFetch('/admin/sys/getAdminGroupList',{},function(data){
        _this.adminGroupArr = data.data;
      });
      _this.postFetch('/api/admin/business/index',{
        page:1,
        pagesize:99999
      },function(data){
        console.log(data);
        _this.options = data.data.list;
      });
      if(_this.$route.params.id != 'add'){
        _this.postFetch('/admin/sys/getAdminDetail',{admin_id:_this.$route.params.id},function(data){
          console.log(data);
          _this.id=data.data.id,
            _this.login_name = data.data.login_name;
          _this.user_name = data.data.user_name;
          _this.password =data.data.password;
          _this.state1 = data.data.business_id;;
          _this.ateam = data.data.group_id;
          _this.mobile = data.data.mobile;
          _this.status = data.data.status;
//          _this.  = data.data
        })
      }
    },
    methods: {
      delClick(){
        let _this = this;
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/sys/deleteAdmin',
            {admin_id: _this.$route.params.id},
            function (data) {
              console.log(data)
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
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      },
      save(){
        let _this = this;
        let obj ={
          id:_this.id,
          login_name:_this.login_name,
          user_name:_this.user_name,
          password:_this.password,
          business_id:(_this.state1 == '')?0:_this.state1,
          group_id:_this.ateam,
          mobile:_this.mobile,
          status:_this.status
        }
        _this.postFetch('/admin/sys/saveSysAdmin',obj,function(data){
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
            _this.$router.push({path: '/power'});
          }
        })
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
    }
  }
</script>
<style>
  @import "../../../static/css/sort/sort.css";
</style>
