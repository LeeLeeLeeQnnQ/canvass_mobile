<template>
  <div class="view-edit">
    <CHeader></CHeader>
    <div class="view-edit_box scrollBox" ref="scrollBox">
      <cube-scroll
        ref="scroll">
        <cube-input
          v-model="queryCustomerInfo.value"
          :placeholder="queryCustomerInfo.placeholder"
          class="view-edit_submit-phone"
        ></cube-input>
        <cube-button
          @click="querySubmit"
          class="view-edit_query-button"
          :primary="true"
          :inline="true">
          查询
        </cube-button>
        <hr>
        <div v-show="isShowCustomerInfo" class="view-edit_customer-info">
          <h3 class="view-edit_customer-info-h3"
          v-if="!!customerInfo.isNew">
            新客户
          </h3>
          <h3 class="view-edit_customer-info-h3"
          v-else>
            老客户
          </h3>
          <div class="view-edit_customer-info-item" 
          v-if="!!customerInfo.customer_name">
            <span>客户称呼：</span>
            <span>{{customerInfo.customer_name}}</span>
          </div>
          <div class="view-edit_customer-info-item" 
          v-if="!!customerInfo.id">
            <span>客户ID：</span>
            <span>{{customerInfo.id}}</span>
          </div>
          <div class="view-edit_customer-info-item">
            <span>联系方式：</span>
            <span>{{customerInfo.contact}}</span>
          </div>
          <div class="view-edit_customer-info-item"
          v-if="!!customerInfo.employee_name">
            <span>招商经理：</span>
            <span>{{customerInfo.employee_name}}</span>
          </div>
          <div class="view-edit_customer-info-item"
          v-if="!!customerInfo.total_count">
            <span>已带看数：</span>
            <span>{{customerInfo.total_count}}</span>
          </div>
          <cube-button
            @click="goSubmitViewInfo"
            class="view-edit_customer-info-submit"
            :primary="true"
            :inline="true">
            录入
          </cube-button>
          <!-- <cube-button
            @click="goPrebuild"
            class="view-edit_customer-info-submit"
            :primary="true"
            :inline="true">
            预建档
          </cube-button> -->
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import { queryCustomer} from '@/api/view'
import { getScorllBoxHeight } from "@/js/util.js";
export default {
  name: 'viewEdit',
  components: {
    CHeader
  },
  data () {
    return {
      queryCustomerInfo:{
        value:'',
        placeholder:'请输入客户联系方式',
      },
      customerInfo:{
        isNew:false,
        contact:'',
        employee_name:'',
        contact:'',
        customer_name:'',
        total_count:'',
      },
      isShowCustomerInfo:false,
    }
  },
  methods: {
    queryCustomer(info){
      queryCustomer(info).then(res => {
        const dbody = res.data;
        if(dbody.code !=  0){
          this.showToast(dbody.msg)
          return
        }
        this.customerInfo = {};
        if(!dbody.data){
          this.customerInfo.contact = this.queryCustomerInfo.value.trim();
          this.customerInfo.total_count = 1;
          this.customerInfo.isNew = true;
        }else{
          this.customerInfo = Object.assign({},dbody.data)
          this.customerInfo.isNew = false;
        }
        this.isShowCustomerInfo = true;
      })
    },
    // 查询提交
    querySubmit () {
      this.isShowCustomerInfo = false;
      if(!this.queryCustomerInfo.value){
        this.showToast('请输入客户联系方式')
        return
      }
      this.queryCustomer({ contact : this.queryCustomerInfo.value.trim() })
    },
    // 增加带看
    goSubmitViewInfo(){
      this.$router.push({
        name: 'addView',
        query: this.customerInfo
      })
    },
    // 
    goPrebuild(){
      let query = {
        customer_id:this.customerInfo.id
      }
      this.$router.push({
        name: 'preBuild',
        query: query
      })
    },
  },
  mounted(){
    getScorllBoxHeight(this.$refs.scrollBox)
  },
}
</script>

<style scoped lang="less">
  .scrollBox{
    background-color: #ddd;
    padding-top: 0.5rem;
    box-sizing: border-box;
  }
  .view-edit{
    &_submit-phone{
      width: 80%;
      margin: 0 auto;
    }
    &_query-button{
      width: 80%;
      margin: 0.5rem auto;
    }
    &_customer-info{
      box-sizing: border-box;
      width: 80%;
      padding: 0.3rem;
      padding-bottom: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background-color: #777;
      margin: 0 auto;
      &-h3{
        font-size: 0.5rem;
        color: #fff;
        margin-top: 0.5rem;
      }
      &-submit{
        width: 50%;
        margin-top: 0.8rem;
      }
      &-item{
        margin-top: 0.5rem;
        color: #fff;
        display: flex;
        box-sizing: border-box;
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        span{
          font-size: 0.5rem;
        }
      }
    }
  }
</style>
