import request from 'utils/request'
import qs from 'qs'

export const queryWorkDetail = (params: { id: string }) => {
  return request.request({
    url: '/v1/collect/work_detail',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryWorkList = (params) => {
  return request.request({
    url: '/v1/collect/author_work_pagination',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryRecommendWorkList = (params) => {
  return request.request({
    url: '/v1/collect/recommend_works',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 当前有效
export const vaildRemix = () => {
  return request.request({
    url: '/v1/remixs/vaild_remix',
    method: 'post',
  })
}
// 检查会员资产
export const checkOpenseaSAsset = (params) => {
  return request.request({
    url: '/v1/remixs/check_remix_opensea_asset',
    method: 'post',
    data:qs.stringify(params),
  })
}
// mint预请求
export const preRemixMint = (params) => {
  return request.request({
    url: '/v1/remixs/pre_remix_mint',
    method: 'post',
    data:qs.stringify(params),
  })
}
// mint
export const remixMint = (params) => {
  return request.request({
    url: '/v1/remixs/remix_mint',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 检查mint结果
export const checkRemixMint = (params) => {
  return request.request({
    url: '/v1/remixs/check_remix_mint',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 免费mint签名
export const freeMint = (params) => {
  return request.request({
    url: '/v1/remixs/remix_free_mint',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 开放合约地址
export const vaildRemixContractWhitelists = (params) => {
  return request.request({
    url: '/v1/remixs/vaild_remix_contract_whitelists',
    method: 'post',
    data:qs.stringify(params),
  })
}
// 有效地合约白名单
export const memberVaildsAssets = (params) => {
  return request.request({
    url: '/v1/remixs/member_vaild_assets',
    method: 'post',
    data:qs.stringify(params),
  })
}