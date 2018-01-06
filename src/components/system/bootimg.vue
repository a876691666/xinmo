<template>
<div>
		<p>请上传最新一张启动图（750*1334）</p>
    <el-form  label-width="120px" style="width:60%" label-position="left">
			<el-form-item label="图片上传">
				<span class="upData" @click="clickUpFile">
					<img :src="bootimg" alt="" style="width:100%;height:100%;">
				</span>
					<input type="file" ref="bootimg"
								 style="display: none;" id="img-upload"
								 accept="image/*"/>
			</el-form-item>
		</el-form>
		<el-button type="primary" style="margin-top:28px" @click="baocun">保存</el-button>
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"startImg",
    data() {
      return {
        imageUrl:'',
        id:'',
				bootimg:''
      };
    },
    created(){
      let _this = this;
      _this.postFetch('/admin/system/detail',{
        id:3
      },function(data){
        console.log(data);
        _this.bootimg = data.data.bootimg;
      })
    },
    methods: {
      clickUpFile(){
        this.$refs.bootimg.click()
      },
      baocun(){
        let _this = this;
				let obj = {};
				obj.bootimg = _this.$refs.bootimg.files[0];
        this.postFetch('/admin/system/update', obj,function(data){
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
.upData {
	width: 120px;;
	height: 120px;;
	float: left;
	background:url("/static/came_03.jpg")no-repeat;
	background-size: 100% 100%;
}
	@import "../../../static/css/order/order.css";
</style>
