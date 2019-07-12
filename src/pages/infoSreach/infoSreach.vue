<template>
  <div class="info-sreach">
    <CHeader></CHeader>
    <div class="info-sreach_box scrollBox" ref="scrollBox">
      <cube-scroll
        :options="options"
        @pulling-up="onPullingUp"
        ref="scroll">
        <div class="info-sreach_card-info">
          <h3 class="info-sreach_card-info-h3">信息录入</h3>
          <div class="info-sreach_card-info-item" >
            <span class="info-sreach_card-info-item-span">厨房选择：</span>
            <cube-select
              class="info-sreach_card-info-item-span info-sreach_card-info-item-input"
              v-model="sreachInfo.kitchen_id"
              placeholder="请选择"
              :options="kitchenList">
            </cube-select>
          </div>
          <div class="info-sreach_card-info-item" >
            <span class="info-sreach_card-info-item-span">关键字：</span>
            <cube-input
              class="info-sreach_card-info-item-span info-sreach_card-info-item-input"
              v-model="sreachInfo.keyword" >
            </cube-input>
          </div>
          <div class="info-sreach_card-info-btnbox" >
            <cube-button
              @click="submitSreach"
              class="info-sreach_card-info-btnbox-button"
              :primary="true"
              :inline="true">
              搜索
            </cube-button>
          </div>
        </div>
        <hr>
        <ul class="info-sreach_card-shop">
          <li class="info-sreach_card-shop-item" v-for="item in shopList">
            <h3 class="info-sreach_card-shop-item-h3" v-if="item.lease_type == 1">起租中</h3>
            <h3 class="info-sreach_card-shop-item-h3" v-else-if="item.lease_type == 2">租赁中</h3>
            <h3 class="info-sreach_card-shop-item-h3" v-else-if="item.lease_type == 3">退租中</h3>
            <h3 class="info-sreach_card-shop-item-h3" v-else-if="item.lease_type == 7">退款中</h3>
            <h3 class="info-sreach_card-shop-item-h3" v-else-if="item.lease_type == 4">已归档</h3>
            <p class="info-sreach_card-shop-item-p">{{item.kitchen_name}}</p>
            <p class="info-sreach_card-shop-item-div">
              <span>{{item.store_name}}（{{item.store_id}}）</span>
              <span>{{item.store_no}}</span>
            </p>
            <p class="info-sreach_card-shop-item-div">
              <span>招商经理：</span>
              <span>{{item.manage_lease}}</span>
            </p>
            <p class="info-sreach_card-shop-item-div">
              <span>店长：</span>
              <span>{{item.manage_name}}</span>
            </p>
            <div class="info-sreach_card-shop-item-btnbox" >
              <cube-button
                @click="editInfo(item)"
                class="info-sreach_card-shop-item-button"
                :primary="true"
                :inline="true">
                编辑资料
              </cube-button>
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
import { getKitchenList , getAllShopList } from '@/api/data'
export default {
  name: 'infoSreach',
  components: {
    CHeader
  },
  data () {
    return {
      sreachInfo:{
        keyword:'',
        kitchen_id:'',
      },
      nextPage:1,
      kitchenList:[],
      shopList:[],
      options: {
          pullUpLoad: {
              threshold: 20,
              txt: {
                  more: '',
                  noMore: '没有更多数据'
              }
          }                                 // 配置上拉加载，若要关闭可直接 pullUpLoad：false
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
    submitSreach(){
      this.shopList = [];
      if( !this.sreachInfo.kitchen_id ){
        this.showToast('厨房必须选择！')
        return false
      }
      this.nextpage = 1;
      let sInfo = Object.assign({'page':this.nextpage},this.sreachInfo);
      this.getAllShopList(sInfo);
    },
    getAllShopList(info){
      getAllShopList(info).then(res => {
        const dbody = res.data;
        if(dbody.code !=  0){
          this.showToast(dbody.msg)
          return
        }
        let list = dbody.data.list || [];
        let oldLength = this.shopList.length;
        this.shopList = this.shopList.concat(list);
        this.nextpage = dbody.data.page.current_page*1 + 1;
        this.$refs.scroll.forceUpdate()
      }) 
    },
    onPullingUp() {
      let sInfo = Object.assign({'page':this.nextpage},this.sreachInfo);
      // 模拟更新数据
      this.getAllShopList(sInfo);
    },
    editInfo(info){
      let store_id = info.store_id
      let kitchen_id = info.kitchen_id
      const route = {
        name: 'infoEdit',
        query: {
          store_id,
          kitchen_id
        }
      }
      this.$router.push(route)
    }
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
<style lang="less">
  .info-sreach{
    .before-trigger span{
      font-size: 0.5rem;
    }
  }
</style>
<style scoped lang="less">
  .scrollBox{
    background-color: #ddd;
    box-sizing: border-box;
  }
  .info-sreach{
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
    &_card-shop{
      padding: 0.5rem;
      &-item{
        background-color: rgba(0,0,0,0.6);
        padding: 0.3rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        border-bottom: 1px solid #fff;
        &-h3{
          font-size: 0.5rem;
          color: #fff;
          height: 0.8rem;
          margin: 0.2rem;
        }
        &-p{
          font-size: 0.4rem;
          color: #fff;
          height: 0.6rem;
          margin: 0.2rem;
        }
        &-div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.2rem;
          span{
            font-size: 0.4rem;
            color: #fff;
            height: 0.6rem;
          }
        }
      }
    }
  }
</style>
