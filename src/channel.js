import './components/common/jquery'
import './assets/channel/css/framework'
import './assets/channel/css/style'
import Vue from 'vue'
import ChannelApp from './ChannelApp'
import VueRouter from 'vue-router'
import { configRouter } from './channel-route-config'


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
router.start(ChannelApp, '#app')

// just for debugging
window.router = router
