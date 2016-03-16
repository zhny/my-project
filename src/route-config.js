export function configRouter (router) {

  router.map({
    '/hotel': {
      component: require('./components/hotel/index.vue'),
      subRoutes: {
        'roomstatus': {
          component: require('./components/hotel/roomstatus.vue')
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
    },
    '/setting': {
      component: require('./components/setting/index.vue'),
      subRoutes: {
        'userlist': {
          component: require('./components/setting/userlist.vue')
        },
        'distribute': {
          component: require('./components/setting/distribute.vue')
        }
      }
    },
    '/distri': {
      component: require('./components/distri/index.vue'),
      subRoutes: {
        'distlist': {
          component: require('./components/distri/distlist.vue')
        },
        'channel': {
          component: require('./components/distri/channel.vue')
        }
      }
    },
  })
}
