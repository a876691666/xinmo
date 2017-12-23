<template>
  <div>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="所属分类">
        <el-select v-model="cid" placeholder="请选择">
          <el-option
            v-for="item in classOp"
            :key="item.articlecategory_id"
            :label="item.title"
            :value="item.articlecategory_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资讯状态">
        <!--statusArr-->
        <el-select v-model="infoStatus"
                   placeholder="请选择活动区域">
          <el-option
            v-for="item in statusArr"
            :key="item.id"
            :label="item.valus"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资讯标题" style="width:30%">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="资讯描述" style="width:30%">
        <el-input type="textarea"
                  v-model="description"></el-input>
      </el-form-item>
      <el-form-item label="作者" style="width:30%">
        <el-input v-model="author"></el-input>
      </el-form-item>
<!--      <el-form-item label="资讯标题" style="width:30%">
        <el-input v-model="title"></el-input>
      </el-form-item>-->
      <el-form-item label="发布时间" style="color:#666">
        {{created_at| formatDate}}
      </el-form-item>
      <el-form-item label="更新时间" style="color:#666">
        {{updated_at| formatDate}}
      </el-form-item>
      <el-form-item style="width:30%;margin-top:18px"
                    label="排序值"
                    prop="age"
                    :rules="[
      { type: 'number', message: '排序值必须为数字值'}
    ]"
      >
        <el-input type="age" v-model.number="sort"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="真实点击量" style="color:#666">
        {{clickNum}}
      </el-form-item>
      <el-form-item style="width:30%;margin-top:18px"
                    label="附加点击量"
                    prop="additional_view"
                    :rules="[
      { type: 'number', message: '点击量必须为数字值'}
    ]"
      >
        <el-input type="age" v-model="additional_view"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload
          class="avatar-uploader"
          action="http://chenchengonghao.com/api/ossStoreImg"
          name="pic"
          :data="{model:8}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="showImg"
               class="avatar">
          <span v-else
                class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item label="发布人头像">
        <el-upload
          class="avatar-uploader"
          action="http://chenchengonghao.com/api/ossStoreImg"
          name="pic"
          :data="{model:7}"
          :show-file-list="false"
          :on-success="handleAvatarSucces2s">
          <img v-if="author_pic" :src="showAuthor_pic"
               class="avatar">
          <span v-else
                class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item label="推荐图">
        <el-upload
          class="avatar-uploader"
          action="http://chenchengonghao.com/api/ossStoreImg"
          name="pic"
          :data="{model:8}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1">
          <img v-if="imageUrl1" :src="showUrl1"
               class="avatar">
          <span v-else
                class="el-icon-plus avatar-uploader-icon"></span>
        </el-upload>
      </el-form-item>
      <el-form-item label="新闻图文详情">

        <editor ref="myTextEditor"
                :fileName="'pic'"
                :canCrop="canCrop"
                :uploadUrl="uploadUrl"
                v-model="moren">

        </editor>

      </el-form-item>
      <el-form-item label="商品关联">
        <el-select v-model="shopGuanLian"
                   multiple
                   filterable
                   remote
                   placeholder="请输入关键词"
                   :remote-method="remoteMethod"
                   @change="jjeje">
          <el-option
            v-for="item in shopOp"
            :key="item.goods_id"
            :label="item.name"
            :value="item.goods_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top:20px">
        <el-button type="primary" @click="onSubmit">保存
        </el-button>
        <el-button type="danger" v-if="id>0" @click="del">删除</el-button>
      </el-form-item>
    </el-form>
    <br/><br/><br/><br/><br/><br/><br/>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  import {mapGetters} from 'vuex'
  import editor from '../../components/quilleditor/Quilleditor.vue'
  export default{
    name: "addConsult",
    filters: {
      formatDate(time) {
        if (time == 0) {
          return '-';
        }
        var date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        author:'',  // 发布人
        author_pic:'',  // 发布人头像
        id:0,
        shopGuanLian: [],
        statusArr: [{id: 0, valus: '未上架'}, {
          id: 1,
          valus: '已上架'
        }],
        sort: 0, // 排序
        shopOp: [],
        moren: '请在此编辑',
        created_at: '',  // 创建时间
        updated_at: '',  // 更新时间
        cid: '',   // 所属分类
        infoStatus: '', // 资讯状态
        title: '',     // 标题
        description: '', // 资讯描述
        clickNum: 0,  //真实点击量
        imageUrl: '',
        imageUrl1: '',
        additional_view: '',
//        restaurants: [],
        state1: '',
        classOp: [],
        postGuanLian: [],
        canCrop: false,  // 编辑器用
        uploadUrl: 'http://chenchengonghao.com/api/ossStoreImg',  // 图片上传地址
      }
    },
    created(){
      let _this = this;
      // 获取分类
      _this.postFetch('/api/allArticle', {}, function (data) {
        _this.classOp = data.data;
      });
      if (_this.$route.params.id != 'no') {
        _this.postFetch('/admin/article/edit/' + _this.$route.params.id + '', {}, function (data) {
          _this.id = _this.$route.params.id;
          _this.cid = data.data.cid;
          _this.infoStatus = data.data.status;
          _this.title = data.data.title;
          _this.description = data.data.description;
          _this.created_at = data.data.created_at;
          _this.updated_at = data.data.updated_at;
          _this.sort = data.data.list_order;
          _this.imageUrl = data.data.thumb;
          _this.imageUrl1 = data.data.recommend_image;
          _this.page_view = data.data.clickNum;
          _this.additional_view = data.data.additional_view;
          _this.moren = data.data.detail;
          _this.shopOp = data.data.get_article_goods;
          _this.author = data.data.author;
          _this.author_pic = data.data.author_pic;
          for (let i = 0; i < data.data.get_article_goods.length; i++) {
            _this.shopGuanLian.push(data.data.get_article_goods[i].goods_id);
            _this.postGuanLian.push(data.data.get_article_goods[i])
          }
        })
      }
    },
    watch: {
      shopGuanLian(n, o){
        let _this = this;
        for (let i = 0;i<this.shopGuanLian.length;i++){
          let open = true;
          for (let q = 0;q <this.postGuanLian.length;q++){
            if (this.postGuanLian[q].goods_id == this.shopGuanLian[i]){
              open = false;
            }
          }
          if (open){
            for (let w = 0;w<_this.shopOp.length;w++){
              if (_this.shopOp[w].goods_id == this.shopGuanLian[i]){
                this.postGuanLian.push(_this.shopOp[w])
              }
            }
          }
        }
        for (let i = 0; i < this.postGuanLian.length; i++) {
          if (this.shopGuanLian.indexOf(this.postGuanLian[i].goods_id) == -1){
            console.log(_this.postGuanLian[i].id);
            if (_this.postGuanLian[i].id){
              _this.postFetch('/admin/article/del_goods',{id:this.postGuanLian[i].id},function(data){
                if (data.error_code ==0){
                  _this.$message({
                    type: 'success',
                    message: '已删除'
                  });
                }
              })
            }
            _this.postGuanLian.splice(i,1);
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        "userData"
      ]),
      showImg(){
        return 'http://sinmore-gonghao.oss-cn-beijing.aliyuncs.com/article/' + this.imageUrl
      },
      showAuthor_pic(){
        return 'http://sinmore-gonghao.oss-cn-beijing.aliyuncs.com/headpic/' + this.author_pic;
      },
      showUrl1(){
        return 'http://sinmore-gonghao.oss-cn-beijing.aliyuncs.com/article/' + this.imageUrl1
      }
    },
    methods: {
      remoteMethod(query) {
        if (query == ''){
          return;
        }
        let _this = this;
        _this.postFetch('/api/admin/goods/skumenu', {
          name: query,
          page: 1,
          pagesize: 300
        }, function (data) {
          console.log(data);
          _this.shopOp = data.data
        });
        console.log(query)
      },
      jjeje(val){
        console.log(val)
      },
      del(){
        let _this = this;
        this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postFetch('/admin/article/del',
            {id:_this.id},
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
                _this.$router.push({path: '/manageInfo/no'});
              }
            },
            function (e) {
              console.log(e)
            }
          )
        }).catch(() => {
        });
      },
      onSubmit(){
        let _this = this;
        let url = 'http://chenchengonghao.com/admin/article/add';
        let obj = {
          cid:_this.cid,
          status:_this.infoStatus,
          title:_this.title,
          description:_this.description,
          sort:_this.sort,
          additional_view:_this.additional_view,
          thumb:_this.imageUrl,
          recommend_image:_this.imageUrl1,
          detail:_this.moren,
//          'correlate_goods':_this.postGuanLian,
          correlate_goods:JSON.stringify(_this.postGuanLian),
          author:_this.author,
          author_pic:_this.author_pic,
          token: _this.userData.token,

        };
        if (_this.$route.params.id != 'no'){
          obj.id = _this.$route.params.id;
          url = 'http://chenchengonghao.com/admin/article/update'
        }
        console.log(obj);
        $.ajax({
          url: url,
          type: 'post',
          data:obj,
          success: function (data) {
            console.log(data);
            if (data.error_code === 0) {

              _this.$message({
                type: 'success',
                message: '' + data.error_msg + ''
              });
              _this.$router.push({path: '/manageInfo/no'});
            }

          }
        });
      },
      handleSelect(item) {
        console.log(item);
      },
      mounted() {
        this.restaurants = this.loadAll();
      },
      handleAvatarSuccess(re) {
        this.imageUrl = re.data.filename;
      },
      handleAvatarSuccess1(re) {
        this.imageUrl1 = re.data.filename;
      },
      handleAvatarSucces2s(re) {
        this.author_pic = re.data.filename;
      }
    },
    components: {
      editor
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
