import request from 'utils/request'
import qs from 'qs'

export const queryMembershipList = (params) => {
  return request.request({
    url: '/v1/member/activity',
    method: 'get',
    params,
  })
}

export const queryUserMembershipList = (params) => {
  return request.request({
    url: '/v1/member/member_cards',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryMembershipResultByTx = (params) => {
  return request.request({
    url: '/v1/member/nft/by/tx',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const sendMemberTx = (data) => {
  return request.request({
    url: '/v1/member/member/tx',
    method: 'post',
    data,
  })
}

export const buyPreSaleMembership = (params) => {
  return request.request({
    url: '/v1/member/pre/sale/purchase',
    method: 'get',
    params,
  })
}
