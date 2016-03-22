<template>
<div class="pageContentWrapper">
	<div class="conre_switch">
		<div>
			开始时间：
			<mobile-date-pick :time.sync="query.orderCreateStart"></mobile-date-pick>
		</div>
		<div>
			截止时间：
			<mobile-date-pick :time.sync="query.orderCreateEnd"></mobile-date-pick>
		</div>
		<input type="submit" class="loginButton" value="查询" @click="search">
    </div>
	<div class="Notic_body cont_act" v-show="showTotal">
		<div class="list">
			<div class="list_one">
				<div style="float:left; display:block;" class="highlight">
					分销统计
				</div>
			</div>
			<div class="list_two1">
				<ul>
					<li>累计分销金额：<span class="highlight">{{result.orderStatistic.totalSaleAmount}}</span></li>
					<li>累计已返点金额：<span class="highlight">{{result.orderStatistic.totalHadRebateAmount}}</span></li>
					<li>累计未返点金额：<span class="highlight">{{result.orderStatistic.totalUnRebateAmount}}</span></li>         
				</ul>
			</div>
			<div><input type="submit" class="" value="点击查看明细" @click="showTheDetail"></div>
		</div>
	</div>
	<div class="Notic_body cont_act" v-show="showDetail">
		<div><input type="submit" class="" value="点击返回统计" @click="showTheTotal"></div>
		<div class="list" v-for="order in result.orders">
			<div class="list_one">
				<div style="float:left; display:block;" class="highlight">
					订单ID：<span class="highright">{{order.orderId}}</span>
				</div>
				<div style="float:right; display:block;">
					订单状态：<span class="highright" style="color:#FF0000">{{order.orderStatus}}</span>
				</div>
			</div>
			<div class="list_two">
				<ul>
					<li>客栈：<span class="highlight">{{order.hotelName}}</span></li>
					<li>订单金额：<span class="highlight">{{order.orderAmount}}</span></li>
					<li>返点比例：<span class="highlight">{{order.rebate*100}}%</span></li>
					<li>返点金额：<span class="highlight">{{order.rebateAmount}}</span></li>   
					<li>返点状态：<span class="highlight">{{order.rebateStatus}}</span></li>
					<li>返点时间：<span class="">{{order.rebateDate}}</span></li>        
				</ul>
			</div>
			<div class="list_two1">
				订单信息：{{order.orderDesc}}
			</div>
			<div class="list_three">
				<div style="float:right; display:block;">
					入住时间：<span class="highright">2016.1.23-2016.1.28</span>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import mobileDatePick from '../common/mobileDatePick'
import api from '../common/api'

export default{
	components:{
		mobileDatePick
	},
	data () {
		return {
			showTotal:false,
			showDetail:false,
			query:{
				orderCreateStart:'',
				orderCreateEnd:''
			},
			result:{
				orders:[],
				orderStatistic:{}
			}
		}
	},
	methods:{
		loadData(){
			var $this=this;
			api.myorders(this.query,function(r){
				$this.result=r;
			});
		},
		search(){
			this.loadData();
			this.showTotal=true;
			this.showDetail=false;
		},
		showTheDetail(){
			this.showTotal=false;
			this.showDetail=true;
		},
		showTheTotal(){
			this.showTotal=true;
			this.showDetail=false;
		}
	},
	ready () {
		
	}
}
</script>