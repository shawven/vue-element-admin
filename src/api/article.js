import request from '@/utils/request'

export function fetchList(query) {
  const platform = query.platform
  delete query.platform
  return request({
    url: `/article/${platform}`,
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
