<template>
  <div id="store">
    <div class='store-name'>
      <img :src="store.shopLogo" alt="">
      <span>{{store.name}}</span>
    </div>
    <div class="store-des">
      <div class="des-left">
        <div class="des-left-sell">
          <p>{{showcSell | showSell}}</p>
          <p>总销量</p>
        </div>
        <div class="des-left-goods">
          <p>{{store.cGoods}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class='center'></div>
      <div class="des-right">
        <table >
          <tr v-for='(item,index) in store.score' :key='index'>
            <td>{{item.name}}</td>
            <td class='td-center' :class='{red : item.isBetter}'>{{item.score}}</td>
            <td v-if='item.isBetter'><p class='g-color'>高</p></td>
            <td v-else><p class='b-color'>低</p></td>
          </tr>
        </table>
      </div>
    </div>
    <div class='enter-store'>
      <div>
        <a href="">进店逛逛</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailStore',
  props: {
    store: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  
  computed: {
    showcSell() {
      return this.store.cSells/10000
    }
  },

  // 过滤器
  filters: {
    showSell(sell) {
      return sell.toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
  #store {
    padding: 8px;
  }

  .store-name {
    padding: 20px 0;
    display: flex;
  }

  .store-name img {
    width: 50px;
    border-radius: 50%;
  }

  .store-name span {
    line-height: 50px;
    margin-left: 10px;
  }

  .store-des {
    display: flex;
    text-align: center;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
    /* flex: 1; */
  }

  .center {
    border: 1px solid rgb(214, 208, 208);
  }

  .des-left {
    display: inline-flex;
    margin-top: 15px;
  }

  .des-left-sell {
    margin-right: 10px;
    margin-left: 10px;
  }

  .des-left-sell :nth-child(2),.des-left-goods :nth-child(2) {
    font-size: 12px;
  }

  .des-left-goods {
    /* margin-left: 10px; */
  }

  table {
    font-size: 12px;
    text-align: left;
  }

  tr {
    margin: 2px 3px;
  }

  .g-color {
    background-color: red;
    color: #fff;
  }

  .b-color {
    background-color: green;
    color: #fff;
  }

  .td-center {
    padding: 3px;
    color: green;
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .enter-store {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    border-bottom: 3px solid rgb(214, 208, 208)
  }

  .enter-store div{
    width: 50%;
    background-color: rgb(219, 211, 211);
    text-align: center;
    padding: 5px 0;
    border-radius: 10px;
    font-size: 12px;
  }

  
</style>