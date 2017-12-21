<template>
	<el-container class="login" v-set-title="name">
		<el-header height="115px">
			<img src="../assets/logo.png" alt="LOGO">
		</el-header>
		<el-main>
			<el-row :gutter="10">
				<el-col :offset="6" :span="2" class="key">用户名：</el-col>
				<el-col :span="6"><el-input v-model="user_name" placeholder="请输入内容"></el-input></el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :offset="6" :span="2" class="key">密码：</el-col>
				<el-col :span="6"><el-input v-model="parssword" placeholder="请输入内容"></el-input></el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :offset="6" :span="2" class="key">验证码：</el-col>
				<el-col :span="6">
					<el-row :gutter="20">
						<el-col :span="16" class="key"><el-input v-model="yzm" placeholder="请输入内容"></el-input></el-col>
						<el-col :span="8" class="key"><img class="yzm" src="../assets/logo.png" alt="图形验证码"></el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :offset="6" :span="6">
					<router-link to="/">
						<el-button size="mini" class="login_submit">登录</el-button>
					</router-link>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
import setTitle from '@/directive/title.js'
export default {
	name:'login',
	components:{
		setTitle
	},
  data () {
    return {
			name:'登录',
			user_name:'',
			parssword:'',
			yzm:''
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login .key{
	font-size:24px;
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.login .el-main{
	padding-top:130px;
}
.login .el-main > .el-row{
	margin-bottom: 30px;
}
.login .el-header{
	padding:20px;
}
.yzm{
	width:100%;
	height:40px;
}
.login_submit{
	padding-left:35px;
	padding-right:35px;
	background-color:#333333;
	color:#fff;
}
</style>
