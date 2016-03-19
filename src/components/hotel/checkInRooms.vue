<!-- 入住 -->
<template>
	<modal :show.sync="show">
		<template slot="main-title">
			<h3>
				<b class="noclass">
					<span>{{roomorder.guestName}}</span>
				</b>
				<span class="noclass">{{roomorder.phone}}<tt></tt></span>
				<p class="noclass"></p>
			</h3>
		</template>
		<div slot="body">
			<ul class="cntlist">
				<li class="confirm over" tag="orderdesc">
					<div class="orderinfo">
						<b class="tprice">订单总额：<span>¥{{roomorder.orderHeader.payInfo.needPayMoney}}</span></b>
						<div v-for="item in roomorder.orderHeader.orderItems">
							{{item.roomName}}, 03/19入住, {{item.nights}}晚, ¥{{item.roomTotalPrice}}
						</div>
					</div>
				</li>
				<li class="confirm over"><div class="line"></div></li>
				<li class="confirm over">
					<div class="finance clx">
						<table cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td>
										<div class="wrapper clx">
											<div class="clx">
												<div class="priceinfo mb5">
													<div>总费用：<span>￥{{roomorder.orderHeader.payInfo.needPayMoney}}</span> (房费￥{{roomorder.orderHeader.payInfo.needPayMoney}})</div>
													<div>已收款：<span>￥{{roomorder.orderHeader.payInfo.payedMoney}}</span></div>
													<div class="red">待&#12288;付：<span>￥{{roomorder.orderHeader.payInfo.needPayMoney-roomorder.orderHeader.payInfo.payedMoney}}</span></div>
												</div>
											</div>
											<div class="mb5 clx">
												<div class="fl">
													<span class="label-input fl">添加收款</span>
													<input type="text" v-model="curPayList[0].amount" style="width:60px; margin-right:0;" class="fl">
													<select v-model="curPayList[0].payMethod" style="width:63px;font-size:12px;float: left; margin-right:0; border-left:0;" >
														<option v-for="payMethod in payMethods" :value="payMethod.id" :selected="$index==0">{{payMethod.name}}</option>
													</select>
												</div>
												<div class="fl ml10">
													<span class="label-input fl">押金</span>
													<input type="text" v-model="curPayList[1].amount" style="width:60px; margin-right:0;" class="fl">
													<select v-model="curPayList[1].payMethod" style="width:63px;font-size:12px;float: left; margin-right:0; border-left:0;" >
														<option v-for="payMethod in payMethods" :value="payMethod.id" :selected="$index==0">{{payMethod.name}}</option>
													</select>
												</div>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li class="confirm over"><div class="line"></div></li>
				<li class="over">
					<div class="clx" v-for="guest in roomorder.guests">
						<input type="text" v-model="roomorder.guests[$index].name" style="width:56px; margin-right:0;" class="fl">
						<input type="text" v-model="roomorder.guests[$index].phone" style="width:91px; margin-left:-1px;" class="fl">
						<select style="width:63px;font-size:12px;float: left; margin-right:0; border-right:0;" >
							<option v-for="type in cardTypes" :value="type.id">{{type.name}}</option>
						</select>
						<input type="text" v-model="roomorder.guests[$index].idNum" style="margin-right:-1px;width:147px; margin-left:-1px;" class="fl">
					</div>
				</li>
				<li class="confirm over">
					<textarea v-model="roomorder.remark" style="width: 447px; height:50px " placeholder="备注说明"></textarea>
				</li>
			</ul>
		</div>
		<template slot="footer">
			<a class="btn btn-primary" href="javascript:;" @click="checkin">办理入住</a>
		</template>
	</modal>
</template>

<script>
import modal from '../common/modal'
import api from '../common/api'
import dateutil from '../common/dateutil'

var now=new Date();

export default {
	components:{
		modal
	},
	props:{
		show:{
			type:Boolean,
			default:false
		},
		roomId:0,
		orderId:0
	},
	data(){
		return {
			roomorder:{
				checkInDate:'',
				orderHeader:{
					orderItems:[],
					payInfo:{}
				},
				guests:[]
			},
			payMethods:[],									//支付方式
			cardTypes:require('../common/data/cardTypes'),						
			curPayList:[								//本次支付信息
				{
					"orderId": this.orderId,                              
					"payMethod":1,     
                    "type": 0,                                   //付款类型: 0 收款 1押金 2退房费
                    "amount": "",                                  //金额
                    "payPoint":1,                               //0 预定时、1 入住时、2 退房时
				},
				{
					"orderId": this.orderId, 
					"payMethod":1,                                      
                    "type": 1,                                   //付款类型: 0 收款 1押金 2退房费
                    "amount": "",                                  //金额
                    "payPoint":1,                               //0 预定时、1 入住时、2 退房时
				}
			]
		}
	},
	ready(){
		var $this=this;
		api.roomorder({
			orderId:this.orderId,
			roomId:this.roomId
		},function(r){
			$this.roomorder=r;
		});

		this.loadPayMethods();
	},
	filters:{
		showItemStatus(status){
			var result="";
			switch(status){
				case "0": result="已预定";break;
				case "1":result="已入住";break;
				case "2":result="已退房";break;
				default:result= "";
			}
			return result;
		}
	},
	computed:{
		canCheckIn(){
			var result=false;
			var _date=dateutil.parseDate(this.roomorder.checkInDate);
			if(_date!=null){
				var diff=(now-_date)/86400000;
				if(diff>=0&&diff<=1){
					result=true;
				}
			}
			return result;
		}
	},
	methods:{
		loadPayMethods(){                               //加载支付类型
	        var $this=this;
	        api.getPayMethods({},function(r){
	        	$this.payMethods=r;
	        });
	    },
		checkin(){
			var postData={
	        	orderHeader:{
	        		orderId:this.roomorder.orderId
	        	},
	        	payList:this.curPayList,
	        	guests:this.roomorder.guests
	      	};
	      	console.log(postData);
	      	this.show=false;
		}
	}
}
</script>