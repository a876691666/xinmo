<template>
  <div class="banner">
    <h1>会员基本资料</h1>
    <el-form  label-width="120px" style="width:60%" label-position="left">
      <el-form-item label="图片名称">
        <el-input v-model="data.title" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="图片排序">
        <el-input v-model="data.sort" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="图片链接指向">
        <el-input v-model="data.link" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="显示位置选择">
        <el-radio class="radio" v-model="data.type" :label="item.id" v-for="(item, key) in adminGroupArr">{{item.value}}</el-radio>
      </el-form-item>
      <el-form-item label="点击次数" v-if="data.banner_id > 0">
        {{data.clicks}}
      </el-form-item>
      <el-form-item label="更新时间" v-if="data.banner_id > 0">
        {{data.update_time}}
      </el-form-item>
      <el-form-item label="图片上传">
        <span class="upData" @click="clickUpFile">
          <img :src="data.picpath" alt="" style="width:100%;height:100%;">
        </span>
          <input type="file" ref="fileInput"
                 style="display: none;" id="img-upload"
                 accept="image/*"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button v-if="data.banner_id>0" @click="delClick(data)">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "banner",
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
        type:this.$route.params.type,
        adminGroupArr:[{
          id:1,
          value:"司机端"
        },{
          id:0,
          value:"乘客端"
        }]
      }
    },
    methods: {
      clickUpFile(){
        this.$refs.fileInput.click()
      },
      save(){
        var update = '/admin/banner/update';
        var add = '/admin/banner/add';
        let _this = this;
        let filess = _this.$refs.fileInput;
        var obj = {
          title:this.data.title,
          type:this.data.type,
          link:this.data.link,
          sort:this.data.sort,
        }
        if(filess.files.length) obj.pic = filess.files[0];
        if(_this.$router.name == 'bannerEdit') obj.banner_id=this.data.banner_id;
        this.postFetch(_this.$route.name == 'bannerEdit' ? update : add, obj, function (data) {
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
            window.location.href = '/#/bannerList';
          }
        })
      },
      delClick(data){
        let _this = this;
        this.$confirm('此操作将永久删除这条广告图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/banner/delete',
            {banner_id: data.banner_id},
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
                window.location.href = '/#/bannerList/no/no';
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
        this.postFetch('/admin/banner/detail', {
          banner_id: this.$route.params.id
        }, function (data) {
          data = data.data;
          _this.data = data;
          console.log(data)
        })
      }
    },
    computed:{

    },
    created(){
      let _this = this;
      if(_this.$route.params.id > 0)_this.getData();
    }
  }
</script>
<style>
  .banner h1{
    margin:40px 0 20px;
  }
  .banner .el-input{
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
