import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/content/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

Vue.use(toast)

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
