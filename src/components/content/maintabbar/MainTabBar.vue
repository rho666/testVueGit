<template>
  <div>
    <keep-alive exclude='Detail'>
      <router-view></router-view>
    </keep-alive>
    <tab-bar>
      <tab-bar-item link="/home">
        <img src="~assets/img/tabbar/home.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/home_active.svg" alt slot="item-icon-active" />
        <p slot="item-title">首页</p>
      </tab-bar-item>
      <tab-bar-item link="/category">
        <img src="~assets/img/tabbar/category.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/category_active.svg" alt slot="item-icon-active" />
        <p slot="item-title">分类</p>
      </tab-bar-item>
      <tab-bar-item link="/cart">
        <img src="~assets/img/tabbar/shopcart.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/shopcart_active.svg" alt slot="item-icon-active" />
        <p slot="item-title">购物车</p>
      </tab-bar-item>
      <tab-bar-item link="/profile">
        <img src="~assets/img/tabbar/profile.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/profile_active.svg" alt slot="item-icon-active" />
        <p slot="item-title">我的</p>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTAbBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>