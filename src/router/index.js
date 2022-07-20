import Vue from 'vue'
import Router from 'vue-router'

const PageView = () => import('@/layout/PageView')

Vue.use(Router)

/* Routes Config
* @meta
* icon: ''
* title: ''
* login: false
* ss: 'admin' || ['admin']
* keep: false
* hidden: false
* open: false
* redirectIndex: 0
* affix: false
*/

export const asyncRoutes = [
    {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/pages/index/children/dashboard'),
        meta: {
            icon: 'dashboard',
            affix: true
        }
    },
    {
        name: 'guide',
        path: 'guide',
        component: () => import('@/pages/index/children/guide/guide'),
        meta: {
            icon: 'guide'
        }
    },
    {
        name: 'post',
        path: 'post',
        component: () => import('@/pages/index/children/post'),
        meta: {
          icon: 'documentation'
        }
    },
    {
      name: 'post-update',
      path: 'post/update',
      component: () => import('@/pages/index/children/post/update'),
      meta: {
        hidden: true
      }
    },
    {
        name: 'post-update',
        path: 'post/update/:id',
        component: () => import('@/pages/index/children/post/update'),
        meta: {
          hidden: true
        }
    },
    // {
    //     name: 'permission',
    //     path: 'permission',
    //     component: () => import('@/pages/index/children/permission/permission'),
    //     meta: {
    //         icon: 'lock',
    //         roles: 'admin'
    //     }
    // },
    {
        name: 'icons',
        path: 'icons',
        component: () => import('@/pages/index/children/icons/icons'),
        meta: {
            icon: 'icons'
        }
    },
    {
        name: 'errorPage',
        path: 'errorPage',
        component: PageView,
        meta: {
            icon: '404'
        },
        children: [
            {
                name: '401',
                path: '401',
                component: () => import('@/pages/other/page401')
            },
            {
                name: '404',
                path: '404',
                component: () => import('@/pages/other/page404')
            }
        ]
    },
    {
        name: 'errorLog',
        path: 'errorLog',
        component: () => import('@/pages/index/children/errorLog/errorLog'),
        meta: {
            icon: 'bug'
        }
    },
    {
        name: 'i18n',
        path: 'i18n',
        component: () => import('@/pages/index/children/i18n-demo'),
        meta: {
            icon: 'global'
        }
    }
]

export const localRoutes = [
    {
        name: 'home',
        path: '',
        component: () => import('@/pages/homepage')
        // redirect: '/login'
    },
    {
        path: '/post/:id',
        component: () => import('@/pages/post-detail')
    },
    {
        path: '/login',
        component: () => import('@/pages/login/login')
    },
    {
        path: '/page401',
        component: () => import('@/pages/other/page401')
    },
    {
        path: '/page404',
        component: () => import('@/pages/other/page404')
    }
]

const createRouter = () => new Router({
    mode: 'history',
    routes: localRoutes,
    scrollBehavior: () => ({ y: 0 })
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
