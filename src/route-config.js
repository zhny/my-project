export function configRouter (router) {
  router.map({
  	'/home': {
        component: require('./components/guest/home.vue')
    },
    '/login': {
        component: require('./components/guest/login.vue')
    },
    '/registor': {
        component: require('./components/guest/registor.vue')
    },
    '/inn': {
        component: require('./components/guest/inn.vue')
    },
    '/orderfill': {
        component: require('./components/guest/orderfill.vue')
    },
    '/questFb': {
        component: require('./components/guest/questFb.vue')
    },
    '/orderView': {
        component: require('./components/guest/orderView.vue')
    },
  })
}