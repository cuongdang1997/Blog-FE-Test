import { request } from '@/utils/request'

export function getLogin(form) {
    let res = request('/login', 'POST', form)
    return res
}
export function getUser(token) {
    let res = request('/me', 'GET')
    return res
}
