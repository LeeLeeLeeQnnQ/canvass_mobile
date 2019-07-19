<template>
  <div class="info-edit">
    <CHeader></CHeader>
    <div class="info-edit_box scrollBox" ref="scrollBox">
      <cube-scroll
        ref="scroll">
        <div class="info-edit_card-info">
          <h3 class="info-edit_card-info-h3">
            {{baseInfo.kitchen_name}}
          </h3>
          <h3 class="info-edit_card-info-h3"
              v-show="!!baseInfo.store_no"
          >
            {{baseInfo.store_name}}（{{baseInfo.store_no}}）
          </h3>
          <div class="info-edit_card-info-item" >
            <span class="info-edit_card-info-item-span">饿了么上线日期：</span>
            <span 
              class="info-edit_card-info-item-span info-edit_card-info-item-time"
              @click= "selectEleDate"
            >{{ele_date}}</span>
          </div>
          <div class="info-edit_card-info-item" >
            <span class="info-edit_card-info-item-span">美团上线日期：</span>
            <span 
              class="info-edit_card-info-item-span info-edit_card-info-item-time"
              @click= "selectMeituanDate"
            >{{meituan_date}}</span>
          </div>
          <div class="info-edit_card-info-item">
            <p class="info-edit_card-info-item-title">合同资料</p>
          </div>
          <div class="info-edit_card-info-warp">
            <div class="info-edit_card-info-warp-item" v-for="item in contract">
              <div class="info-edit_card-info-warp-item-img">
                <img :src="item" @click="showImagePreview(item)">
                <span @click="removeImg(item,'contract')" class="info-edit_card-info-warp-item-img-remove">×</span>
              </div>
            </div>
            <div class="info-edit_card-info-warp-item">
              <a class="file">
                  <span>╋</span>
                  <input ref="contractFile" type="file" accept="image" @change="contractUpload">
              </a>
            </div>
          </div>
          <div class="info-edit_card-info-item">
            <p class="info-edit_card-info-item-title">合同人身份证</p>
          </div>
          <div class="info-edit_card-info-warp">
            <div class="info-edit_card-info-warp-item" v-for="item in identity">
              <div class="info-edit_card-info-warp-item-img">
                <img :src="item" @click="showImagePreview(item)">
                <span @click="removeImg(item,'identity')" class="info-edit_card-info-warp-item-img-remove">×</span>
              </div>
            </div>
            <div class="info-edit_card-info-warp-item">
              <a class="file">
                  <span>╋</span>
                  <input ref="identityFile" type="file" accept="image" @change="identityUpload">
              </a>
            </div>
          </div>
          <div class="info-edit_card-info-item">
            <p class="info-edit_card-info-item-title">店铺合同</p>
          </div>
          <div class="info-edit_card-info-warp">
            <div class="info-edit_card-info-warp-item" v-for="item in store_contract">
              <div class="info-edit_card-info-warp-item-img">
                <img :src="item" @click="showImagePreview(item)">
                <span @click="removeImg(item,'store_contract')" class="info-edit_card-info-warp-item-img-remove">×</span>
              </div>
            </div>
            <div class="info-edit_card-info-warp-item">
              <a class="file">
                  <span>╋</span>
                  <input ref="storeContractFile" type="file" accept="image" @change="storeContractUpload">
              </a>
            </div>
          </div>
          <div class="info-edit_card-info-item">
            <p class="info-edit_card-info-item-title">授权合照</p>
          </div>
          <div class="info-edit_card-info-warp">
            <div class="info-edit_card-info-warp-item" v-for="item in figure">
              <div class="info-edit_card-info-warp-item-img">
                <img :src="item" @click="showImagePreview(item)">
                <span @click="removeImg(item,'figure')" class="info-edit_card-info-warp-item-img-remove">×</span>
              </div>
            </div>
            <div class="info-edit_card-info-warp-item">
              <a class="file">
                  <span>╋</span>
                  <input ref="figureFile" type="file" accept="image" @change="figureUpload">
              </a>
            </div>
          </div>
          <div class="info-edit_card-info-item">
            <p class="info-edit_card-info-item-title">其他凭证</p>
          </div>
          <div class="info-edit_card-info-warp">
            <div class="info-edit_card-info-warp-item" v-for="item in start_other">
              <div class="info-edit_card-info-warp-item-img">
                <img :src="item" @click="showImagePreview(item)">
                <span @click="removeImg(item,'start_other')" class="info-edit_card-info-warp-item-img-remove">×</span>
              </div>
            </div>
            <div class="info-edit_card-info-warp-item">
              <a class="file">
                  <span>╋</span>
                  <input ref="startOtherFile" type="file" accept="image" @change="startOtherUpload">
              </a>
            </div>
          </div>
          <div class="info-edit_card-info-btnbox" >
            <cube-button
              @click="submitEditInfo"
              class="info-edit_card-info-btnbox-button"
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
import { uploadImg } from '@/api/data'
import { editShopInfo , getShopDetail } from '@/api/info'
import { getScorllBoxHeight , imgPreview } from "@/js/util.js";
export default {
  name: 'infoEdit',
  components: {
    CHeader
  },
  data () {
    return {
      queryInfo:{},
      baseInfo:{},

      ele_date:'',
      meituan_date:'',
      contract:[],
      identity:[],
      store_contract:[],
      figure:[],
      start_other:[],


      currentImgs:'',
    }
  },
  methods: {
    // 饿了么上线日期
    selectEleDate() {
      if (!this.eleDatePicker) {
        this.eleDatePicker = this.$createDatePicker({
          title: '饿了么上线日期',
          value: new Date(),
          onSelect: this.selectEleDateHandle,
        })
      }
      this.eleDatePicker.show()
    },
    selectEleDateHandle(date, selectedVal, selectedText) {
      this.ele_date = selectedText.join('-');
    },
    // 美团上线日期
    selectMeituanDate() {
      if (!this.meituanDatePicker) {
        this.meituanDatePicker = this.$createDatePicker({
          title: '美团上线日期',
          value: new Date(),
          onSelect: this.selectEleMeituanDateHandle,
        })
      }
      this.meituanDatePicker.show()
    },
    selectEleMeituanDateHandle(date, selectedVal, selectedText) {
      this.meituan_date = selectedText.join('-');
    },
    submitEditInfo(){
      let obj = {};
      obj.contract = this.contract.join(',');
      obj.identity = this.identity.join(',');
      obj.store_contract = this.store_contract.join(',');
      obj.figure = this.figure.join(',');
      obj.start_other = this.start_other.join(',');
      obj.ele_date = this.ele_date;
      obj.meituan_date = this.meituan_date;
      let info = Object.assign(obj,this.queryInfo);
      this.editShopInfo(info)
    },
    editShopInfo(info){
      editShopInfo(info).then(res => {
        let data = res.data;
        if(data.code != 0){
          this.showToast(data.msg)
          return
        }
        this.showToast("信息提交完成！")
        setTimeout(()=>{
          this.$router.go(-1);
        },1500)
      })
    },
    //去掉空值
    trimNull (array) {
      if(array.length <= 0){
        return null;
      }
      for (var i = 0; i < array.length; i++) {
        if (array[i] == '' || typeof (array[i]) === 'undefined') {
          array.splice(i, 1)
          i = i - 1
        }
      }
      return array;
    },
    getShopDetail(store_id){
      getShopDetail({id: store_id, lease_type: 0}).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.showToast(data.msg)
          setTimeout(function (argument) {
            that.$router.go(-1)
          }, 1000)
          return
        }
        let data = dbody.data;
        this.baseInfo = data;
        // ele上线日期
        this.ele_date = data.ele_date || '';
        // meituan上线日期
        this.meituan_date = data.meituan_date || '';
        // 合同资料
        this.contract = this.trimNull(data.contract.split(','))
        // 店主身份证
        this.identity = this.trimNull(data.identity.split(','))
        // 店铺合同
        this.store_contract = this.trimNull(data.store_contract.split(','))
        // 授权合照
        this.figure = this.trimNull(data.figure.split(','))
        // 起租其他凭证
        this.start_other = this.trimNull(data.start_other.split(','))
      })
    },
    initInfo(){
      this.getShopDetail(this.queryInfo.store_id);
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
    // 上传合同凭证图片
    contractUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      imgPreview(picValue,this,this.postImg,this.$refs.contractFile,this.contract);
    },
    // 合同人身份证
    identityUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      imgPreview(picValue,this,this.postImg,this.$refs.identityFile,this.identity);
    },
    // 店铺合同
    storeContractUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      imgPreview(picValue,this,this.postImg,this.$refs.storeContractFile,this.store_contract);
    },
    // 授权合照
    figureUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      imgPreview(picValue,this,this.postImg,this.$refs.figureFile,this.figure);
    },
    // 起租其他凭证
    startOtherUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      imgPreview(picValue,this,this.postImg,this.$refs.startOtherFile,this.start_other);
    },
  },
  created: function () {
    this.queryInfo = this.$route.query;
    this.initInfo();
  },
  mounted(){
    this.$nextTick(() => {
      getScorllBoxHeight(this.$refs.scrollBox);
    })
  },
}
</script>

<style scoped lang="less">
  .scrollBox{
    background-color: #ddd;
    box-sizing: border-box;
  }
  .info-edit{
    height: 100%;
    width: 100%;
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
