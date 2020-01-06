<template>
  <div class='check-button' :class='{active: isCheck}'>
    <img src="~/assets/img/cart/tick.svg" alt="" >
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isCheck: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button img{
    width: 20px;
    vertical-align: middle;
  }

  .check-button.active {
    border: 1px solid #f00;
    background-color: #f00;
  }
</style>