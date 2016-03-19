<!-- 订单详情 -->
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
				<li class="confirm over">
					<span class="cprice">￥{{roomorder.roomTotalPrice}}<b>已收款 ¥{{roomorder.payedMoney}}<i class="ico-info"></i></b></span>
					<h2>
						<span class="ico-roomname16"></span>{{roomorder.roomName}}({{roomorder.typeName}})
					</h2>
					<p>
						<span class="ico-date16"></span>
						{{roomorder.checkInDate}}入住
						<span style="color:blue">[{{roomorder.orderItemStatus|showItemStatus}}]</span>
					</p>
					<p><span class="ico-night16"></span>{{roomorder.checkoutDate}}退房，住{{roomorder.nights}}晚</p>
				</li>
				<li class="confirm over" id="c_needcar"></li>
				<li class="confirm over" id="c_remark">
					<p class="pl20">
						<span class="ico-related16 minus20"></span>
						相关订单:
						<template v-for="item in roomorder.orderHeader.orderItems">
							<br>{{item.roomName}}, {{item.checkInDate}}入住, {{item.nights}}晚, ¥{{item.roomTotalPrice}}<span style="color:#B5B5B5">[{{item.orderItemStatus|showItemStatus}}{{item.checkoutDate}}] </span>
						</template>
						<br>订单总额¥{{roomorder.orderHeader.payInfo.needPayMoney}}，{{roomorder.orderHeader.orderItems.length}}间房</p></li>
				<li class="confirm over" id="c_remark2">
					<p class="pl20">
						<span class="ico-remark16 minus20"></span>
						备注：{{roomorder.remark}}
					</p>
				</li>
			</ul>
		</div>
		<template slot="footer">
			<a class="mt10 fl btn btn-small" text="删除订单" style="display: block;">删除订单</a>
			<a class="mt10 fl btn btn-info btn-small" style="display: block;">修改订单</a>
			<a class="btn btn-primary" v-if="canCheckIn" href="javascript:;" @click="checkin()">办理入住</a>
			<a class="btn btn-danger" href="javascript:;" @click="checkout()">办理退房</a>
			<span tag="hasdelete" class="fr mt15 red" style="display: none;">已删除</span>
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
					payInfo:{

					}
				}
			}
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
		checkin(){
			this.$parent.showCheckIn=true;
			this.show=false;
		},
		checkout(){
			this.$parent.showCheckOut=true;
			this.show=false;
		}
	}
}
</script>