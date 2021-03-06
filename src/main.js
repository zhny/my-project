import './assets/css/style'
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
router.start(App, '#app')
router.redirect({
  '/': '/home'
});
// just for debugging
window.router = router