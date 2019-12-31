<template>
  <div id="detail">
    <detail-nav-bar class='top-bar'></detail-nav-bar>
    <Scroll class="content">
      <detail-swiper :bannerImg='topImages'></detail-swiper>
      <detail-msg :goods='goods'></detail-msg>
      <detail-store :store='store'></detail-store>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailMsg from './childComponents/DetailMsg'
import DetailStore from './childComponents/DetailStore'

import Scroll from 'components/common/scroll/Scroll'

import {getDetailData,Goods,Store} from 'network/detailRequest.js'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      store: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailMsg,
    Scroll,
    DetailStore
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
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
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
