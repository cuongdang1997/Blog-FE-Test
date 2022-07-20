import { request } from '@/utils/request'

export function getList(params) {
  let res = request('/blogs', 'GET', params)
  return res
}

export function getDetail(id) {
  let res = request(`/blogs/${id}`, 'GET')
  return res
}

export function createOrUpdate(data) {
  const _URL = data.id ? `/blogs/${data.id}` : '/blogs'
  const method = data.id ? 'PUT' : 'POST'
  try {
    let res = request(_URL, method, data, true)
    return res
  } catch (error) {
    console.log(error)
  }
}
