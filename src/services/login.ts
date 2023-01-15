import request from 'utils/request'
import qs from 'qs'

export const login = (params) => {
  return request.request({
    url: '/v1/member/member_login',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const queryLoginHash = (params) => {
  return request.request({
    url: '/v1/member/member_hash',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const queryLoginOut = () => {
  return request.request({
    url: '/v1/member/member_logout',
    method: 'post',
  })
}
