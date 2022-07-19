import { request } from '@/utils/request'

export function getList(params) {
  let res = request('/blogs', 'GET', params)
  return res
}

export function getDetail(id) {
  let res = request(`/blogs/${id}`, 'GET')
  return res
}
