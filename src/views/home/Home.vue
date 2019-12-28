<template>
  <div>
    <nav-bar id='home-nav'>
      <div slot="center">首页</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>

<style>
  #home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>