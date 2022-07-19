import { localRoutes, asyncRoutes } from '@/router'

export default {
    namespaced: true,
    state: {
        allRoutes: [],
        sideRoutes: []
    },
    mutations: {
        SET_ALL_ROUTES: (state, routes) => {
            state.allRoutes = [...routes]
        },
        SET_SIDE_ROUTES: (state, routes) => {
            state.sideRoutes = [...routes]
        }
    },
    actions: {
        generateRoutes({ commit }) {
            return new Promise(resolve => {
                const finalAsyncRoutes = [...asyncRoutes]
                let finalAsyncParentRoutes = { ...asyncParentRoutes }
                finalAsyncParentRoutes.children = [...finalAsyncRoutes, extraPanentRoutes]
                const sideRoutes = setRedirect([finalAsyncParentRoutes])
                const addRoutes = [...sideRoutes, extraGlobalRoutes]
                const allRoutes = [...localRoutes, ...addRoutes]
                commit('SET_SIDE_ROUTES', sideRoutes)
                commit('SET_ALL_ROUTES', allRoutes)
                resolve(addRoutes)
            })
        }
    }
}

const asyncParentRoutes = {
    name: 'index',
    path: '/index',
    component: () => import('@/pages/index/index'),
    meta: {
        login: true
    },
    children: []
}
const extraPanentRoutes = {
    path: 'redirect/:path*',
    component: () => import('@/pages/other/redirect'),
    meta: {
        hidden: true
    }
}
const extraGlobalRoutes = {
    path: '*',
    redirect: '/page404'
}

function setRedirect(routes, redirect = '') {
    routes.forEach(route => {
        if (route.children && route.children.length > 0) {
            if (!route.redirect) {
                let defaultRedirectRoute = route.children.filter(item => !item.meta || !item.meta.hidden)[0]
                let redirectIndex = route.meta && route.meta.redirectIndex
                if (redirectIndex) {
                    defaultRedirectRoute = route.children[redirectIndex]
                }
                let redirectName = defaultRedirectRoute.name
                route.redirect = `${redirect}/${route.name}/${redirectName}`
            }
            let fatherDir = route.redirect && `${redirect}/${route.name}`
            route.children = setRedirect(route.children, fatherDir)
        }
    })
    return routes
}
