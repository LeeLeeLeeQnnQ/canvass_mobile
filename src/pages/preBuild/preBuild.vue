<template>
  <div class="pre-build">
    <CHeader></CHeader>
    <div class="pre-build_box scrollBox" ref="scrollBox">
      <cube-scroll
        ref="scroll">
        <div class="pre-build_customer-info">
          <h3 class="pre-build_customer-info-h3">预建档</h3>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">店铺名称：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.store_name" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">签约时间：</span>
            <span 
              class="pre-build_customer-info-item-span pre-build_customer-info-item-time"
              @click= "selectSignDate"
            >{{preBuildInfo.sign_date}}</span>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">客户ID：</span>
            <cube-input disabled class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.customer_id" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">店主姓名：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.shopkeeper" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">店铺电话：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.shopkeeper_phone" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <cube-input
              class="pre-build_customer-info-item-span pre-build_customer-info-item-input"
              placeholder="搜索招商经理"
              v-model="customer_query" >
            </cube-input>
            <cube-button
              @click="queryEmployee"
              class="pre-build_customer-info-btnbox-button"
              :primary="true"
              :inline="true">
              搜索
            </cube-button>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">招商经理：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" :readonly="true" v-model="preBuildInfo.manage_lease" >
            </cube-input>
          </div>
<!--           <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">招商经理：</span>
            <cube-select
              class="pre-build_customer-info-item-span pre-build_customer-info-item-input"
              v-model="preBuildInfo.manage_lease_id"
              placeholder="请选择"
              :options="leasingList">
            </cube-select>
          </div> -->

          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">所属厨房：</span>
            <cube-select
              class="pre-build_customer-info-item-span pre-build_customer-info-item-input"
              v-model="preBuildInfo.kitchen_id"
              placeholder="请选择"
              @change="kitchenChange"
              :options="kitchenList">
            </cube-select>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">档口选择：</span>
            <cube-select
              class="pre-build_customer-info-item-span pre-build_customer-info-item-input"
              v-model="preBuildInfo.store_no"
              placeholder="请选择"
              v-if="shopList.length > 0"
              :options="shopList">
            </cube-select>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">月租金：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.month_rent" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">押金：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.deposit_fee" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">入场费：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.entrance_fee" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">增容费：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.zr_fee" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">收费周期：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.rent_bill" >
            </cube-input>
          </div>
          <div class="pre-build_customer-info-item" >
            <span class="pre-build_customer-info-item-span">首期期数：</span>
            <cube-input class="pre-build_customer-info-item-span pre-build_customer-info-item-input" v-model="preBuildInfo.rent_start" >
            </cube-input>
          </div>
          <div class="pre-build_card-info-item">
            <p class="pre-build_card-info-item-title">转账凭证</p>
          </div>
          <div class="pre-build_card-info-warp">
            <div class="pre-build_card-info-warp-item" v-for="item in pay">
              <div class="pre-build_card-info-warp-item-img">
                <img :src="item" @click="showImagePreview(item)">
                <span @click="removeImg(item,'pay')" class="pre-build_card-info-warp-item-img-remove">×</span>
              </div>
            </div>
            <div class="pre-build_card-info-warp-item">
              <a class="file">
                  <span>╋</span>
                  <input ref="payFile" type="file" accept="image" @change="payUpload">
              </a>
            </div>
          </div>
          <div class="pre-build_card-info-item">
            <p class="pre-build_card-info-item-title">合同资料</p>
          </div>
          <div class="pre-build_card-info-warp">
            <div class="pre-build_card-info-warp-item" v-for="item in contract">
              <div class="pre-build_card-info-warp-item-img">
                <img :src="item" @click="showImagePreview(item)">
                <span @click="removeImg(item,'contract')" class="pre-build_card-info-warp-item-img-remove">×</span>
              </div>
            </div>
            <div class="pre-build_card-info-warp-item">
              <a class="file">
                  <span>╋</span>
                  <input ref="contractFile" type="file" accept="image" @change="contractUpload">
              </a>
            </div>
          </div>

          <div class="pre-build_customer-info-btnbox" >
            <cube-button
              @click="submitInfo"
              class="pre-build_customer-info-btnbox-button"
              :primary="true"
              :inline="true">
              提交
            </cube-button>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import { getScorllBoxHeight , imgPreview  } from "@/js/util.js";
import { getKitchenList , getLeasingList , getManageList , getStoreNoList , uploadImg , queryEmployee } from '@/api/data'
import { setPreBuild } from '@/api/info'
export default {
  name: 'preBuild',
  components: {
    CHeader
  },
  data () {
    return {
      customer_query:'',
      preBuildInfo:{
        sign_date:'',
        manage_lease:'',
      },
      pay:[],
      contract:[],
      // 下拉数据
      kitchenList:[],
      leasingList:[],
      manageList:[],
      shopList:[],
    }
  },
  methods: {
    showLeasePicker() {
      if (!this.leasePicker) {
        this.leasePicker = this.$createPicker({
          title: '招商经理',
          data: [this.leasingList],
          onSelect: this.selectLeaseHandle,
          onCancel: this.cancelLeaseHandle
        })
      }
      this.leasePicker.show()
    },
    selectLeaseHandle(selectedVal, selectedIndex, selectedText){
      this.preBuildInfo.manage_lease_id = selectedVal[0]
      this.preBuildInfo.manage_lease = selectedText[0]
    },
    cancelLeaseHandle(){

    },
    queryEmployee(){
      if(!this.customer_query){
        this.showToast('不能为空！')
        return
      }
      getLeasingList({keyword:this.customer_query}).then(res => {
        const dbody = res.data
        this.remoteLoading = false;
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let arr = [];
        let list =  dbody.data || [];
        list.forEach((item)=>{
          let obj = {};
          obj.value = item.id+'';
          obj.text = item.fullname;
          arr.push(obj)
        });
        this.leasingList = arr;
        this.showLeasePicker();
      })
    },
    initInfo(){
      this.getKitchenList()
      // this.getLeasingList()
      // this.getManageList()
    },
    // 厨房列表
    getKitchenList(){
      this.shopList = [];
      getKitchenList().then(res => {
        const dbody = res.data;
        if(dbody.code !=  0){
          this.showToast(dbody.msg)
          return
        }
        let arr = [];
        let list =  dbody.data || [];
        list.forEach((item)=>{
          let obj = {};
          obj.value = item.id+'';
          obj.text = item.kitchen_name;
          obj.manage_name = item.manage_name;
          arr.push(obj)
        });
        this.kitchenList = arr;
      }) 
    },
    // 厨房改变
    kitchenChange(){
      if(!this.preBuildInfo.kitchen_id){
        return
      }
      let id = this.preBuildInfo.kitchen_id;
      this.kitchenList.forEach( (item)=>{
        if (item.value == id) {
          this.preBuildInfo.manage_name = item.manage_name
        }
      })
      this.shopList = [];
      this.getStoreNoList(id);
    },
    // 招商列表
    // getLeasingList(){
    //   getLeasingList().then(res => {
    //     const dbody = res.data;
    //     if(dbody.code !=  0){
    //       this.showToast(dbody.msg)
    //       return
    //     }
    //     let arr = [];
    //     let list =  dbody.data || [];
    //     list.forEach((item)=>{
    //       let obj = {};
    //       obj.value = item.id+'';
    //       obj.text = item.fullname;
    //       arr.push(obj)
    //     });
    //     this.leasingList = arr;
    //   })
    // },
    // 店内列表
    // getManageList(){
    //   getManageList().then(res => {
    //     const dbody = res.data;
    //     if(dbody.code !=  0){
    //       this.showToast(dbody.msg)
    //       return
    //     }
    //     let arr = [];
    //     let list =  dbody.data || [];
    //     list.forEach((item)=>{
    //       let obj = {};
    //       obj.value = item.id+'';
    //       obj.text = item.fullname;
    //       arr.push(obj)
    //     });
    //     this.manageList = arr;
    //   })
    // },
    // 签约时间
    selectSignDate() {
      this.dateSignPicker = null;
      this.dateSignPicker = this.$createDatePicker({
        title: '签约时间',
        value: new Date(),
        onSelect: this.selectSignHandle,
      })
      this.dateSignPicker.show()
    },
    // 签约时间选择
    selectSignHandle(date, selectedVal, selectedText) {
      selectedVal[1] = selectedVal[1] < 10 ? '0' + selectedVal[1] : selectedVal[1];
      selectedVal[2] = selectedVal[2] < 10 ? '0' + selectedVal[2] : selectedVal[2];
      this.preBuildInfo.sign_date = selectedVal.join('-');
    },
    // 获取厨房下档口
    getStoreNoList(kitchen_id){
      let obj = { kitchen_id:kitchen_id }
      getStoreNoList( obj ).then(res => {
        const dbody = res.data
        this.shopList = dbody.data
      })
    },
    // 展示图片
    showImagePreview(img) {
      this.currentImgs = [];
      this.currentImgs.push(img)
      this.$createImagePreview({
        imgs: this.currentImgs
      }).show()
    },
    // 删除图片
    removeImg(file,name){
      this[name].splice(this[name].indexOf(file), 1)
    },
    // 接受图片
    postImg (obj,$file,list) {
      uploadImg(obj).then(res => {
        $file.value = ''
        let data = res.data;
        if(data.code != 0){
          this.showToast(data.msg)
          return
        }
        list.push(data.data)
      })
    },
    // 上传财务照片
    payUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      imgPreview(picValue,this,this.postImg,this.$refs.payFile,this.pay);
    },
    // 上传合同凭证图片
    contractUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      imgPreview(picValue,this,this.postImg,this.$refs.contractFile,this.contract);
    },
    // 提交验证器
    submitValidateField(obj) {
      obj.store_name = obj.store_name.trim()
      let priceReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (!obj.store_name) {
        this.showToast('请输入正确标题！')
        return false
      }
      if (!obj.sign_date) {
        this.showToast('请选择正确签约时间！')
        return false
      }
      if (!obj.shopkeeper) {
        this.showToast('请输入正确店主信息！')
        return false
      }
      let phoneReg = /^1\d{10}$/
      if (!obj.shopkeeper_phone || !phoneReg.test(obj.shopkeeper_phone)) {
        this.showToast('请输入正确店主手机号！')
        return false
      }
      if (!obj.manage_lease_id || !obj.manage_lease) {
        this.showToast('请选择招商经理！')
        return false
      }
      if (!obj.kitchen_id) {
        this.showToast('请选择厨房！')
        return false
      }
      if (!obj.store_no) {
        this.showToast('请选择档口号！')
        return false
      }else{
        let key = false;
        this.shopList.forEach((item)=>{
          if( obj.store_no == item ){
            key = true
          }
        });
        if(!key){
          this.showToast('请选择档口号！')
          return false
        }
      }
      if (obj.pay.length <= 0) {
        this.showToast('请上传财务凭证！')
        return false
      }
      if (obj.pay.contract <= 0) {
        this.showToast( '请上传合同凭证！')
        return false
      }
      if (!obj.rent_bill || isNaN(obj.rent_bill)) {
        this.showToast( '请填写房租账单周期！')
        return false
      }
      if (!obj.rent_start || isNaN(obj.rent_start)) {
        this.showToast( '请填写首期起租缴纳房租期数！')
        return false
      }
      if (!obj.month_rent || obj.month_rent * 1 <= 0 || !priceReg.test(obj.month_rent)) {
        this.showToast( '请输入正确租金！')
        return false
      };
      if (!obj.deposit_fee || obj.deposit_fee * 1 <= 0 || !priceReg.test(obj.deposit_fee)) {
        this.showToast( '请输入正确押金！')
        return false
      };
      if ( obj.entrance_fee * 1 < 0 || !obj.entrance_fee ||  !priceReg.test(obj.entrance_fee)) {
        this.showToast( '请输入正确入场费！')
        return false
      };
      if ( obj.zr_fee * 1 < 0 || !obj.zr_fee ||  !priceReg.test(obj.zr_fee)) {
        this.showToast( '请输入正确增容费！')
        return false
      };
      return true
    },
    // 提交按钮
    submitInfo(){
      let obj = Object.assign({},this.preBuildInfo);
      obj.pay = this.pay;
      obj.contract = this.contract;
      this.leasingList.forEach((item)=>{
        if(item.value == obj.manage_lease_id){
          obj.manage_lease = item.text
        }
      })
      this.kitchenList.forEach((item)=>{
        if(item.value == obj.kitchen_id){
          obj.kitchen_name = item.text
        }
      })
      if (this.submitValidateField(obj)) {
        this.setOrderInfo(obj)
      }
    },
    // 发送数据
    setOrderInfo (info) {
      info.pay = info.pay.join(",")
      info.contract = info.contract.join(',')
      setPreBuild(info).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.showToast('预创建完成！')
          setTimeout(()=>{
            this.$router.go(-1)
          }, 1500)
        } else {
          this.showToast(dbody.msg)
        }
      })
    },
  },
  created(){
    this.initInfo();
    this.preBuildInfo.customer_id = this.$route.query.customer_id;
  },
  mounted(){
    this.$nextTick(() => {
      getScorllBoxHeight(this.$refs.scrollBox);
    })
  },
}
</script>
<!-- reset -->
<style lang="less">
  .pre-build_customer-info-item-span{
    .cube-input-field{
      text-align: right;
    }
  }
</style>
<!-- scoped -->
<style scoped lang="less">
  .scrollBox{
    background-color: #ddd;
    box-sizing: border-box;
  }
  .pre-build{
    height: 100%;
    width: 100%;
    &_customer-info{
      box-sizing: border-box;
      width: 100%;
      padding: 0.5rem;
      padding-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin: 0 auto;
      background-color: rgba(0,0,0,0.5);
      &-h3{
        margin: 0.5rem 0;
        text-indent: center;
        color: #fff;
        font-size: 0.7rem;
      }
      &-item{
        width: 100%;
        color: #fff;
        height: 1.5rem;
        display: flex;
        box-sizing: border-box;
        padding: 0 0.2rem;
        align-items: center;
        justify-content: space-between;
        span{
          font-size: 0.5rem;
        }
        &-input{
          width: 50%;
        }
        &-time{
          width: 50%;
          background-color: #fff;
          height: 1rem;
          color: #000;
          line-height: 1rem;
        }
        &-remark{
          width: 100%;
        }
      }
      &-btnbox{
        margin-top: 1rem;
        &-button{
          height: 1rem;
          font-size: 0.5rem;
        }
      }
    }
    &_card-info{
      box-sizing: border-box;
      width: 100%;
      padding: 0.5rem;
      padding-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin: 0 auto;
      background-color: rgba(0,0,0,0.5);
      &-h3{
        margin: 0.5rem 0;
        text-indent: center;
        color: #fff;
        font-size: 0.5rem;
      }
      &-item{
        width: 100%;
        color: #fff;
        height: 1.5rem;
        display: flex;
        box-sizing: border-box;
        padding: 0 0.2rem;
        align-items: center;
        justify-content: space-between;
        span{
          font-size: 0.5rem;
        }
        &-time{
          width: 50%;
          background-color: #fff;
          height: 1rem;
          color: #000;
          line-height: 1rem;
        }
        &-title{
          font-size: 0.5rem;
        }
      }
      &-warp{
        width: 100%;
        color: #fff;
        display: flex;
        box-sizing: border-box;
        padding: 0 0.2rem;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        &-item{
          width: 25%;
          height: 1.8rem;
          &-img{
            width: 1.5rem;
            height:1.5rem;
            border:1px solid #fff;
            background-color: rgba(225,225,225);
            border-radius: 0.5rem;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              border-radius: 0.5rem;
            }
            &-remove{
              position: absolute;
              width: 0.5rem;
              height: 0.5rem;
              right:-0.25rem;
              top:-0.15rem;
              overflow: hidden;
              line-height: 0.5rem;
              text-align: center;
              border-radius: 50%;
              background-color: #000;
              color: #fff;
              font-size: 0.8rem;
            }
          }
        }
      }
      &-btnbox{
        margin-top: 1rem;
        &-button{
          height: 1rem;
          font-size: 0.5rem;
        }
      }
    }
  }
  .file{
      position: relative;
      display: inline-block;
      border:1px solid #fff;
      background-color: rgba(200,200,200);
      border-radius: 0.5rem;
      overflow: hidden;
      text-decoration: none;
      text-indent: 0;
      width: 1.5rem;
      height:1.5rem;
      line-height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .file span{
    position: absolute;
    height: 1.5rem;
    width: 1.5rem;
    font-size: 0.5rem;
    line-height: 1.6rem;
    text-align: center;
    right: 0;
    top: 0;
    color: #666;
  }
  .file input{
      position: absolute;
      font-size: 10rem;
      right: 0;
      top: 0;
      opacity: 0;
      z-index: 2;
  }
  .file:hover{
      text-decoration: none;
  }
</style>
