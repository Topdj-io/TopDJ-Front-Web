import request from 'utils/request'
import qs from 'qs'

export const queryAuthorDetail = (params: { id: string }) => {
  return request.request({
    url: '/v1/collect/author_detail',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryAuthorList = (params) => {
  return request.request({
    url: '/v1/collect/author_pagination',
    method: 'post',
    data:qs.stringify(params),
  })
}

export const queryAuthorHotList = (params) => {
  return request.request({
    url: '/v1/collect/hot_authors',
    method: 'post',
    data:qs.stringify(params),
  })
}
