import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css' // element-ui
import VueProgressBar from 'vue-progressbar'
import vueSticky from 'vue-position-sticky'
import vueBacktop from 'vue-backtop-pack'
import vueNumTo from 'vue-num-to'
import vueClipboard from 'vue-clipboard-pack'

import '@/assets'
import '@/components'
import '@/directive'
import '@/filters'
import '@/utils/permission'
import '@/utils/errorLog'
import '@/utils/cache'
import i18n from '@/language'

// import '@/mock'

import { BootstrapVue, IconsPlugin, LayoutPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', i18n: (key, value) => i18n.t(key, value) })
Vue.use(VueProgressBar)
Vue.use(vueSticky)
Vue.use(vueBacktop)
Vue.use(vueNumTo)
Vue.use(vueClipboard)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(LayoutPlugin)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
