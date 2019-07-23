<template>
  <div class="add-view">
    <CHeader></CHeader>
    <div class="add-view_box scrollBox" ref="scrollBox">
      <cube-scroll
        ref="scroll">
        <div class="add-view_customer-info">
          <h3 class="add-view_customer-info-h3">带看录入</h3>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">客户称呼：</span>
            <cube-input class="add-view_customer-info-item-span add-view_customer-info-item-input" v-model="baseInfo.customer_name" >
            </cube-input>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">联系方式：</span>
            <span class="add-view_customer-info-item-span">{{baseInfo.contact}}</span>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">带看次数：</span>
            <span class="add-view_customer-info-item-span">{{baseInfo.total_count}}</span>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">招商经理：</span>
            <cube-select
              class="add-view_customer-info-item-span add-view_customer-info-item-input"
              v-model="baseInfo.employee_id"
              placeholder="请选择"
              v-if="editEmployee"
              :options="leasingList">
            </cube-select>
            <span v-else class="add-view_customer-info-item-span">{{baseInfo.employee_name}}</span>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">所属组：</span>
            <cube-select
              class="add-view_customer-info-item-span add-view_customer-info-item-input"
              v-model="editInfo.group_name"
              placeholder="请选择"
              :options="group_list">
            </cube-select>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">带看时间：</span>
            <span 
              class="add-view_customer-info-item-span add-view_customer-info-item-time"
              @click= "selectDate"
            >{{editInfo.clue_date}}</span>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">所属场地：</span>
            <cube-select
              class="add-view_customer-info-item-span add-view_customer-info-item-input"
              v-model="editInfo.kitchen_id"
              placeholder="请选择"
              :options="kitchenList">
            </cube-select>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">渠道来源：</span>
            <cube-select
              class="add-view_customer-info-item-span add-view_customer-info-item-input"
              v-model="editInfo.source"
              placeholder="请选择"
              :options="sources_list">
            </cube-select>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">未成交因素：</span>
            <cube-select
              class="add-view_customer-info-item-span add-view_customer-info-item-input"
              v-model="editInfo.consider"
              placeholder="请选择"
              :options="considers_list">
            </cube-select>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">意向面积：</span>
            <cube-input class="add-view_customer-info-item-span add-view_customer-info-item-input" v-model="editInfo.area" >
            </cube-input>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">意向品类：</span>
            <cube-select
              class="add-view_customer-info-item-span add-view_customer-info-item-input"
              v-model="editInfo.category"
              placeholder="请选择"
              :options="category_list">
            </cube-select>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">意向程度：</span>
            <cube-select
              class="add-view_customer-info-item-span add-view_customer-info-item-input"
              v-model="editInfo.level"
              placeholder="请选择"
              :options="head_list">
            </cube-select>
          </div>
          <div class="add-view_customer-info-item" >
            <span class="add-view_customer-info-item-span">留言备注：</span>
          </div>
          <div class="add-view_customer-info-item" >
            <cube-textarea
            class="add-view_customer-info-item-remark"
            placeholder="请输入内容"
            v-model="editInfo.remark">
            </cube-textarea>
          </div>
          <div class="add-view_customer-info-btnbox" >
            <cube-button
              @click="submitInfo"
              class="add-view_customer-info-btnbox-button"
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
import { getScorllBoxHeight } from "@/js/util.js";
import { getKitchenList , getLeasingList } from '@/api/data'
import { addNewClue } from '@/api/view'
export default {
  name: 'addView',
  components: {
    CHeader
  },
  data () {
    return {
      baseInfo:{},
      editInfo:{
        group_name:'',
        clue_date:'',
        kitchen_id:'',
        source:'',
        consider:'',
        area:'',
        category:'',
        level:'',
        remark:'',
      },
      // 下拉数据
      kitchenList:[],
      leasingList:[],
      group_list:['望京组','十里堡组','通州组','四道口组','新人组'],
      sources_list:["58渠道","微信群","电话渠道","转介绍-中介","转介绍-BD","转介绍-已签约客户","转介绍-非签约客户","已合作门店开分店","转介绍-招商同行","转介绍-品牌渠道","访客","官网","其他来源务必备注说明"],
      head_list:["已签约","高意向","中意向","低意向"],
      considers_list:["已成交","费用高","区域门店保护","客户开店计划尚未成熟","项目施工开业较晚","商圈流量较低","没有堂食","商圈竞争激烈","资质证件未办齐","其他因素务必备注说明"],
      category_list:["快餐","米粉","面馆","粥店","麻辣烫麻辣拌","麻辣香锅","汉堡炸鸡","黄焖鸡","炒饭","烤肉拌饭","凉皮","锅贴","饮品","甜点蛋糕","其他"],
      editEmployee:true,
    }
  },
  methods: {
    initInfo(){
      this.getKitchenList()
      this.getLeasingList()
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
    getLeasingList(){
      getLeasingList().then(res => {
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
          obj.text = item.fullname;
          arr.push(obj)
        });
        this.leasingList = arr;
        this.editEmployee = this.canEditEmployee();
      })
    },
    selectDate() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '带看时间',
          value: new Date(),
          onSelect: this.selectHandle,
        })
      }
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.editInfo.clue_date = selectedText.join('-');
    },
    canEditEmployee() {
      let boo = true;
      let id = this.baseInfo.employee_id;
      this.leasingList.forEach((item)=>{
        if(item.value == id){
          boo = false
        }
      })
      return boo;
    },
    submitInfo(){
      let info = Object.assign({},this.baseInfo,this.editInfo);
      if(this.testInfo(info)){
        this.leasingList.forEach((item)=>{
          if(item.value == info.employee_id){
            info.employee_name = item.text
          }
        })
        let clue_date = info.clue_date.split('-');
        clue_date[1] = clue_date[1] < 10 ? '0' + clue_date[1] : clue_date[1];
        info.clue_date = clue_date;
        if(info.isNew){
          this.addNewClue(info);
        }else{
          delete info.id
          this.addNewClue(info);
        }
      }
    },
    addNewClue( info ){
      addNewClue( info ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.showToast(dbody.msg)
          return
        }
        this.showToast("添加成功！")
        setTimeout(()=>{
          this.$router.go(-1);
        },1500)
      })
    },
    // 验证添加信息
    testInfo( info ){
      if( !info.customer_name ){
        this.showToast('请输入客户姓名！')
        return false
      }
      if( !info.employee_id ){
        this.showToast('请选择招商经理！')
        return false
      }
      if( !info.kitchen_id ){
        this.showToast('请选择带看场地！')
        return false
      }
      if( !info.clue_date ){
        this.showToast('请选择带看时间！')
        return false
      }
      if( !info.source ){
        this.showToast('请输入渠道来源！')
        return false
      }
      if( !info.area ){
        this.showToast('请输入意向面积！')
        return false
      }
      if( !info.consider ){
        this.showToast('请输入未成交因素！')
        return false
      }
      if( !info.category ){
        this.showToast('请输入意向品类！')
        return false
      }
      if( !info.group_name ){
        this.showToast('请输入所属团队！')
        return false
      }
      return true
    },
  },
  created(){
    this.initInfo();
  },
  mounted(){
    this.$nextTick(() => {
      getScorllBoxHeight(this.$refs.scrollBox);
      this.baseInfo = this.$route.query;
    })
  },
}
</script>
<!-- reset -->
<style lang="less">
  .add-view_customer-info-item-span{
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
  .add-view{
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
  }
</style>
