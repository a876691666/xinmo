<template>
  <div>
    <h1 style="margin-top:28px">业务信息</h1>
    <p class="margintop28"><span class="keyStyle">商品发布数量</span>：<span>{{goods_count}}</span></p>
    <p class="margintop28"><span class="keyStyle">被收藏数量</span>：<span>{{favorite_count}}</span></p>
    <p class="margintop28"><span class="keyStyle">商品销售总数量</span>：<span>{{bsales_quantity}}</span></p>
    <p class="margintop28"><span class="keyStyle">销售总额</span>：<span>￥{{bsales_volume}}</span></p>
    <h1 style="margin-top:48px">商家基础信息</h1>
    <el-form :label-position="labelPosition" label-width="130px" style="width:80%">
      <el-form-item label="商家全称" >
        <el-input v-model="fullName" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="商家简称">
        <el-input v-model="tagName"  style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="商家LOGO">
        <el-upload
          action="http://chenchengonghao.com/api/ossStoreImg"
          class="avatar-uploader"
          name="pic"
          :data="{model:2}"
          :show-file-list="false"
          :on-success="logoSuccess"
        >
          <img v-if="logoImg!=''" :src="imageUrl" class="avatar">
          <span v-else class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item label="商家背景图">
        <el-upload
          action="http://chenchengonghao.com/api/ossStoreImg"
          class="avatar-uploader"
          name="pic"
          :show-file-list="false"
          :data="{model:2}"
          :on-success="bgSuccess"
        >
          <img v-if="bgImg!=''" :src="imageUrlbg" class="avatar">
          <span v-else class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="商家电话">
        <el-input type="text" v-model="tel" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item
        label="联系人">
        <el-input type="text" v-model="linkman" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item
        label="开户名">
        <el-input type="text" v-model="openuser" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item
        label="开户行">
        <el-input type="text" v-model="openbank" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item
        label="付款账号">
        <el-input type="text" v-model="openaccount" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item
        label="商家包邮条件">
        <el-input v-model="minmoney" style="width:30%" ></el-input>
      </el-form-item>
      <el-form-item
        label="商家运费">
        <el-input v-model="freight" type="number" style="width:30%" ></el-input>
      </el-form-item>
      <el-form-item label="商家介绍">
        <editor ref="myTextEditor"
                :fileName="'pic'"
                :canCrop="canCrop"
                :uploadUrl="uploadUrl"
                v-model="moren"></editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button type="danger" @click="resetForm" v-if="dataId>0">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import editor from '../../components/quilleditor/Quilleditor.vue'
  export default{
    name:"addMerchant",
    data() {
      return {
        dataId:this.$route.params.id,
        uploadUrl:'http://chenchengonghao.com/api/ossStoreImg',
        moren:'',
        canCrop:false,
        goods_count:0,  // 商品发布数量
        favorite_count:0,  //被收藏数量
        bsales_quantity:0, // 商品销售总数量
        bsales_volume:0,  // 销售总额
        logoImg:'',
        bgImg:'',
        labelPosition: 'left',  // 文字對其方式
        fullName: '',    // 商家全稱
        tagName: '',    // 商家简称
        tel:'',        // 電話
        minmoney:'', // 商家包邮条件
        freight:'', // 商家包邮条件
        openuser:'',//开户人
        openbank:'',// 开户银行
        openaccount:'',   //开户账号
        linkman:''//联系人
      }
    },
    created:function(){
      let _this = this;
      if (_this.$route.params.oper == 'compile'){
        this.postFetch('/api/admin/business/edit',{id:_this.$route.params.id},function(data){
          console.log(data)
          _this.goods_count = data.data.goods_count;
          _this.favorite_count= data.data.favorite_count; //被收藏数量
          _this.bsales_quantity= data.data.bsales_quantity; // 商品销售总数量
          _this.bsales_volume= data.data.bsales_volume;  // 销售总额
          _this.logoImg= data.data.logo_filename;
            _this.bgImg= data.data.background_filename;
            _this.moren= data.data.introduce;  // 富文本
          _this.labelPosition= data.data.labelPosition;  // 文字對其方式
          _this.fullName= data.data.name;    // 商家全稱
          _this.tagName= data.data.short_name;    // 商家简称
          _this.tel= data.data.telephone;        // 電話
          _this.minmoney= data.data.condition ;// 商家包邮条件
          _this.freight= data.data.freight ;// 商家包邮条件
          _this.openuser= data.data.openuser
          _this.openbank= data.data.openbank
          _this.openaccount= data.data.openaccount ;
          _this.linkman= data.data.linkman ;
        },function(e){

        })
      }
    },
    computed:{
      imageUrl(){
        return 'http://sinmore-gonghao.oss-cn-beijing.aliyuncs.com/business/'+this.logoImg;
      },
      imageUrlbg(){
        return 'http://sinmore-gonghao.oss-cn-beijing.aliyuncs.com/business/'+this.bgImg;
      }
    },
    methods: {
      logoSuccess(re) {
        this.logoImg = re.data.filename;
      },
      bgSuccess(re) {
        this.bgImg = re.data.filename;
      },
      submitForm() {
//
        let _this = this;
        let data = {
          id:_this.$route.params.id,
          name:_this.fullName,
          short_name:_this.tagName,
          logo:_this.logoImg,
          background:_this.bgImg,
          introduce:_this.moren,
          telephone:_this.tel,
          condition:_this.minmoney,
          freight:_this.freight,
          openuser:_this.openuser,
          openbank:_this.openbank,
          openaccount:_this.openaccount,
          linkman:_this.linkman,
        };

        let url = (_this.$route.params.oper == 'compile')?'/api/admin/business/update':'/api/admin/business/store';
        this.postFetch(url,data,function(data){
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
            localStorage.clear();
            _this.$router.push({path: '/shop/list'});
          }
        },function(e){})
      },
      resetForm() {
        let _this = this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/api/admin/business/delete',
            {id:_this.$route.params.id},
            function (data) {
              if (data.error_code === 1) {
                _this.$message({
                  type: 'warning',
                  message: '' + data.error_msg + ''
                });
              } else {
                _this.$router.push({path: '/shop/list'});
                this.$message({
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
    },
    components:{
      editor
    }
  }
</script>
<style>
  @import "../../../static/css/merchant/merchant.css";
  .keyStyle{
    width: 100px;
    display: inline-block;
    text-align:left;
  }
  .margintop28{
    margin-top: 28px;
  }
</style>
