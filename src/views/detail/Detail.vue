<template>
  <div id="detail">
    <detail-nav-bar class='top-bar'></detail-nav-bar>
    <Scroll class="content"
            ref="scroll"
            :probe-type='3' >
      <detail-swiper :bannerImg='topImages'></detail-swiper>
      <detail-msg :goods='goods'></detail-msg>
      <detail-store :store='store'></detail-store>
      <detail-info :goods-info='goodsInfo' @imgLoaded='imgLoaded'></detail-info>
      <detail-params-info :params-info='paramsInfo'></detail-params-info>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailMsg from './childComponents/DetailMsg'
import DetailStore from './childComponents/DetailStore'
import DetailInfo from './childComponents/DetailInfo'
import DetailParamsInfo from './childComponents/DetailParamsInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetailData,Goods,Store,ParamsInfo} from 'network/detailRequest.js'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      store: {},
      goodsInfo: {},
      paramsInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailMsg,
    Scroll,
    DetailStore,
    DetailInfo,
    DetailParamsInfo
  },
  created() {
    this.iid = this.$route.params.iid
    this.getDetailData(this.iid)
  },
  methods: {
    getDetailData(id) {
      getDetailData(id)
      .then(res => {
        console.log(res)
        let data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
        this.store = new Store(data.shopInfo)
        this.goodsInfo = data.detailInfo
        this.paramsInfo = new ParamsInfo(data.itemParams.info,data.itemParams.rule)
      })
    },
    imgLoaded() {
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>>
