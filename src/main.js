import './assets/css/miot'
import './assets/css/inn'
import './assets/css/Calendar'
import './assets/css/inn-ota'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'

Vue.use(VueRouter)

// create router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

configRouter(router)
router.redirect({
  '*': '/hotel/setting'
})
router.start(App, '#app')

// just for debugging
window.router = router
