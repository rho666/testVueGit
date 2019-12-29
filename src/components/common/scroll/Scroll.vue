<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: Number,
    default: 0
  },
  data() {
    return {
      bscroll: null
    }
  },
  // 生命周期函数,等页面渲染完成之后加载
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: true,  
      click: true,
    })

    this.bscroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
  },
  methods: {
    backTop(x, y, time=300) {
      this.bscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
</style>