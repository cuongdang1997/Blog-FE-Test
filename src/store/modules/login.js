import { getLogin, getUser } from '@/api/login'
import router, { resetRouter } from '@/router'
import cache from '@/utils/cache'

export default {
    namespaced: true,
    state: {
        user: ''
    },
    mutations: {
        SET_USER(state, val) {
            state.user = val
        },
        SET_ROLE(state, val) {
            state.user.roles = val
        }
    },
    actions: {
        async getLoginToken({ commit }, params) {
            return new Promise((resolve, reject) => {
                getLogin(params).then(res => {
                    // console.log('login', res)
                    if (res && res.data.token) {
                        cache.setToken(res.data.token)
                        resolve(res)
                    } else {
                        reject(new Error('nothing login data'))
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        async getUserData({ commit }) {
            return new Promise((resolve, reject) => {
                let token = cache.getToken()
                getUser(token).then(res => {
                    // console.log('user', res)
                    if (res.data) {
                        commit('SET_USER', res.data)
                        resolve(res.data)
                    } else {
                        reject(new Error('nothing user data'))
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                cache.removeToken()
                resetRouter()
                commit('SET_USER', '')
                router.push('/login')
                resolve()
            })
        }
    }
}
