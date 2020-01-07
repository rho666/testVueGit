<template>
  <div class='cart-list-item'>
    <!-- check按钮 -->
    <div class='check'><check-button  class='check-button' :isCheck='this.cartLists.check' @click.native='clickCheck'/></div>
    <!-- 图片 -->
    <div class="cart-img">
      <img :src="cartLists.image" alt="">
    </div>
    <!-- 信息 -->
    <div class="cart-msg">
      <h4>{{cartLists.title}}</h4>
      <p>{{cartLists.desc}}</p>
      <div class='price-info'><span class='price'>{{cartLists.lowNowPrice}}</span><span class='count'>x {{cartLists.count}}</span></div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

export default {
  name: 'CartListItem',
  props: {
    cartLists: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    clickCheck() {
      console.log('1')
      this.cartLists.check = !this.cartLists.check 
    }
  }
}
</script>

<style scoped>
  .cart-list-item {
    display: flex;
  }

  .check-button {
    border-radius: 50%;
    position: relative;
    top: 50%;
    margin-top: -10px;
    border: 1px solid #666;
  }

  .cart-img {
    width: 20%;
    margin: 5px 10px 5px 5px;
    
  }

  .cart-img img{
    width: 100%;
    /* height: 80px; */
    vertical-align: middle;
    border-radius: 10px;
  }

  .cart-msg {
    width: 70%; 
  }

  .cart-msg h4, .cart-msg p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    margin-bottom: 10px;
  }

  .cart-msg h4 {
    margin-top: 5px;
  }

  .cart-msg p {
    font-size: 12px;
  }

  .price-info {
    display: flex;
    justify-content: space-between
  }

  .price {
    color: #f00;
    font-weight: bold;
  }
</style>