<template>
  <div>
    <el-form ref="form" label-width="100px"
             label-position="left">

      <el-form-item label="图片名称" style="width:40%">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item style="width:40%;margin-top:18px"
                    label="图片排序"
                    prop="sort"
                    :rules="[
      { type: 'number', message: '排序值必须为数字值'}
    ]"
      >
        <el-input type="age" v-model.number="sort"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片链接指向" style="width:40%">
        <el-input v-model="url"></el-input>
      </el-form-item>
      <el-form-item label="图片APP指向" style="width:40%">
        <p>
          <el-radio v-model="goShop" label="2"
                    style="display: inline-block">商品详情页传
          </el-radio>
          <el-select v-model="goVal"
                     filterable
                     remote
                     placeholder="请输入关键词"
                     :remote-method="remoteMethod"
                     @change="changesss"
                     :disabled="goShop == 1  || goShop== 0">
            <el-option
              v-for="item in skuOP"
              :key="item.sku_id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </p>
        <p>
          <el-radio v-model="goShop" label="1"
                    style="display: inline-block">商品列表页传
          </el-radio>
          <el-select v-model="shopVal" placeholder="请选择"
                     :disabled="goShop == 2 || goShop == 0">
            <el-option
              v-for="item in shopOP"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
        <p>
          <el-radio v-model="goShop" label="0"
                    style="display: inline-block">不跳转
          </el-radio>
        </p>
      </el-form-item>

      <el-form-item label="图片位置选择">
        <el-radio-group v-model="site">
          <el-radio v-model="site" label="1">主页banner
          </el-radio>
          <el-radio v-model="site" label="2">主页中部横图
          </el-radio>
          <el-radio v-model="site" label="3">主页中部banner
          </el-radio>
          <br/>
          <el-radio v-model="site" label="4"
                    style="margin-top:10px">新入住品牌
          </el-radio>
          <el-radio v-model="site" label="5">逛banner
          </el-radio>
          <el-radio v-model="site" label="6">新客专享</el-radio>
          <el-radio v-model="site" label="7">人气推荐</el-radio>
          <el-radio v-model="site" label="8">新品到货</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="点击次数" style="color:#666">
        {{views}}
      </el-form-item>
      <el-form-item label="更新时间" style="color:#666">
        <span v-if="update_time!=null">
          {{update_time}}
        </span>
        <span v-if="update_time==null">
          {{create_time}}
        </span>
      </el-form-item>

      <el-form-item label="图片上传">
        <el-upload
          class="avatar-uploader"
          action="http://chenchengonghao.com/api/ossStoreImg"
          name="pic"
          :data="{model:6}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="showImg"
               class="avatar">
          <span v-else
                class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top:20px">
        <el-button type="primary" @click="onSubmit">保存
        </el-button>
        <el-button type="danger" @click="detal" v-if="id!=0">删除
        </el-button>
      </el-form-item>
    </el-form>
    <br/><br/><br/><br/><br/><br/><br/>
    <div class="line"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default{
    name: "addConsult",
    data() {
      return {
        shopVal: '',
        id: 0,        //id
        imageUrl: '',  // 用于上传图片
        title: '', // 标题
        url: '',    // URl
        views: '',   // 点击次数
        sort: '',  // 排序
        site: '1',  //  位置
        showImg: '',    // 用于显示图片的地址
        update_time: '', // 更新时间
        create_time: '',  // 创建时间
        goShop: '0',  // 选择跳向商品还是SKU
        shopOP: [],  // 选择跳向商品
        skuOP: [],// 选择跳向sku
        goVal:'' //  选择后的值
      }
    },
    created(){
      let _this = this;
      let page = 1;
      let pagesize = 50;
//      跳转分类
      _this.postFetch('/api/admin/category/index', {}, function (data) {
        for (let i = 0; i < data.data.length; i++) {
          _this.shopOP.push(data.data[i])
        }
      }, function () {
      });
      if (this.$route.params.id != 'no') {
        _this.postFetch('/admin/banner/edit', {id: _this.$route.params.id}, function (data) {
          console.log(data)
          _this.title = data.data.title;
          _this.update_time = data.data.update_time;
          _this.create_time = data.data.create_time;
          _this.sort = data.data.sort;
          _this.site = '' + data.data.site + '';
          _this.views = data.data.views;
          _this.url = data.data.url;
          _this.imageUrl = data.data.pic;
          _this.showImg = 'http://sinmore-gonghao.oss-cn-beijing.aliyuncs.com/banner/' + data.data.pic;
          _this.id = data.data.id;
          _this.goShop = '' + data.data.app_page + '';
          if (data.data.page_param.level) {
            _this.shopVal = parseInt(data.data.page_param.cid);
          } else if (data.data.page_param.sku_id) {
            _this.goVal = data.data.page_param.name;
            _this.skuOP.push(data.data.page_param);
          }
        })
      }
    },
    methods: {
      handleAvatarSuccess(re) {
        this.imageUrl = re.data.filename;
        this.showImg = re.data.url;
      },
      onSubmit(){
        let _this = this;
//        console.log(goUrl)
        let obj = {
          title: _this.title,
          pic: _this.imageUrl,
          url: _this.url,
          sort: _this.sort,
          site: _this.site,
          app_page: '',
          param: '',
          token: _this.userData.token

        };
        if (_this.goShop == 0) {
          obj.app_page = 0;
        } else if (_this.goShop == 1) {
          for (let i = 0; i < _this.shopOP.length; i++) {
            if (_this.shopOP[i].id == _this.shopVal) {
              let arr = {
                cid: _this.shopOP[i].id,
                level: _this.shopOP[i].level,
                name: _this.shopOP[i].name
              };
              obj.app_page = 1;
              obj.param = arr;
            }
          }
        } else if (_this.goShop == 2) {
//          console.log('现在是sku');
          if (_this.goVal == '' || _this.goVal == 0) {
//            console.log('现在为空');
            obj.app_page = 0;
          } else {
//            console.log('现在不为空');
            for (let i = 0; i < _this.skuOP.length; i++) {
              if (_this.skuOP[i].name == _this.goVal) {
                let arr = {
                  goods_id: _this.skuOP[i].goods_id,
                  sku_id: _this.skuOP[i].sku_id,
                  name: _this.skuOP[i].name
                };
                obj.app_page = 2;
                obj.param = arr;
              }
            }
          }
        }
        let goUrl =(_this.$route.params.id!='no')?'http://chenchengonghao.com/admin/banner/update':'http://chenchengonghao.com/admin/banner/add';
        if (_this.$route.params.id!='no'){
          obj.id =_this.id
        }
        $.ajax({
          url:goUrl,
          type: 'post',
          data: obj
          , success: function (data) {
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

              _this.$router.push({path: '/adimg'});
            }
          }
        });
      },
      remoteMethod(query) {
        let _this = this;/*
        console.log(_this.goVal);
        console.log(query)*/
        if (_this.goVal == query) {
          return;
        } else {
//          console.log('进入了ajax')
          _this.postFetch('/api/admin/goods/skumenu', {
            name: query,
            page: 1,
            pagesize: 300
          }, function (data) {
            _this.skuOP = [];
            for (let i = 0; i < data.data.length; i++) {
              _this.skuOP.push(data.data[i]);
            }
          })
        }

      },
      detal(){
        let _this = this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/banner/del',
            {id: _this.$route.params.id},
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
                _this.$router.push({path: '/adimg'});
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      },
      changesss(va){
//        console.log(va)
      }
    },
    computed:{
      ...mapGetters([
        "userData"
      ])
    }
  }
</script>
<style>
  @import "../../../static/css/order/addConsult.css";

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
