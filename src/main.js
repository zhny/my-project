import './assets/css/inn'
import './assets/css/inn-ota'
import './assets/css/custom'
import './components/common/jquery'

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'


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
router.redirect({
  '/': '/hotel/roomstatus'
})
router.start(App, '#app')

// just for debugging
window.router = router
