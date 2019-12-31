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
    probeType: {
      type:Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
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
      pullUpLoad: this.pullUpLoad,  
      click: true,
    })

    // 监听滚动的距离
    if (this.probeType === 2 || this.probeType === 3) {
      this.bscroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }
    
    // 上拉加载更多
    if (this.pullUpLoad) {
      this.bscroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
    
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.bscroll && this.bscroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.bscroll && this.bscroll.finishPullUp()
    },
    refresh() {
      this.bscroll && this.bscroll.refresh()
    },
    getsaveY() {
      return this.bscroll.y
    }
  }
}
</script>

<style scoped>
</style>