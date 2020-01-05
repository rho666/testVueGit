<template>
  <nav-bar>
    <div slot='left' class="left" @click='backClick'>
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div class='center' slot='center'>
      <div v-for='(item,index) in titles' :key='index' 
           class='item-nav'
           :class='{active: currentIndex === index}'
           @click='itemClick(index)'>{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick', index)
    },
    backClick() {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
  .center {
    display: flex;
    font-size: 12px;
  }

  .item-nav {
    flex: 1;
  }

  .active {
    color: var(--color-tint)
  }

  .left {
    margin-top: 5px;
  }
</style>