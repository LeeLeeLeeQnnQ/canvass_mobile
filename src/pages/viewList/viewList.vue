<template>
  <div class="view-list">
    <CHeader></CHeader>
    <div class="view-list_box scrollBox" ref="scrollBox">
      <cube-scroll
        :options="options"
        @pulling-up="onPullingUp"
        @pulling-down="onPullingDown"
        ref="scroll">
        <ul class="view-list_card" v-if="viewList.length > 0">
          <li class="view-list_card-box" v-for="item in viewList">
            <div class="view-list_card-box-item">
              <h3 class="view-list_card-box-item-h3">{{item.kitchen_name}}</h3>
              <h3 class="view-list_card-box-item-h3">{{item.source}}／{{item.create_time}}</h3>
              <h3 class="view-list_card-box-item-h3">
                {{item.customer_name}}／
                <a :href="'tel:'+item.contact">
                    {{item.contact}}
                </a>
              </h3>
              <span class="view-list_card-box-item-level">{{item.level}}</span>
              <div class="view-list_card-box-item-remark">
                <span>留言：</span>
                <p class="view-list_card-box-item-remark-p">{{item.remark}}</p>
              </div>
            </div>
          </li>
        </ul>
        <h3 v-else class="view-list_empty">暂无数据</h3>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import CHeader from '@/components/CHeader'
  import { getScorllBoxHeight , timeForMat , getUid } from "@/js/util.js";
  import { getMyViewList } from '@/api/data'
  export default {
    name: 'viewList',
    components: {
      CHeader
    },
    data () {
      return {
        sreachInfo:{
          employee_id:'',
          start_time:'',
          end_time:'',
        },
        nextPage:1,
        viewList:[],
        options: {
            pullUpLoad: {
                threshold: 20,
                txt: {
                    more: '',
                    noMore: '没有更多数据'
                }
            },
            pullDownRefresh: {
              threshold: 60,
              stop: 40,
              txt: '更新成功'
            }
        },
      }
    },
    methods: {
      initInfo(){
        let sInfo = Object.assign({'page':this.nextpage},this.sreachInfo);
        this.getMyViewList(sInfo)
      },
      getMyViewList(info){
        getMyViewList(info).then(res => {
          const dbody = res.data;
          if(dbody.code !=  0){
            this.showToast(dbody.msg)
            return
          }
          let list = dbody.data.list || [];
          this.viewList = this.viewList.concat(list);
          this.nextpage = dbody.data.page.current_page*1 + 1;
          this.$refs.scroll.forceUpdate()
        }) 
      },
      onPullingUp() {
        let sInfo = Object.assign({'page':this.nextpage},this.sreachInfo);
        // 模拟更新数据
        this.getMyViewList(sInfo);
      },
      onPullingDown() {
        this.viewList = [];
        this.nextpage = 1;
        setTimeout(()=>{
          let sInfo = Object.assign({'page':this.nextpage},this.sreachInfo);
          this.getMyViewList(sInfo);
        },300)
      },
    },
    created(){
      
    },
    mounted(){
      this.$nextTick(() => {
        getScorllBoxHeight(this.$refs.scrollBox);
        const timer = timeForMat(30)
        this.sreachInfo.start_time = timer[0]
        this.sreachInfo.end_time = timer[1]
        this.sreachInfo.employee_id = getUid();
        setTimeout(()=>{
          this.initInfo();
        },500)
      })
    },
  }
</script>
<style lang="less">
  .view-list{
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
  .view-list{
    height: 100%;
    width: 100%;
    &_card-box{
      box-sizing: border-box;
      padding: 0.5rem 0.1rem;
      &-item{
        border-radius: 8px;
        border:2px solid orange;
        background-color: #fff;
        padding: 0.3rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        &-h3{
          font-size: 0.5rem;
          margin: 0.2rem 0;
        }
        &-level{
          position: absolute;
          top:0;
          right: 0.3rem;
          font-size: 0.5rem;
          background-color: orange;
          padding: 0.2rem;
          color: #fff;
        }
        &-remark{
          display: flex;
          align-items: flex-start;
          font-size: 0.45rem;
          line-height: 0.6rem;
          width: 100%;
          min-height: 0.6rem;
          span{
            float: left;
            text-align: left;
            font-size: 0.45rem;
            width: 2rem;
            height: 0.6rem;
          }
          &-p{
            text-decoration:underline;
            display: inline-block;
            width: 100%;
            text-align: left;
            word-wrap: break-word;
            word-break: normal;
            line-height: 0.6rem;
          }
        }
      }
    }
    &_empty{
      padding: 0.5rem 0;
      font-size: 0.5rem;
      color: #666;
    }
  }
</style>
