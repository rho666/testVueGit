<template>
  <div class="goods-list">
    <goods-list-item v-for="(items,index) in goodslists" :goodsmsg='items' :key='index' />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  props: {
    goodslists: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>