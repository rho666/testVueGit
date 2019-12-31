<template>
  <figure class='goods-msg' @click='itemClick'>
    <a>
      <img :src="goodsmsg.show.img" alt="" @load='imgLoad'>
      <figcaption class="goods-title">{{goodsmsg.title}}</figcaption>
      <span class='price'>{{goodsmsg.price}}</span>
      <span class='collect'>{{goodsmsg.cfav}}</span>
    </a>
  </figure>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsmsg: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      // console.log('imgload')
      this.$bus.$emit('imgLoaded')
    },
    itemClick() {
      this.$router.push('/detail/'+this.goodsmsg.iid)  
    }
  }
}
</script>

<style>
  .goods-msg {
    /* flex: 1; */
    width: 150px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 12px;
  }

  .goods-msg img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 2px 4px;
  }

  .price {
    color: rgb(247, 70, 70)
  }

  .collect{
    padding-left: 15px;
    position:relative;
  }

  .collect::before {
    content: '';
    width: 15px;
    height:15px;
    background-image: url('~assets/img/common/collect.svg');
    background-size: cover;
    position: absolute;
    left: 0px;
    z-index: 5;
    background-repeat: no-repeat;
  }
</style>