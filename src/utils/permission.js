import router from '@/router'
import store from '@/store'
import cache from '@/utils/cache'

const publicpermission = ['/', '/login', '/page401', '/page404', '/page500']

router.beforeEach((to, from, next) => {
    if (!publicpermission.includes(to.path)) {
      if (cache.getToken()) {
          if (to.path === '/login') {
              next('/index')
              // next()
          } else {
              let userInfo = store.state.login.user
              if (userInfo) {
                  assessPermission(userInfo.roles, to.meta.roles, next)
              } else {
                  store.dispatch('login/getUserData').then(res => {
                      store.dispatch('routes/generateRoutes').then(addRoutes => {
                          router.addRoutes(addRoutes)
                          next({ ...to, replace: true })
                      })
                  }).catch(err => {
                      console.log(err)
                      window.alert('You cannot access this page please login!')
                      store.dispatch('login/logout').then(() => {
                          next({ path: '/login', query: { redirect: to.fullPath } })
                      })
                  })
              }
          }
      } else {
          if (to.path === '/login') {
              next()
          } else {
              next({ path: '/login', query: { redirect: to.fullPath } })
          }
      }
    } else {
      next()
    }
})

function assessPermission(userRole, pageRole, next) {
    let pass = false
    if (!pageRole || userRole.indexOf('admin') > -1) pass = true
    if (typeof pageRole === 'string') {
        if (userRole.indexOf(pageRole) > -1) pass = true
    } else if (Array.isArray(pageRole)) {
        if (pageRole.some(role => userRole.indexOf(role) > -1)) pass = true
    }
    pass ? next() : next('/page401')
}
