import axios from 'axios'
import { Message } from 'element-ui'
import cache from '@/utils/cache'

export const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 20 * 1000
})

// request
instance.interceptors.request.use(config => {
    if (cache.getToken()) {
        config.headers['Authorization'] = `Bearer ${cache.getToken()}`
    }
    return config
}, error => {
    Promise.reject(error)
})

// response
instance.interceptors.response.use(response => {
    const res = response.data
    if (res && res.errorMessage) {
        return Promise.reject(res.errorMessage)
    }
    return Promise.resolve(res)
}, error => {
    Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
    })
    return Promise.reject(error)
})

/**
 * @param   {String}    url
 * @param   {String}    type
 * @param   {Object}    data
 * @param   {Boolean}   isForm
 * @returns {Promise}
 */
export const request = async (url = '', type = 'GET', data = {}, isForm = false) => {
    let result
    type = type.toUpperCase()
    let requestOptions = {
        method: type,
        url: url
    }
    if (isForm) {
        let form = new FormData()
        Object.keys(data).forEach(key => {
            let value = data[key]
            if (Array.isArray(value)) {
                value.forEach(item => {
                    form.append(key, item)
                })
            } else {
                form.append(key, data[key])
            }
        })
        data = form
    }
    requestOptions['headers'] = {
        'Content-type': isForm ? 'multipart/form-data' : 'application/json'
    }
    if (type === 'GET') {
        requestOptions['params'] = data
    } else {
        requestOptions['data'] = data
    }
    await instance(requestOptions).then(res => {
        result = res
    })
    return result
}
