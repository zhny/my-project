<!-- 预定房间窗口 -->
<template>
	<modal :show.sync="show">
		<template slot="title">预定</template>
		<div slot="body">
			<ul class="cntlist" >
				<li class="combo-input" style="width:163px;"> 
					<span  class="label-input fl">姓名</span>
					<input class="fl" style="width:100px" type="text" v-model="curOrder.guestName">
				</li>
				<li class="combo-input" style="width:195px;">
					<span  class="label-input fl">手机号</span>
					<input class="fl" style="width:120px" type="text" v-model="curOrder.phone">
				</li>
				<li style="width:150px;">
					<select class="xiala" style="border:1px solid #ccc; font-size:12px;">
						<option>自来客</option>
						<option>自来客1</option>
					</select>
				</li>
				<li class="over">
					<div class="line"></div>
				</li>
				<li class="over pop-booking-room">
					<div class="rmi clx" v-for="item in curOrder.items">
						<datepick :value.sync="curOrder.items[$index].checkInDate" style-obj="float:left; width:116px; margin-right:0; border-right:0;" parent-style="{width:'100px',display: 'inline-block'}"></datepick> 
						<select v-model="curOrder.items[$index].roomId" @change="changeItemRoom($index)" style="width:100px;font-size:12px;float: left; margin-right:0; border-right:0;" >
							<option v-for="(roomId,room) in curRooms" :value="roomId" :selected="roomId==item.roomId">{{room.roomName}}</option>
						</select>
						<select v-model="curOrder.items[$index].nights" style="width:58px;font-size:12px;float: left; margin-right:0; border-right:0;" >
							<option v-for="i in 10" :value="i+1">{{i+1}}晚</option>
						</select>
						<input type="text" v-model="curOrder.items[$index].roomTotalPrice" :value="item.price*item.nights" class="fl tr" style="width:50px; margin-left:-1px; margin-right:5px;">
						<a v-if="$index!=0" @click="deleteOrderItem(item)" title="删除该预订" class="del-book mr5 mt5" href="javascript:;"></a>
						<a  title="添加预订" @click="addOrderItem(item)" class="add-book mt5" href="javascript:;"></a>
					</div>
					<div class="sum">
						<span class="title">订单总额</span>
						<strong >¥{{curOrderTotalPrice}}</strong>
					</div>
				</li>

				<li class="over pop-booking-room">
					<div v-for="pay in curOrderPayList" class="pop-booking-finance mt10 clx" >
						<div class="fr"> <span class="fl mt5 light">{{curOrderPayList[$index].type | showPayType}}：</span>
							<input type="text" class="fl" style="width:50px; margin-right:0;" v-model="curOrderPayList[$index].amount">
							<select v-model="curOrderPayList[$index].payMethod" style="width:63px;font-size:12px;float: left; margin-right:0; border-left:0;" >
								<option v-for="payMethod in payMethods" :value="payMethod.id" :selected="$index==0">{{payMethod.name}}</option>
							</select>
							<a title="删除该收款" class="del-book mr5 mt5" href="javascript:;" @click="removePayType(pay)"></a> 
						</div>
					</div>
					<div class="pop-booking-finance mt10 clx" >
						<div class="fr addfinance" :class="{'addfinance_on':showaAddPay}"> 
							<a href="javascript:;" class="red" @click="showaAddPay=!showaAddPay"><i class="ico-finance mr5"></i>添加收款 + </a>
							<div class="ip-dropdown" style="">
								<div>
									<div  @click="showaAddPay=!showaAddPay"><span class="placeholder">添加收款 + </span></div>
									<div ><a href="javascript:;" @click="addPayType(0)">收款</a></div>
									<div ><a href="javascript:;" @click="addPayType(1)">押金</a></div>
									<div ><a href="javascript:;" @click="addPayType(2)">退房费</a></div>
									<div ><a href="javascript:;" @click="addPayType(3)">其它消费</a></div>
								</div>
							</div>
						</div>
					</div>
					<div class="pop-booking-record" style="">
						<div> <span class="title">已收</span><a href="#" class="t14 past">¥0</a> </div>
						<div> <span class="title">待收</span><a class="t14 unpaid" href="#">¥0</a> </div>
					</div>
				</li>
				<li class="over">
					<div class="line"></div>
				</li>
				<li class="over">
					<textarea v-model="curOrder.remark" maxlength="1000" placeholder="备注信息" style="width:516px; height:50px"></textarea>
				</li>
				<li class="over" id="ordercolor">
					<label class="fl ml20 t12 cursor-p" style="position: relative;margin-left: 30px;">
						<input name="checkbox" type="checkbox" class="hidden-input" >
						提醒<span class="circle-btn-green"></span>
					</label>
					<label class="fr ml20 t12" style="position: relative;margin-right: 14px;">
						<input ga="a" gname="order_担保" name="checkbox" class="hidden-input" type="checkbox" id="o_paystatus">
						已担保<span class="circle-btn"></span>
					</label>
				</li>
			</ul>
		</div>
		<template slot="footer">
			<a class="fl btn btn-info" href="javascript:;" @click="reserveToCheckin">直接入住</a> 
			<a class="btn btn-primary" href="javascript:;" @click="reserve">提交订单</a> 
		</template>
	</modal>
</template>

<script>
import modal from '../common/modal'
import api from '../common/api'
import datepick from '../common/datepick'

export default {
	components:{
		modal,datepick
	},
	props:{
		show:{
			type:Boolean,
			default:false
		},
		curOrder:{
			type:Object,
			default:function(){
				return {
					guestName:"",
			        phone:"",
			        items:[]
				}
			}
		},
		curRooms:{							//房间列表
			type:Object,
			default:function(){
				return {};
			}
		},
		orderId:0,
		roomId:0
	},
	data () {
		return {
			showaAddPay:false,                              //显示添加收款的下拉 
			curOrderPayList:[],
			payMethods:[]									//支付方式
		}
		
	},
	computed:{
		curOrderTotalPrice(){
      		var result=0;
		    for(var i in this.curOrder.items){
		        var item=this.curOrder.items[i];
		        result+=item.price*item.nights;
		    }
		    return result;
    	}
	},
	ready () {
		this.loadPayMethods();
	},
	methods:{
		changeItemRoom(index){
	        var roomId=this.curOrder.items[index].roomId;
	        this.curOrder.items[index].price=this.curRooms[roomId].price;
	    },
		deleteOrderItem(item){                          //删除预定中得某项
	        this.curOrder.items.$remove(item);
	    },
	    addOrderItem(item){                            //添加预定中得项
	        this.curOrder.items.push(Object.assign({}, item));
	    },
	    loadPayMethods(){                               //加载支付类型
	        var $this=this;
	        api.getPayMethods({},function(r){
	        	$this.payMethods=r;
	        });
	    },
	    removePayType(pay){                             //删除付款
	        this.curOrderPayList.$remove(pay);
	    },
	    addPayType(typeId){                          //添加付款
	        this.showaAddPay=false;
	        this.curOrderPayList.push({
	        	amount:0,
	        	type:typeId,
	        	payPoint:0
	        });
	    },
	    reserve(){                               //预定
	        var postData={
	        	orderHeader:this.curOrder,
	        	payList:this.curOrderPayList
	      	}
	      	console.log(postData);
	      	this.show=false;
	    },
	    reserveToCheckin(){						//直接入住
	    	var postData={						//先预定
	        	orderHeader:this.curOrder,
	        	payList:this.curOrderPayList
	      	}
	      	console.log(postData);				
	      	this.orderId=1;
	      	this.roomId=1;
			this.$parent.showCheckIn=true;
	      	this.show=false;
	    }
	},
	filters:{
	    showPayType(type){
	        var result="";
	        switch(type){
	        	case 0 : result='收款';break;
	        	case 1: result='押金';break;
	        	case 2: result="退房费";break;
	        	case 3: result="其他";break;
	        	default:result="";break;
	      	}
	        return result;
		}
	}
}
</script>