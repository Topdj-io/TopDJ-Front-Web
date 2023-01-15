import request from 'utils/request'
import qs from 'qs'

export const queryUserInfo = () => {
  return request.request({
    url: '/v1/member/member_info',
    method: 'post',
  })
}

export const queryUserAvatarList = () => {
  return request.request({
    url: '/v1/member/avatars',
    method: 'post',
  })
}

export const queryUserInviteList = () => {
  return request.request({
    url: '/v1/member/top_member_invitors',
    method: 'post',
  })
}

export const updateUserAvater = (params) => {
  return request.request({
    url: '/v1/member/update_member_avatar',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const updateUserInfo = (params) => {
  return request.request({
    url: '/v1/member/update_member_profile',
    method: 'post',
    data:qs.stringify(params),
  })
}
