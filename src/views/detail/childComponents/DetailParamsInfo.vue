<template>
  <div class="detail-params-info">
    <table v-for='tables in paramsInfo.rule'>
      <tr v-for='tr in tables'>
        <td v-for='td in tr'>
          {{td}}
        </td>
      </tr>
    </table>

    <table class="params-info">
      <tr v-for='tr in paramsInfo.set' class="p-i-tr">
        <td class="p-i-left">{{tr.key}}</td>
        <td class="p-i-right">{{tr.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .detail-params-info {
    border-top: 3px solid rgb(238, 234, 234);
    padding: 10px 0 0 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    border-bottom: 1px solid #f8f6f6;
  }

  td {
    padding: 10px 0;
  }

  .params-info {
    padding: 10px 0 0 0;
    border-top: 2px solid rgb(238, 234, 234);
  }

  .p-i-right {
    color: red;
  }
</style>