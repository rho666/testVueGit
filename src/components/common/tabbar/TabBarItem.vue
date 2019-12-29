<template>
  <div class="tab-bar-item" @click='itemClick'>
    <div>
      <slot v-if='!isAction' name='item-icon'></slot>
      <slot v-else name='item-icon-active'></slot>
    </div>
    <div :style="colorStyle"><slot name='item-title'></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    link: String,
    changeColor: {
      type: String,
      default: 'rgb(248, 114, 185)'
    }
  },
  data() {
    return {
      // isAction: false,
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link).catch(() => {})
    }
  },
  computed: {
    isAction() {
      return this.$route.path.indexOf(this.link) !== -1
    },
    colorStyle() {
      return this.isAction ? {'color': this.changeColor} : {}
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
  }

  .tab-bar-item img {
    width: 20px;
    vertical-align: middle;
    margin-top: 4px;
  }
</style>