<template>
  <div>
    <el-form label-width="120px" label-position="left">
      <el-form-item label="管理组名称" style="width:30%">
        <el-input v-model="group_name"></el-input>
      </el-form-item>
      <el-form-item label="管理组介绍" style="width:30%">
        <el-input type="textarea" v-model="description"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-row>
          <el-col :span="6" v-for="(item,index) in checkArr">
            <el-checkbox :label="item.id" name="type"
                         style="display: inline-block;width: 25%" v-model="authorities[index]">
              {{item.privilege}}
            </el-checkbox>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存
        </el-button>
        <el-button type="danger" v-if="id" @click="deleteTeam">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default{
    name: "addTeam",
    data() {
      return {
        id: this.$route.params.id,
        radio: '',
        group_name: '',
        description: '',
        authorities: [],
        checkArr: []
      }
    },
    created(){
      let _this = this;
      _this.postFetch('/admin/admingroup/authoritylist', {}, function (data) {
        _this.checkArr = data.data;
      });
      if (this.$route.name == 'editTeam') {
        _this.postFetch('/admin/admingroup/detail', {
          id: _this.$route.params.id
        }, function (data) {
          data = data.data;
          // _this.id = data.id;
          _this.group_name = data.group_name;
          _this.description = data.description;
          _this.authorities = [];
          let authorities = data.authorities.split(',');
          for(var i in authorities) _this.authorities[authorities[i]] = true;
        })
      }
    },
    computed:{
      ...mapGetters([
        "userData"
      ])
    },
    methods: {
      save(){
        let _this = this;
        let authorities = [];
        for(var i in _this.authorities) if(_this.authorities[i]) authorities.push(i);
        let obj = {
          group_name:_this.group_name,
          authorities:authorities.join(),
          description:_this.description
        };
        var add = '/admin/admingroup/add';
        var update = '/admin/admingroup/update';
        if(_this.$route.params.id) obj.id = _this.$route.params.id;
        this.postFetch(this.$route.name == 'editTeam' ? update : add, obj, function(data){
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
            _this .$router.push({path: '/adminTeam'});
          }
        })
      },
      deleteTeam(){
        let _this = this;
        this.$confirm('此操作将永久删除该管理员组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/admingroup/delete',
            {id: _this.$route.params.id},
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
      }
    }
  }
</script>
