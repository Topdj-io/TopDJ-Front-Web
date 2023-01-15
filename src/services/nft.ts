import request from 'utils/request'
import qs from 'qs'

export const queryNftDetail = (params: { id: string }) => {
  return request.request({
    url: '/v1/nft',
    method: 'get',
    params,
  })
}

export const queryUserNftInfo = (params) => {
  return request.request({
    url: '/v1/nft/member_nft_pagination',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryNftHolderList = (params) => {
  return request.request({
    url: '/v1/nft/nft_member_pagination',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryNftListByTx = (params) => {
  return request.request({
    url: '/v1/collect/check_blind_box_tx',
    method: 'post',
    data:qs.stringify(params),
  })
}
// token查询会员  查自己
export const queryBlindBoxExchange = () => {
  return request.request({
    url: '/v1/collect/member_blind_box_exchange',
    method: 'post',
  })
}
// 地址查询会员
export const queryAddressBlindBoxExchange = (params) => {
  return request.request({
    url: '/v1/collect/address_blind_box_exchange',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 会员兑换盲盒
export const queryBlindExchange = (params) => {
  return request.request({
    url: '/v1/collect/blind_box_exchange',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 会员兑换提交哈希和code
export const getCodeAndHash = (params) => {
  return request.request({
    url: '/v1/collect/check_blind_box_tx',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 免费盲盒兑换提交哈希和code
export const checkBlindBoxExchangeTx = (params) => {
  return request.request({
    url: '/v1/nft/check_blind_box_exchange_tx',
    method: 'post',
    data:qs.stringify(params),
  })
}


