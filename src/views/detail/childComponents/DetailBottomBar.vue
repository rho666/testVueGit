<template>
  <div class='detail-bottom-bar'>
    <figure>
      <div class='icon service'></div>
      <figcaption>客服</figcaption>
    </figure>
    <figure>
      <div class='icon store'></div>
      <figcaption>店铺</figcaption>
    </figure>
    <figure>
      <div class='icon collect'></div>
      <figcaption>收藏</figcaption>
    </figure>
    <div class='shop'>
      <div class='shop-cat' @click='addToCart'>加入购物车</div>
      <div class='buies'>购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
  .detail-bottom-bar {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 49px;
    text-align: center;
    justify-content: space-between
  }

  .icon {
    background-image: url("~assets/img/detail/detail_bottom.png");
    background-size: cover;
    height: 25px; 
    width: 25px;
    text-align: center;
  }

  .service {
    background-position:0 -60px;
  }

  .store {
    background-position:0 -111px;
  }

  .collect {
    background-position:0 0
  }

  figcaption {
    font-size: 13px;
  }

  .shop {
    line-height: 49px;
  }

  .shop-cat {
    float: left;
    background-color: rgb(216, 219, 17)
  }

  .buies {
    width: 70px;
    float: left;
    color: #fff;
    background-color: rgb(241, 62, 158);
  }
</style>