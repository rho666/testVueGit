<template>
  <div class="toast" v-show='isShow'>{{message}}</div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
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
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    z-index:999
  }
</style>