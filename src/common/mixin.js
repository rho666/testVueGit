import {debounce} from './utils'

export const itemListenMixin = {
  data() {
    return {
      itemImgListen: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListen = () => {
      newRefresh()
    }
    this.$bus.$on('imgLoaded', this.itemImgListen)
  }
}