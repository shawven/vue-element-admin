import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'clients',
    method: 'get',
    params: query
  })
}

export function updateClient(query) {
  return request({
    url: 'clients',
    method: 'get',
    params: query
  })
}
