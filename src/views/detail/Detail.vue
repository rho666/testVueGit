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
    <detail-bottom-bar @addCart='addToCart'/>
    <back-top @click.native='backTop' v-show='isBackTop'/>
    <toast/>
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

import {itemListenMixin, backTopMixin,ToastMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'
import {mapActions} from 'vuex'
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
      currentIndex: 0,
      message: '',
      isShow: false,
    }
  },
  mixins: [itemListenMixin, backTopMixin, ToastMixin],
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
    Scroll,

  },
  created() {
    this.iid = this.$route.params.iid
    getDetailData(this.iid)
    .then(res => {
      console.log(res)
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
    })
  },
  destroyed() {
    this.$bus.$off('imgLoaded', this.itemImgListen)
  },
  methods: {
    ...mapActions(['addCart']),
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

      // backTop滚到一定位置显示
      this.showBackTop(position)
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.lowNowPrice = this.goods.lowNowPrice
      product.iid = this.iid

      this.addCart(product).then(res => {
        // 使用混入方式制作toast
        // this.show(res)

        console.log(this.$toast)
        this.$toast.show(res)
      })
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
