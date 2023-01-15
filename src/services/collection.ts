import request from 'utils/request'
import qs from 'qs'

export const queryCollectionDetail = (params: { id: string }) => {
  return request.request({
    url: '/v1/collect/collect_detail',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryCollectionList = (params) => {
  return request.request({
    url: '/v1/collect/collect_pagination',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryExchangeParams = (params) => {
  return request.request({
    url: '/v1/collect/collect_exchange',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const snapshotCollection = (params) => {
  return request.request({
    url: '/v1/collect/exchange/snapshot',
    method: 'get',
    params,
  })
}

export const queryExchangeStatus = (params) => {
  return request.request({
    url: '/v1/collect/exchange/by/code',
    method: 'get',
    params,
  })
}
// 集卡兑换提交哈希和code
export const getCodeAndcode = (params) => {
  return request.request({
    url: '/v1/collect_exchange/check_collect_exchange_tx',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const clearExchangeStatus = (params) => {
  return request.request({
    url: '/v1/collect/clear/exchange',
    method: 'get',
    params,
  })
}
