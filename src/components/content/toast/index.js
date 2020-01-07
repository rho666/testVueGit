import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // 创建一个构造器
  const toastConstructor = Vue.extend(Toast)

  const toast = new toastConstructor()

  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
