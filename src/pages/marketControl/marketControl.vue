<template>
  <div class="market-control">
    <CHeader></CHeader>
    <div class="market-control_box scrollBox" ref="scrollBox">
      <cube-scroll
        ref="scroll">
        <div class="market-control_card-info">
          <h3 class="market-control_card-info-h3">销控查看</h3>
          <div class="market-control_card-info-item" >
            <span class="market-control_card-info-item-span">厨房选择：</span>
            <cube-select
              class="market-control_card-info-item-span market-control_card-info-item-input"
              v-model="sreachInfo.kitchen_id"
              placeholder="请选择"
              :options="kitchenList">
            </cube-select>
          </div>
          <div class="market-control_card-info-btnbox" >
            <cube-button
              @click="submitSreach"
              class="market-control_card-info-btnbox-button"
              :primary="true"
              :inline="true">
              搜索
            </cube-button>
          </div>
        </div>
        <hr>
        <ul>
          <li class="market-control_item" v-for="item in market_list">
            <h3 class="market-control_item-h3 green" v-if="item.store_status == 1">租赁中</h3>
            <h3 class="market-control_item-h3 orange" v-else-if="item.store_status == 2">转租中</h3>
            <h3 class="market-control_item-h3 blue" v-else-if="item.store_status == 3">起租中</h3>
            <h3 class="market-control_item-h3 black" v-else-if="item.store_status == 4">空闲中</h3>
            <div class="market-control_item-content">
              <span class="market-control_item-content-span">{{item.kitchen_name}}</span>
              <span class="market-control_item-content-span">{{item.store_no}}</span>
            </div>
            <div class="market-control_item-content">
              <span class="market-control_item-content-span">{{item.store_name}}</span>
              <span class="market-control_item-content-span">{{item.area}} ㎡</span>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import { getScorllBoxHeight } from "@/js/util.js";
import { getKitchenList } from '@/api/data'
import { getKitchenStoreQueryList } from '@/api/market'
export default {
  name: 'marketControl',
  components: {
    CHeader
  },
  data () {
    return {
      kitchenList:[],
      market_list:[],
      sreachInfo:{
        kitchen_id:'',
      },
    }
  },
  methods: {
    initInfo(){
      this.getKitchenList()
    },
    getKitchenList(){
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
          arr.push(obj)
        });
        this.kitchenList = arr;
      }) 
    },
    getKitchenStoreQueryList(){
      this.market_list = [];
      getKitchenStoreQueryList( this.sreachInfo ).then(res => {
        const dbody = res.data;
        if (dbody.code != 0) {
          this.showToast(dbody.msg)
          return
        }
        this.market_list = dbody.data  || [];
      })
    },
    submitSreach(){
      this.getKitchenStoreQueryList();
    },
  },
  created(){
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
  .green{
    color: green;
  }
  .blue{
    color: blue;
  }
  .orange{
    color: orange;
  }
  .black{
    color: #000;
  }
  .scrollBox{
    background-color: #ddd;
    box-sizing: border-box;
  }
  .market-control{
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
      }
      &-btnbox{
        margin-top: 0.5rem;
        &-button{
          height: 1rem;
          font-size: 0.5rem;
        }
      }
    }
    &_item{
      background-color: rgba(0,0,0,0.2);
      width: 80%;
      margin: 0.2rem auto;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border:1px solid #eee;
      box-shadow: 0 0 8px #fff;
      &-h3{
        font-size: 0.5rem;
        text-align: left;
        margin-bottom: 0.2rem;
        padding: 0.2rem 0;
        border-bottom: 1px solid orange;
      }
      &-content{
        display: flex;
        justify-content: space-between;
        padding: 0.1rem 0;
        &-span{
          color: #fff;
          font-size: 0.45rem;
        }
      }
    }
  }
</style>
