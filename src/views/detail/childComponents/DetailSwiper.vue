<template>
  <Swiper class='banner'>
    <swiper-item v-for='(item,index) in bannerImg' :key='index'>
      <img :src="item" alt="">
    </swiper-item>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    bannerImg: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .banner {
    height: 300px;
  }
</style>>

</style>