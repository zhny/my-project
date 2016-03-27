import cookieutil from './components/common/cookieutil'

export function configRouter (router) {

  router.map({
  	'index': {component: require('./components/fx/index.vue')},
  	'login': {component: require('./components/fx/login.vue')},
  	'resetpass': {component: require('./components/fx/resetpass.vue')},
  	'report': {component: require('./components/fx/report.vue')}
  });

  router.beforeEach(function (transition) {
	  if (transition.to.path == '/login'||transition.to.path == '/resetpass') {
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