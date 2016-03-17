import './assets/css/inn'
import './assets/css/inn-ota'
import './assets/css/custom'
import './components/common/jquery'

import Vue from 'vue'
import AdminApp from './AdminApp'
import VueRouter from 'vue-router'
import { configRouter } from './admin-route-config'


Vue.config.debug = true
Vue.use(VueRouter)

// create router
// const router = new VueRouter({
//   history: true,
//   saveScrollPosition: true
// })

const router = new VueRouter({
})

configRouter(router)

router.start(AdminApp, '#app')
router.redirect({
  '/': '/hotel/roomstatus'
});
// just for debugging
window.router = router