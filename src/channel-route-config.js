import cookieutil from './components/common/cookieutil'

export function configRouter (router) {

  router.map({
  	'index': {component: require('./components/channel/index.vue')},
  	'login': {component: require('./components/channel/login.vue')},
  	'report':{component: require('./components/channel/report.vue')},
  });

  router.beforeEach(function (transition) {
	  if (transition.to.path == '/login') {
	    transition.next();
	  } else {
	  	if(cookieutil.cookie('token')!=undefined&&cookieutil.cookie('token')!=''){
	  		transition.next();
	  	}else{
	  		transition.abort();
	    	router.go({path:'/login'})
	  	}
	  }
  });
}