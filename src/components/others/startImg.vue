<template>
<div>
		<p>请上传最新一张启动图（750*1334）</p>
<el-upload
          class="avatar-uploader"
          action="http://chenchengonghao.com/api/ossStoreImg"
          name="pic"
          :data="{model:9}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="showImg" class="avatar">
          <span v-else class="el-icon-plus avatar-uploader-icon"></span>
          </el-upload>
		<el-button type="primary" style="margin-top:28px" @click="baocun">保存</el-button>
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"startImg",
    data() {
      return {
        imageUrl:'',
        id:''
      };
    },
    created(){
      let _this = this;
      _this.postFetch('/api/admin/bootpage/edit',{
        id:3
      },function(data){
        console.log(data);
        _this.imageUrl = data.data.filename;
        _this.id = data.data.id;
      })
    },
    computed:{
      showImg(){
        return 'http://sinmore-gonghao.oss-cn-beijing.aliyuncs.com/bootpage/'+this.imageUrl
      }
    },
    methods: {
      baocun(){
        let _this = this;
        this.postFetch('/api/admin/bootpage/update',{
          id:_this.id,
          pic:_this.imageUrl
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
      },
       handleAvatarSuccess(re) {
        this.imageUrl = re.data.filename;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 750 / 1334 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!,且宽度不能超过750,高度不能超过1334');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style type="text/css">
	@import "../../../static/css/order/order.css";
</style>
