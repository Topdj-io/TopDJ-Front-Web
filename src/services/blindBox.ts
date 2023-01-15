import request from 'utils/request'
import qs from 'qs'

// 盲盒详情
export const queryBlindBoxDetailInfo = (params) => {
  return request.request({
    url: '/v1/collect/blind_box_detail',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 首页盲盒
export const queryHomeBlindBoxInfo = (params) => {
  return request.request({
    url: '/v1/collect/blind_box_top',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 盲盒详情数量
export const queryHomeBlindBoxInfoCount = (params) => {
  return request.request({
    url: '/v1/collect/blind_box_count',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 首页盲盒数量
export const queryBlindBoxDetailInfoCount = (params) => {
  return request.request({
    url: '/v1/collect/blind_box_top_count',
    method: 'post',
    data:qs.stringify(params),
  })
}
export const buyBlindBox = (data) => {
  return request.request({
    url: '/v1/blind-box/purchase',
    method: 'post',
    data,
  })
}

export const openBlindBox = (params) => {
  return request.request({
    url: '/v1/blind-box/lottery',
    method: 'get',
    params,
  })
}

export const queryUserBlindBoxInfo = (params) => {
  return request.request({
    url: '/v1/blind-box/page/self',
    method: 'get',
    params,
  })
}

export const queryAuthorBlindBoxInfo = (params) => {
  return request.request({
    url: '/v1/blind-box/page/author',
    method: 'get',
    params,
  })
}
// 检测盲盒购买资格
export const checkBlindBoxStage = (params) => {
  return request.request({
    url: '/v1/collect/check_blind_box_stage',
    method: 'POST',
    data:qs.stringify(params),
  })
}
// 白名单购买盲盒
export const purchaseBlindBox = (params) => {
  return request.request({
    url: '/v1/collect/purchase_blind_box',
    method: 'POST',
    data:qs.stringify(params),
  })
}
