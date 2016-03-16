export function configRouter (router) {

  router.map({
    '/hotel': {
      component: require('./components/hotel/index.vue'),
      subRoutes: {
        'roomstatus': {
          component: require('./components/hotel/roomstatus.vue')
        },
        'orders': {
          component: require('./components/hotel/orders.vue')
        },
        'roomlist': {
          component: require('./components/hotel/roomlist.vue')
        },
        'addroom': {
          component: require('./components/hotel/addroom.vue')
        }
      }
    },
    '/customer': {
      component: require('./components/customer/index.vue'),
      subRoutes: {
        'infos': {
          component: require('./components/customer/infos.vue')
        },
        'sms': {
          component: require('./components/customer/sms.vue')
        }
      }
    }
  })
}
