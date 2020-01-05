<template>
  <div id="detail">
    <detail-nav-bar class='top-bar' @itemClick='itemClick' ref='topBar'/>
    <scroll class="content"
            ref="scroll"
            :probe-type='3' 
            @scroll='scroll'>
      <detail-swiper :bannerImg='topImages'/>
      <detail-msg :goods='goods'/>
      <detail-store :store='store'/>
      <detail-info :goods-info='goodsInfo' @imgLoaded='imgLoaded'/>
      <detail-params-info :params-info='paramsInfo' ref='params'/>
      <detail-comment-info :comment-info='commentInfo' ref='comment'/>
      <goods-list :goodslists='recommends' ref='recommend'/>
    </scroll>
    <detail-bottom-bar/>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailMsg from './childComponents/DetailMsg'
import DetailStore from './childComponents/DetailStore'
import DetailInfo from './childComponents/DetailInfo'
import DetailParamsInfo from './childComponents/DetailParamsInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goodslist/GoodsList'
import {itemListenMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'

import {getDetailData,Goods,Store,ParamsInfo,getRecommends} from 'network/detailRequest.js'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      store: {},
      goodsInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends:[],
      themeIndex: [],
      getThemeIndex: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailMsg, 
    DetailStore,
    DetailInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,

    Scroll
  },
  created() {
    this.iid = this.$route.params.iid
    getDetailData(this.iid)
    .then(res => {
      // 1.获取数据
      let data = res.result
      // 2.取出轮播图的数据
      this.topImages = data.itemInfo.topImages
      // 3.创建商品的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
      // 4.创建店铺的对象
      this.store = new Store(data.shopInfo)
      // 5.取出详情的信息
      this.goodsInfo = data.detailInfo
      // 6.创建传输的对象
      this.paramsInfo = new ParamsInfo(data.itemParams.info,data.itemParams.rule)
      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 详情页的推荐信息
    getRecommends().then(res => {
      this.recommends = res.data.list
    })

    // 获取高度
    this.getThemeIndex = debounce(() => {
        this.themeIndex = []

        this.themeIndex.push(0)
        this.themeIndex.push(this.$refs.params.$el.offsetTop)
        this.themeIndex.push(this.$refs.comment.$el.offsetTop)
        this.themeIndex.push(this.$refs.recommend.$el.offsetTop)
        this.themeIndex.push(Number.MAX_VALUE)

        console.log(this.themeIndex)
    })
  },
  destroyed() {
    this.$bus.$off('imgLoaded', this.itemImgListen)
  },
  methods: {
    imgLoaded() {
      this.$refs.scroll.refresh();
      this.getThemeIndex()
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeIndex[index], 300)
    },
    scroll(position) {
      let positionY = -position.y
      const theme = this.themeIndex
      for (let i = 0; i < theme.length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= theme[i] && positionY < theme[i+1])) {
          this.currentIndex = i
          this.$refs.topBar.currentIndex = this.currentIndex
        }
      }
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
