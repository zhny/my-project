export function configRouter (router) {

  router.map({
    '/hotel': {
      component: require('./components/hotel/index.vue'),
      subRoutes: {
        'setting': {
          component: require('./components/hotel/setting.vue')
        }
      }
    }
  })
}
