<template>
  <div v-if="Object.keys(goods).length !== 0" class='wrapper'>
    <div class="title">{{goods.title}}</div>
    <div class="price-msg">
      <span>{{goods.price}}</span>
      <span><p>{{goods.oldPrice}}</p></span>
      <span>{{goods.discountDesc}}</span>
    </div>
    <div class="hot">
      <span><p>{{goods.columns[0]}}</p></span>
      <span><p>{{goods.columns[1]}}</p></span>
      <span><p>{{goods.services[0].name}}</p></span>
    </div>
    <div class="credit">
      <span class='credit1'><img :src="goods.services[1].icon" alt="">{{goods.services[1].name}}</span>
      <span class='credit2'><img :src="goods.services[2].icon" alt="">{{goods.services[2].name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailMsg',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .wrapper {
    padding:8px;
    border-bottom: 4px solid #e2dbdb;
  }

  .title {
    color: #000;
    font-weight: bold;
  }

  .price-msg {
    margin-top: 8px;
    position: relative;
    margin-bottom: 10px;
  }

  .price-msg span{
    display: inline-block;
  }

  .price-msg :nth-child(1) {
    color: rgb(243, 28, 28);
    font-weight: bold;
  }

  .price-msg :nth-child(2)>p{
    color: #666;
    font-size: 12px;
    text-decoration: line-through;
    transform: scale(.9);
    font-weight:bold;
  }

  .price-msg :nth-child(3) {
    font-size: 12px;
    font-weight: bold;
    background-color: rgb(236, 14, 151);
    color: #fff;
    border-radius: 10px;
    position: absolute;
    padding: 2px;
    top:-4px;
  }

  .hot {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(224, 218, 218);
    padding-bottom: 2px;
  }

  .hot span {
    flex-flow: row;
    font-size: 12px;
    color: rgb(82, 80, 80);
  }

  .credit {
    position: relative;
    display: flex;
    line-height: 45px;
    justify-content: space-between;
    font-size: 12px;
    color: rgb(56, 54, 54);
  }

  .credit span {
    flex-flow: row;
  }

  .credit img {
    width: 10px;
  }


</style>