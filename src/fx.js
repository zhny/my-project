import './assets/css/sm.min'
import './assets/js/zepto.min'
// import './assets/js/sm.min'

import Vue from 'vue'
import FxApp from './FxApp'
import VueRouter from 'vue-router'
import { configRouter } from './fx-route-config'


$.config = {router: false}				//禁用SUI路由

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
  '/': '/index'
});
router.start(FxApp, '#app')

// just for debugging
window.router = router
