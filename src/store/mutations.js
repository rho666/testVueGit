import {ADD_COUNTER, ADD_TO_CART} from './mutation-type'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    payload.check = true
    state.cartList.push(payload)
  }
}