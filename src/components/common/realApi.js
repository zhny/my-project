import cookieutil from './cookieutil'

function wrapData(d){
	var result=d;
	result.token="xxxxxx";
	// result.data=d;
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
	getHotels(d,cb){					//获取客栈
		$.get('/vhotel/hotel/getHotels',wrapData(d),function(r){     //GET请求
        	cb(handleResp(r));
        }); 
	},
	getTypesAndRooms(d,cb){					//获取客栈
		$.get('/vhotel/hotel/getRoomsByHotel',wrapData(d),function(r){     //GET请求
        	cb(handleResp(r));
        }); 
	}
}

