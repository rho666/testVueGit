<template>
  <div class="cart-bottom-bar">
    <!-- 全选按钮 -->
    <div class='check'>
      <check-button class='check-button' :isCheck='isSelectAll' @click.native='clickCheck'/>
      <span>全选</span>
    </div>
    <!-- 合计 -->
    <div class='total'><p>合计:{{totalprice}}</p></div>
    <!-- 去结算 -->
    <div class='settle' @click='clickCount'>去计算({{totalCount}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

import {mapGetters} from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalprice() {
      return "￥" + this.cartList.filter(item => {
        return item.check
      }).reduce((prevalue, item) => {
        return prevalue + item.lowNowPrice * item.count
      }, 0).toFixed(2)
    },
    totalCount() {
      return this.cartList.filter(item => {
        return item.check
      }).reduce((prevalue, item) => {
        return prevalue + item.count
      },0)
    },
    isSelectAll() {
      if(this.cartList.length === 0 ) return false

      // 使用filter
      // return !(this.cartList.filter(item => !item.check).length)

      // 使用find
      return !(this.cartList.find(item => !item.check))

      // 普通遍历方式
      // for(let item of this.cartList) {
      //   if(!item.check) {
      //     console.log('1')
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    clickCheck() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.check = false)
      }else {
        this.cartList.forEach(item => item.check = true)
      }
    },
    clickCount() {
      if(!this.isSelectAll) {
        this.$toast.show('请添加商品')
      }
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    display: flex;
    height: 40px;
    background-color: rgb(206, 206, 206);
    align-items: center;
    justify-content: space-around;
    flex-wrap:nowrap;
    font-size: 12px;
  }

  .check {
    display: flex;
    margin: 0 10px 0 0;  
  } 

  .check-button {
    height: 22px;
    width: 22px;
    border: 1px solid #666;
    border-radius: 50%;
    margin: 0 10px;
    }

  .total {
    line-height: 40px;
    flex:1;
  }

  .settle {
    line-height: 40px;
    background-color: #f00;
    color: #fff;
    width: 80px;
    text-align: center;
  }
</style>