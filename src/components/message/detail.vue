<template>
  <div class="message">
    <h1>会员基本资料</h1>
    <el-form  label-width="120px" style="width:60%" label-position="left">
      <el-form-item label="资讯标题">
        <el-input v-model="data.title" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="资讯描述">
        <el-input type="textarea" v-model="data.content" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="data.author" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" v-if="data.id > 0">
        {{data.create_time}}
      </el-form-item>
      <el-form-item label="更新时间" v-if="data.id > 0">
        {{data.update_time}}
      </el-form-item>
      <el-form-item label="排序值">
        <el-input v-model="data.sort" style="width:30%" type="text"></el-input>
      </el-form-item>
      <el-form-item label="真实点击量">
        <el-input v-model="data.hits" style="width:30%" type="text"></el-input>
      </el-form-item>
      <el-form-item label="附加点击量">
        <el-input v-model="data.add_hits" style="width:30%" type="text"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <span class="upData" @click="clickUpFile">
          <img :src="data.pic_thumb" alt="" style="width:100%;height:100%;">
        </span>
          <input type="file" ref="fileInput"
                 style="display: none;" id="img-upload"
                 accept="image/*"/>
      </el-form-item>
      <el-form-item label="推荐位">
        <el-radio class="radio" v-model="data.class_id" :label="item.id" v-for="(item, key) in adminGroupArr">{{item.value}}</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button v-if="data.id>0" @click="delClick(data)">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "message",
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
          class_id:0
        },
        type:this.$route.params.type,
        stateList:['未认证', '审核通过', '审核中', '审核被拒绝'],
        adminGroupArr:[{
          id:1,
          value:"用户协议"
        },{
          id:2,
          value:"关于我们"
        },{
          id:3,
          value:"活动"
        }]
      }
    },
    methods: {
      clickUpFile(){
        this.$refs.fileInput.click()
      },
      save(){
        var update = '/admin/message/update';
        var add = '/admin/message/add';
        let _this = this;
        let filess = _this.$refs.fileInput;
        var obj = {
          title:this.data.title,
          author:this.data.author,
          class_id:this.data.class_id,
          content:this.data.content,
          add_hits:this.data.add_hits,
          sort:this.data.sort,
        }
        if(filess.files.length) obj.pic_thumb = filess.files[0];
        if(_this.$route.name == 'messageEdit') obj.message_id = this.data.id;
        this.postFetch(_this.$route.name == 'messageEdit' ? update : add, obj, function (data) {
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
            window.location.href = '/#/messageList/no/no';
          }
        })
      },
      delClick(data){
        let _this = this;
        this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/message/delete',
            {message_id: data.id},
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
                window.location.href = '/#/messageList/no/no';
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      },
      handleAvatarSuccess(){
        this.data.pic_thumb = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getData(){
        let _this = this;
        this.postFetch('/admin/message/detail', {
          message_id: this.$route.params.id
        }, function (data) {
          data = data.data;
          _this.data = data;
          console.log(data)
        })
      },
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
  .message h1{
    margin:40px 0 20px;
  }
  .message .el-input{
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
