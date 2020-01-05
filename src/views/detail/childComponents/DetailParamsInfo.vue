<template>
  <div class="detail-params-info">
    <table v-for='(tables,index) in paramsInfo.rule' :key='index'>
      <tr v-for='(tr,indey) in tables' :key='indey'>
        <td v-for='(td,indez) in tr' :key='indez'>
          {{td}}
        </td>
      </tr>
    </table>

    <table class="params-info">
      <tr class="p-i-tr" v-for='(tr,index) in paramsInfo.set' :key='index'>
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
    padding: 10px 10px;
  }

  table {
    font-size: 13px;
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    border-bottom: 1px solid #f8f6f6;
  }

  tr td:nth-child(1) {
    width: 35px;
  }


  td {
    padding: 10px 0;
  }

  .params-info {
    padding: 10px 0 0 0;
    border-top: 2px solid rgb(238, 234, 234);
    display: flex;
    flex-direction: column;
  }

  .p-i-right {
    color: red;
  }
</style>