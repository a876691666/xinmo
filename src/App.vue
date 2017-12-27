<template>
  <div>
    <div v-if="!show">
      <header>
        <div class="inner">
          <div class="login-logo"></div>
        </div>
      </header>
      <div class="main">
        <div class="inner">
          <div class="mainLeft"></div>
          <div class="mainRight">
            <p class="login-Title">
              欢迎进入新墨后台系统
            </p>
            <input type="text" placeholder="请输入您的用户名"
                   v-model="userName">
            <input type="password" placeholder="请输入您的登录密码"
                   v-model="pwd">
            <div class="yzmBox">
              <input type="text" placeholder="请输入验证码"
                    v-model="yzm">
              <canvas id="yzmCanvas" width="90" height="40"></canvas>
            </div>
            <a class="login-btn" @click="login">登录</a>
          </div>
        </div>
      </div>
      <footer>
        <div class="inner">
          <p>网站地图 | 友情链接 新墨（北京）科技有限公司 All Rights Reserved
            京ICP备16057764号</p>
          <p>地址：丰台区宋家庄苇子坑149号庄子商务楼北楼一层新墨公司
            电话：010-80444845</p>
        </div>
      </footer>
    </div>
    <div class="stageWarp" v-if="show">
      <div class="header">
        <headerText></headerText>
        <div class="user">
          欢迎您！{{userData.user_name}}<a @click="logout">退出登录</a></div>
      </div>
      <div class="sidebar">
        <div class="logo">福到出行后台</div>
        <el-menu default-active="2"
                 class="navself el-menu-vertical-demo"
                 @open="handleOpen" @close="handleClose">
          <!-- 订单结算 -->
          <el-submenu index="1" v-if="ddgl" class="se">
            <template slot="title" class="se">
              订单管理
            </template>
            <el-menu-item index="1-1" class="se">
              <template slot="title" class="se">
                <router-link class="routerLink"
                             to="/orderList/no/no">订单管理
                </router-link>
              </template>
            </el-menu-item>

            <el-menu-item index="1-2" class="se">
              <template slot="title" class="se">
                <router-link class="routerLink"
                             to="/invoiceList/no/no">发票管理
                </router-link>
              </template>
            </el-menu-item>
            <el-menu-item index="1-3" class="se">
              <template slot="title" class="se">
                <router-link class="routerLink"
                             to="/salaryList/no/no">司机工资结算
                </router-link>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 会员管理 -->
          <el-submenu index="2" v-if="hygl" class="se">
            <template slot="title">
              <router-link to="/vip/no"
                           class="routerLink">会员管理
              </router-link>
            </template>
            <el-menu-item index="2-1" class="se">
              <template slot="title" class="se">
                <router-link class="routerLink"
                             to="/manageInfo/no">乘客会员
                </router-link>
              </template>
            </el-menu-item>
            <el-submenu index='2-2'>
              <template slot="title">
                <router-link to="/vip/no"
                             class="routerLink">司机会员
                </router-link>
              </template>
              <el-menu-item index="2-2-1" class="se">
                <template slot="title" class="se">
                  <router-link class="routerLink"
                               to="/manageInfo/no">司机会员详情
                  </router-link>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <!-- 内容管理 -->
          <el-submenu v-if="nrgl" index="5">
            <template slot="title" class="se">
              内容管理
            </template>
            <el-menu-item index="5-1" class="se">
              <template slot="title" class="se">
                <router-link class="routerLink"
                             to="/manageInfo/no">资讯管理
                </router-link>
              </template>
            </el-menu-item>
            <el-menu-item index="5-2" class="se">
              <template slot="title" class="se">
                <router-link class="routerLink"
                             to="/infoClass">资讯分类管理
                </router-link>
              </template>
            </el-menu-item>
            <el-menu-item index="5-3-1" class="se">
              <template slot="title" class="se">
                <router-link class="routerLink"
                             to="/adimg">广告图片管理
                </router-link>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu v-if="qxgl" index="7">
            <template slot="title">
              <a class="routerLink">权限管理</a>
            </template>
            <el-menu-item index="7-1" v-if="bbgl" class="se">
              <router-link to="/power" class="routerLink">
                管理员列表
              </router-link>
            </el-menu-item>
            <el-menu-item index="7-2" v-if="bbgl" class="se">
              <router-link to="/adminTeam" class="routerLink">
                管理员组列表
              </router-link>
            </el-menu-item>
          </el-submenu>
          <!-- 其他管理 -->
          <el-submenu v-if="qtgl" index="8">
            <template slot="title">
              其他管理
            </template>
            <el-menu-item index="8-1" v-if="bbgl" class="se">
              <router-link to="/hot" class="routerLink">
                热搜管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="8-2" v-if="bbgl" class="se">
              <router-link to="/edition" class="routerLink">
                版本管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="8-3" v-if="fwfkbd" class="se">
              <router-link to="/feedback"
                           class="routerLink">
                服务反馈表单
              </router-link>
            </el-menu-item>
            <el-menu-item index="8-4" v-if="qdtgl" class="se">
              <router-link to="/startImg"
                           class="routerLink">
                启动图管理
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="main">
        <router-view class="view"></router-view>
      </div>
      <div class="footer">
        本系统由 新墨 提供技术支持
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapActions, mapGetters} from "vuex";

  function delAllCookie() {
    var myDate = new Date();
    myDate.setTime(-1000); //设置时间
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
      var varName = dataArray[i].split("=");
      document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
    }
  }

  function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
      c_name +
      "=" +
      JSON.stringify(value) +
      (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
  }

  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  }

  function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }

  import Vue from "vue";
  import headerText from "./components/headerText/headerText.vue";

  export default {
    name: "app",
    data() {
      return {
        loginSuccess: false,
        radio: "1",
        userName: "",
        pwd: "",
        show: false,
        ddgl: true,
        hygl: true,
        spgl: true,
        flgl: true,
        plglsp: true,
        plglzx: true,
        nrgl: true,
        sjgl: true,
        qxgl: true,
        rsgl: true,
        bbgl: true,
        fwfkbd: true,
        qdtgl: true,
        qtgl: true,
        yzm:''
      };
    },
    created() {
      let userCookie = getCookie("userCookie");
      if (userCookie != null && userCookie != "") {
        console.log("有缓存");
        this.getUser(userCookie);
        this.show = true;
      }
    },
    mounted(){
      var _this = this;
      var yzmCanvas=document.getElementById('yzmCanvas');
      function rand(){
          var str="abcdefghijklmnopqrstuvwxyz0123456789";
          var arr=str.split("");
          var validate="";
          var ranNum;
          for(var i=0;i<4;i++){
              ranNum=Math.floor(Math.random()*36);   //随机数在[0,35]之间
              validate+=arr[ranNum];
          }
          return validate;
      }

      /*干扰线的随机x坐标值*/
      function lineX(){
          var ranLineX=Math.floor(Math.random()*90);
          return ranLineX;
      }

      /*干扰线的随机y坐标值*/
      function lineY(){
          var ranLineY=Math.floor(Math.random()*40);
          return ranLineY;
      }

      function clickChange(){
          var yzmCanvas=document.getElementById('yzmCanvas');
          var cxt=yzmCanvas.getContext('2d');
          cxt.fillStyle='#000';
          cxt.fillRect(0,0,90,40);

          /*生成干扰线20条*/
          for(var j=0;j<20;j++){
              cxt.strokeStyle='#fff';
              cxt.beginPath();    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
              cxt.moveTo(lineX(),lineY());
              cxt.lineTo(lineX(),lineY());
              cxt.lineWidth=0.5;
              cxt.closePath();
              cxt.stroke();
          }

          cxt.fillStyle='red';
          cxt.font='bold 20px Arial';
          cxt.fillText(_this._yzm = rand(),25,25);   //把rand()生成的随机数文本填充到canvas中
      }

      clickChange();

      /*点击验证码更换*/
      yzmCanvas.onclick=function(e){
          e.preventDefault();   //阻止鼠标点击发生默认的行为
          clickChange();
      };
    },
    methods: {
      login() {
        if (this.userName == "") {
          this.$message({
            type: "warning",
            message: "请输入用户名"
          });
        } else if (this.pwd == "") {
          this.$message({
            type: "warning",
            message: "请输入密码"
          });
        } else if (this._yzm != this.yzm) {
          this.$message({
            type: "warning",
            message: "验证码错误或未输入"
          });
        } else {
          let _this = this;
          _this.postFetch(
            "/admin/adminLogin",
            {
              username: _this.userName,
              password: _this.pwd
            },
            function (data) {
              if (data.error_code == 1) {
                _this.$message({
                  type: "warning",
                  message: "" + data.error_msg + ""
                });
              } else {
                _this.show = true;
                setCookie("userCookie", data.data, 1);
              }
            }
          );
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        clearAllCookie();
        //
        let _this = this;
        _this.postFetch("/admin/adminLogout", {}, function (data) {
          location.reload();
        });
      },
      ...mapActions(["getUser"])
    },
    components: {
      headerText
    },
    computed: {
      ...mapGetters(["userData"])
    }
  };
</script>
<style>
  @import "../static/css/index/index.css";
  @import "../static/css/index/navself.css";
  @import "../static/css/login/css/common.css";
  @import "../static/css/login/css/gxkgg.css";
  @import "../static/css/login/css/login.css";
</style>
