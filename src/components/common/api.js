function wrapData(d){
	var result={};
	result.token="xxxxxx",
	result.data=d;
	return result;
}

export default{

	addroom(d,cb){						//增加或修改房间
		setTimeout(function(){
			// cb(require('./data/'))
			cb({'roomId':1});
		},500);
		// $.post('/vhotel/addroom',wrapData(d),function(r){ 
  //       	cb(r);
  //       }); 
	},
	getHotels(d,cb){					//获取客栈
		setTimeout(function(){
			cb(require('./data/hotels'))
		},500);
		// $.get('/vhotel/hotel/getHotels',wrapData(d),function(r){ 
  //       	cb(r);
  //       }); 
		
	},
	roomlist(d,cb){						//根据条件获取房间列表
		setTimeout(function(){
			cb(require('./data/roomlist'))
		},500);
	},
	roomdetail(d,cb){					//获取房间详情
		setTimeout(function(){
			cb(require('./data/roomdetail'))
		},500);
	},
	roomstatus(d,cb){					//获取房态,订单
		setTimeout(function(){
			cb(require('./data/roomstatus'))
		},500);
	},
	delroom(d,cb){					//获取房态,订单
		setTimeout(function(){
			cb();
		},500);
	},
	customers(d,cb){					//获取房态,订单
		setTimeout(function(){
			cb(require('./data/customers'))
		},500);
	},
}