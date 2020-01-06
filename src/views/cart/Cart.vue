<template>
  <div id='cart'>
    <nav-bar class='nav-bar'>
      <div slot='center'>购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="scroll" ref='scroll'>
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar class="cart-bottom-bar"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'
import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  #cart {
    height: 100vh;
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff
  }

  .scroll {
    position: absolute;
    left: 0;
    top: 44px;
    bottom: 49px;
    right: 0;
    overflow: hidden;
  }

  .cart-bottom-bar {
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>