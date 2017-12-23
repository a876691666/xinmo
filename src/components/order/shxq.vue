<template>
  <div class="shxq">
    <div class="item" v-for="(item,index) in dataArr">
      <h2>{{item.goods_name}}</h2>
      <p style="margin-top:20px">所属订单号：<span>{{item.order_sn}}</span>
      </p>
      <h1 style="margin-top:20px">
        <span v-if="item.status == 1">售后处理中</span>
        <span v-if="item.status == 3">待退款</span>
        <span v-if="item.status == 2">已完成</span>
        <span v-if="item.status == 0">已完成</span>
        &nbsp;&nbsp;&nbsp;&nbsp;申请时间：{{item.create_time}}
      </h1>
      <p style="margin-top:20px">申请类型：<span>{{typeArr[item.type]}}</span>
      </p>
      <p>申请退款数量：<span>x2</span></p>
      <p>退款原因：<span>{{item.reason}}</span></p>
      <p>退款说明：<span>{{item.remark}}</span></p>
      <p>上传凭证：</p>
            <div style="margin-top:20px">
              <el-upload
                class="avatar-uploader"
                :file-list="item.picArr"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePictureCardPreview"
                list-type="picture-card">
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
      <el-form label-position="left" label-width="80px"
               style="width:30%;margin-top:28px"
               v-if="item.status == 1">
        <el-form-item label="处理意见">
          <el-input type="textarea"
                    v-model="feTextarea"></el-input>
        </el-form-item>
        <el-form-item
          label="退款金额">
          <el-input type="text" v-model="postMoney"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(item.id)">
            同意退款
          </el-button>
          <el-button type="danger" @click="resetForm(item.id)">
            拒绝退款
          </el-button>
        </el-form-item>
      </el-form>
      <div style="margin-left:10px;margin-top:28px;"
           v-if="item.status !=1">
        <p>处理意见<span style="margin-left:30px"
                     v-if="item.status == 3 ||item.status == 2">【同意退款】</span>
        </p>
        <p>处理意见<span style="margin-left:30px"
                     v-if="item.status == 0">【拒绝退款】</span>
        </p>
        <p class="duan">退款金额：￥:{{item.total}}</p>
        <p class="duan">处理意见：{{item.result}}</p>
        <p class="duan">
          操作时间：<span>{{item.update_time}}</span></p>
        <p class="duan">操作人：<span>{{item.admin_name}}</span>
        </p>
        <el-button type="primary" @click="queren(item.id)"
                   size="small"
                   style="margin-left:10px;margin-top:20px"
                   v-if="item.status == 3">确认本次退款
        </el-button>
      </div>
      <div style="margin-left:10px;margin-top:28px;"
           v-if="item.status == 2">
        <p>退款操作<span style="margin-left:30px">{{stateArr[item.status]}}</span>
        </p>
        <p class="duan">
          操作时间：<span>{{item.update_time}}</span></p>
        <p class="duan">操作人：<span>{{item.admin_name}}</span>
        </p>
      </div>
      <hr>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: "shxq",
    data() {
      return {
        dataArr: [],
        feTextarea: '',
        stateArr: ['不同意', '处理中', '同意', '待退款'],
        typeArr: ['退货', '换货'],
//        create_time:'',    // 申请时间
        dialogImageUrl: '',
        dialogVisible: false,
        postMoney: 0
      };
    },
    created(){
      this.getData();
    },
    methods: {
//  /admin/refund/sure
      submitForm(num) {
        let _this = this;
        _this.postFetch('/admin/refund/change', {
          refund_id: num,
          result: _this.feTextarea,
          total: _this.postMoney
        }, function (data) {
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
            _this.getData();
          }
        })
      },
      resetForm(num) {
        let _this = this;
        _this.postFetch('/admin/refund/change', {
          refund_id:num,
          result: _this.feTextarea
        }, function (data) {
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
            _this.getData();
          }
        })
      },
      queren(num){
        let _this = this;
        _this.postFetch('/admin/refund/sure',{
          refund_id:num
        },function(data){
          console.log(data);
          if (data.error_code === 1) {
            _this.$message({
              type: 'warning',
              message: '' + data.error_msg + ''
            });
          } else {
            _this.getData();
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getData(){
        let _this = this;
        _this.postFetch('/admin/refund/detail', {
          order_goods_id: this.$route.params.id
        }, function (data) {
          _this.dataArr = data.data;
          for (let i=0;i<_this.dataArr.length;i++){
            let picArr = [];
            for (let q = 0;q<_this.dataArr[i].refund_pic.length;q++){
              let pic={
                url:_this.dataArr[i].refund_pic[q]
              }
              picArr.push(pic)
            }
            _this.$set(_this.dataArr[i], 'picArr', picArr)
          }
        })
      }
    }
  }
</script>
<style>
  @import "../../../static/css/order/shxq.css";

  .shxq .el-upload--picture-card {
    display: none;
  }

  .shxq .el-upload-list__item-delete {
    display: none !important;
  }
</style>
