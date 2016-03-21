export function configRouter (router) {
  router.map({
  	'/home': {
        component: require('./components/guest/home.vue')
    },
    '/login': {
        component: require('./components/guest/login.vue')
    },
  })
}