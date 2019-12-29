<template>
  <div id="home">
    <nav-bar class='home-nav'><div slot="center">首页</div></nav-bar>
    <Scroll class='content' ref='scroll' :probeType='3' @scroll='scroll'>
      <home-swiper :banners='banners'/>
      <home-recommend :recommends='recommends'/>
      <week-ranking/>
      <tab-control class="tab-control" 
      :titles="['流行','新品','精选']"
      @tabClick='tabClick' />
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
    }
  },
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
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 时间监听相关的方法
     */
    backTop() {
      this.$refs.scroll.backTop(0, 0)
    },

    scroll(position){
      // console.log(position)
      this.isBackTop = -(position.y) > 1000;
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
    /* padding-top: 43px; */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
  } */

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>