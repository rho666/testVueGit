<template>
  <div class="detail-info">
    <div class="info-msg">
      <div class='left-line line'></div>
      <p>{{goodsInfo.desc}}</p>
      <div class="right-line line"></div>
      <p v-for='items in goodsInfo.detailImage'>{{items.key}}</p>
    </div>
    <div v-for='items in goodsInfo.detailImage' class="info-img">
      <img v-for='item in items.list' :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailInfo',
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      imgTotal: 0,
    }
  },
  methods: {
    imgLoad () {
      if (++this.imgTotal === this.goodsInfo.detailImage[0].list.length){
        this.$emit('imgLoaded')
      }
    }
  }
}
</script>

<style scoped>
  .info-msg {
    padding: 10px;
    position: relative;
  }

  .line {
    height: 4px;
    width: 100px;
    border-bottom: 1px solid rgb(204, 199, 199);
  }

  .left-line {
    border-left: 4px solid #000;
  }

  .right-line {
    border-right: 4px solid #000;
    justify-content: right;
    float: right
  }

  p {
    font-size: 12px;
    padding: 10px 0;
  }

  .info-img img{
    width: 100%;
  }
</style>