import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop'
import Toast from 'components/content/toast/Toast'

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

export const backTopMixin  = {
  data() {
    return {
      isBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    showBackTop (position) {
      this.isBackTop = (-position.y) > 1000;
    },
  }
}

export const ToastMixin = {
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  components: {
    Toast
  },
  methods: {
    show(msg, delay=2000) {
      this.message = msg
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, delay)
    }
  }
}