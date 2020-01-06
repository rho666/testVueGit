import {request} from './request'

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommends() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title,
    this.price = itemInfo.price,
    this.oldPrice = itemInfo.oldPrice,
    this.discountDesc = itemInfo.discountDesc,
    this.columns = columns,
    this.services = shopInfo.services
    this.desc = itemInfo.desc
    this.lowNowPrice = itemInfo.lowNowPrice
  }
}

export class Store {
  constructor(shopInfo) {
    this.cGoods = shopInfo.cGoods,
    this.cSells = shopInfo.cSells,
    this.cFans = shopInfo.cFans,
    this.name = shopInfo.name,
    this.score = shopInfo.score,
    this.shopLogo = shopInfo.shopLogo
  }
}

export class ParamsInfo {
  constructor(info, rule) {
    this.set = info.set,
    this.rule = rule.tables
  }
}