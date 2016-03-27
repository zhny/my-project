import cookieutil from './cookieutil'

function wrapData(d){
	var result={};
	result.token="xxxxxx",
	result.data=d;
	return result;
}
function handleResp(r){
	if(r.code==0){
		return r.data;
	}else{					//其他错误码处理
		alert(r.msg);
		return null;
	}
}

export default{

	addroom(d,cb){						//增加或修改房间
		setTimeout(function(){
			cb({'roomId':1});
		},500);
		// $.post('/vhotel/addroom',wrapData(d),function(r){ 			//POST
  //       	cb(handleResp(r);
  //       }); 
	},
	getHotels(d,cb){					//获取客栈
		setTimeout(function(){
			cb(require('./data/hotels'))
		},500);
		// $.get('/vhotel/hotel/getHotels',wrapData(d),function(r){     //GET请求
  //       	cb(handleResp(r);
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
	delroom(d,cb){					//删除房间
		setTimeout(function(){
			cb();
		},500);
	},
	customers(d,cb){					//获取入住客户信息
		setTimeout(function(){
			cb(require('./data/customers'))
		},500);
	},
	autosmsconfs(d,cb){					//获取自动短信配置
		setTimeout(function(){
			cb(require('./data/autosmsconfs'))
		},500);
	},
	autosmsconfs_post(d,cb){					//设置自动短信配置
		setTimeout(function(){
			cb();
		},500);
	},
	smshistory(d,cb){					//获取短信发送历史
		setTimeout(function(){
			cb(require('./data/smshistory'))
		},500);
	},
	users(d,cb){					//获取用户列表
		setTimeout(function(){
			cb(require('./data/users'))
		},500);
	},
	submitUser(d,cb){						//增加或修改用户
		alert("ok")
		setTimeout(function(){
			cb({'userId':1});
		},500);
		// $.post('/vhotel/addroom',wrapData(d),function(r){ 			//POST
  		// 			cb(handleResp(r);
  		// 		}); 
	},
	deluser(d,cb){					//删除用户
		setTimeout(function(){
			cb();
		},500);
	},
	getUser(d,cb){					//获取用户
		setTimeout(function(){
			cb(require('./data/users'))
		},500);
		// $.get('/vhotel/hotel/getHotels',wrapData(d),function(r){     //GET请求
  		//       	cb(handleResp(r);
  		//       });
  	},
  	getChannels(d,cb){					//获取分销渠道列表
		setTimeout(function(){
			cb(require('./data/channels'))
		},500);
		// $.get('/vhotel/hotel/getHotels',wrapData(d),function(r){     //GET请求
  		//       	cb(handleResp(r);
  		//       });
  	},
  	orders(d,cb){					//获取订单列表
		setTimeout(function(){
			cb(require('./data/orders'))
		},500);
	},
	getDistorders(d,cb){					//获取分销订单列表
		setTimeout(function(){
			cb(require('./data/distorders'))
		},500);
	},
	getOrderStatistic(d,cb){					//获取返点总金额
		setTimeout(function(){
			cb(require('./data/orderStatistic'))
		},100);
	},
	logs(d,cb){					//获取操作日志
		setTimeout(function(){
			cb(require('./data/logs'))
		},500);
	},
	submitChan(d,cb){						//增加或修改分销渠道
		alert("ok")
		setTimeout(function(){
			cb();
		},500);
		// $.post('/vhotel/addroom',wrapData(d),function(r){ 			//POST
  		// 			cb(handleResp(r);
  		// 		}); 
  	},
  	delChan(d,cb){					//删除渠道
		setTimeout(function(){
			cb();
		},500);
	},
	getPayMethods(d,cb){
		setTimeout(function(){
			cb(require('./data/payMethods'));
		},500);
	},
	roomorder(d,cb){
		setTimeout(function(){
			cb(require('./data/roomOrderInfo'));
		},500);
	},
	login(d,cb){
		setTimeout(function(){
			cookieutil.cookie('token', 'aaaaa', { expires: 90 });
			cb();
		},1000);
	},
	mychannel(d,cb){
		setTimeout(function(){
			cb(require('./data/mychannel'));
		},500);
	},
	myorders(d,cb){								//分销商的分销统计
		setTimeout(function(){
			cb(require('./data/myorders'));
		},500);
	},
	getSmsVali(d,cb){								//获取手机验证码
		setTimeout(function(){
			cb();
		},500);
	},
	resetpassword(d,cb){								//重置密码
		setTimeout(function(){
			cb();
		},500);
	},

	// 消费者
	getHotel(d,cb){					//消费者获取客栈
		setTimeout(function(){
			cb(require('./data/hotel'))
		},500);
		// $.get('/vhotel/hotel/getHotels',wrapData(d),function(r){     //GET请求
  //       	cb(handleResp(r);
  //       }); 
  	},
  	getAccount(d,cb){
		setTimeout(function(){
			cb(require('./data/account'));
		},500);
	},
	getOrders(d,cb){					//获取订单列表
		setTimeout(function(){
			cb(require('./data/orders'));
		},500);
	},
}