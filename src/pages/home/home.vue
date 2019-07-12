<template>
  <div class="home">
    <CHeader></CHeader>
    <div class="home-button-box">
      <cube-button
        @click="goViewEdit"
        class="home-button"
        :primary="true"
        :inline="true">
        带看录入
      </cube-button>
      <cube-button
        @click="goInfoEdit"
        class="home-button"
        :primary="true"
        :inline="true">
        信息录入
      </cube-button>
      <cube-button
        @click="goMarketControl"
        class="home-button"
        :primary="true"
        :inline="true">
        销控查看
      </cube-button>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
export default {
  name: 'home',
  components: {
    CHeader
  },
  data () {
    return {
      
    }
  },
  methods: {
    goViewEdit(){
      this.$router.push({
        name: 'viewEdit'
      })
    },
    goInfoEdit(){
      this.$router.push({
        name: 'infoSreach'
      })
    },
    goMarketControl(){
      this.$router.push({
        name: 'marketControl'
      })
    }
  },
  created: function () {

  },
}
</script>

<style scoped lang="less">
  .home-button-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    .home-button{
      margin: 0.8rem 0;
      width: 90%;
      height: 1.2rem;
      font-size: 0.4rem;
    }
  }
</style>
