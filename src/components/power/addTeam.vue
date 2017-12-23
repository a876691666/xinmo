<template>
  <div>
    <el-form label-width="120px" label-position="left">
      <el-form-item label="管理组名称" style="width:30%">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="管理组介绍" style="width:30%">
        <el-input type="textarea" v-model="info"></el-input>
      </el-form-item>
      <el-form-item label="是否可用" style="width:30%">
        <el-radio class="radio" v-model="radio" label="0">
          不可用
        </el-radio>
        <el-radio class="radio" v-model="radio" label="1">
          可用
        </el-radio>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="type"
                           v-for="(item,index) in checkArr">
          <el-checkbox :label="item.id" name="type"
                       style="display: inline-block;width: 25%">
            {{item.menu_name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存
        </el-button>
        <el-button type="danger">删除</el-button>
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
        id: 0,
        radio: '',
        name: '',
        info: '',
        type: [],
        checkArr: []
      }
    },
    created(){
      let _this = this;
      _this.postFetch('/admin/sys/getSysMenuList', {}, function (data) {
        _this.checkArr = data.data;
      });
      if (this.$route.params.id != 'add') {
        _this.postFetch('/admin/sys/getSysGroupDetail', {
          group_id: _this.$route.params.id
        }, function (data) {
          _this.id = data.data.id;
          _this.name = data.data.name;
          _this.radio = '' + data.data.status + '';
          _this.type = data.data.menu_id_array;
          _this.info = data.data.discription;
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
        let obj = {
          status: _this.radio,
          name: _this.name,
          discription: _this.info,
          menu_id_array: _this.type,
          id: _this.id,
          token: _this.userData.token
        };
        $.ajax({
          url: 'http://chenchengonghao.com/admin/sys/saveAdminGroup',
          type: 'post',
          data: obj, success: function (data) {
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
          }
        });
      }
    }
  }
</script>
