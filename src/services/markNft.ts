import request from 'utils/request'
import qs from 'qs'

export const pagination = (params: { keyword: string,order:string,page:number,size:number }) => {
  return request.request({
    url: '/v1/order/pagination',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const detail = (params: { id }) => {
  return request.request({
    url: '/v1/order/detail',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const check = (params: { hash }) => {
  return request.request({
    url: '/v1/order/check',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const nftDetails = (params: { id }) => {
  return request.request({
    url: '/v1/nft/detail',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const approve = () => {
  return request.request({
    url: '/v1/member/approve',
    method: 'post',
  })
}
