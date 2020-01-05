<template>
  <div id="home">
    <nav-bar class='home-nav'><div slot="center">首页</div></nav-bar>
    <tab-control class="tab-control1" 
                   :titles="['流行','新品','精选']"
                   @tabClick='tabClick'
                   ref='tabcontrol1'
                   v-show='showFixed' />
    <Scroll class='content'
            ref='scroll'
            :probe-type='3' 
            @scroll='scroll'
            :pullUpLoad='true'
            @pullingUp='loadMore'>
      <home-swiper :banners='banners'
                   @bannarLoad='bannerLoaded'/>
      <home-recommend :recommends='recommends'/>
      <week-ranking/>
      <tab-control class="tab-control2" 
                   :titles="['流行','新品','精选']"
                   @tabClick='tabClick'
                   ref='tabcontrol2' />
      <goods-list :goodslists='showGoods'/>
    </Scroll>
    <back-top @click.native='backTop' v-show='isBackTop' />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/common/tabcontrol/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goodslist/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommend from './childComponents/HomeRecommend'
import WeekRanking from './childComponents/WeekRanking'


import {getHomeMultidata, getGoodsData} from 'network/homeRequest'
import {debounce} from 'common/utils.js'
import {itemListenMixin} from 'common/mixin.js'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentType: 'pop',
      isBackTop: false,
      offsetTop: 0,
      showFixed: false,
      saveY: 0,
    }
  },
  mixins: [itemListenMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    WeekRanking,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  // 生命周期函数，组件创建完成就加载
  created() {
    // 请求数据，并把数据保存
    this.getHomeMultidata()

    // 请求商品数据
    this.getGoodsData('pop')
    this.getGoodsData('new')
    this.getGoodsData('sell')   
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存离开时的y值
    this.saveY = this.$refs.scroll.getsaveY()
    // 取消全局事件的监听
    this.$bus.$off('imgLoaded', this.itemImgListen)

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {  
    /**
     * 事件监听相关的方法
     */
    bannerLoaded() {
      this.offsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },

    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    scroll(position){
      // console.log(position)
      // 判断显示回到顶部
      this.isBackTop = (-position.y) > 1000;

      // 判断topcontrol是否吸顶
      this.showFixed = (-position.y) > this.offsetTop
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },

    loadMore() {
      this.getGoodsData(this.currentType)
      this.$refs.scroll.finishPullUp()
    },

    /**
     * 网络请求相关代码
     */
    getHomeMultidata() {
      getHomeMultidata()
      .then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },

    getGoodsData(type) {
      const page = this.goods[type].page + 1
      getGoodsData(type, page)
      .then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    z-index: 100;
  }

  .tab-control1 {
    position: relative;
    z-index: 10;
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>