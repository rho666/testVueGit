<template>
  <div class='recommend'>
    <div class='cpn-recommend' v-for='items in recommends'>
      <a :href="items.link">
        <figure>
          <img :src="items.image" alt="">
          <figcaption>{{items.title}}</figcaption>
        </figure>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 10px;
    border-bottom: 7px solid #f3f3f3;
  }

  .cpn-recommend {
    flex: 1;
  }

  .cpn-recommend img{
    width: 65px;
  }
</style>