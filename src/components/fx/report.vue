<template>
	<div class="content">
		<div class="content-block">
			<div class="list-block">
				<ul>
					<li>
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title label">开始时间</div>
								<div class="item-input">
									<mobile-date-pick :time.sync="query.orderCreateStart"></mobile-date-pick>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title label">截止时间</div>
								<div class="item-input">
									<mobile-date-pick :time.sync="query.orderCreateEnd"></mobile-date-pick>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<p><a class="button button-fill button-big" href="javascript:;" @click="search">查询 </a></p>
			</div>
		</div>

		<div class="content-block">
			<div class="buttons-row">
				<a href="javascript:;" class="tab-link button" :class="{'active':showTotal}" @click="showTotal=true">分销统计</a>
				<a href="javascript:;" class="tab-link button" :class="{'active':!showTotal}" @click="showTotal=false">分销明细</a>
			</div>
		</div>
		<div class="tabs">
			<div class="tab" :class="{'active':showTotal}">
				<div class="content-block">
					<div class="card">
						<div class="card-content">
							<div class="list-block">
								<ul>
									<li class="item-content">
										<div class="item-media"><i class="icon icon-f7"></i></div>
										<div class="item-inner">
											<div class="item-title">累计分销金额</div>
											<div class="item-after">{{result.orderStatistic.totalSaleAmount}}</div>
										</div>
									</li>
									<li class="item-content">
										<div class="item-media"><i class="icon icon-f7"></i></div>
										<div class="item-inner">
											<div class="item-title">累计返点金额</div>
											<div class="item-after">{{result.orderStatistic.totalHadRebateAmount}}</div>
										</div>
									</li>
									<li class="item-content">
										<div class="item-media"><i class="icon icon-f7"></i></div>
										<div class="item-inner">
											<div class="item-title">累计未返点金额</div>
											<div class="item-after">{{result.orderStatistic.totalUnRebateAmount}}</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab" :class="{'active':!showTotal}">
				<div class="content-block">
					<div class="card" v-for="order in result.orders">
						<div class="card-header">
							<div class="item-inner">
								<div class="item-title">订单ID:<span>{{order.orderId}}</span></div>
							</div>
							<div class="item-inner">
								<div class="item-title">订单状态:<span>{{order.orderStatus}}</span></div>
							</div>
						</div>
						<div class="card-content">
							<div class="list-block">
								<ul>
									<li class="item-content">
										<div class="item-media"><i class="icon icon-f7"></i></div>
										<div class="item-inner">
											<div class="item-title">客栈</div>
											<div class="item-after">{{order.hotelName}}</div>
										</div>
										<div class="item-inner">
											<div class="item-title">订单金额</div>
											<div class="item-after">{{order.orderAmount}}</div>
										</div>
									</li>
									<li class="item-content">
										<div class="item-media"><i class="icon icon-f7"></i></div>
										<div class="item-inner">
											<div class="item-title">返点比例</div>
											<div class="item-after">{{order.rebate*100}}%</div>
										</div>
										<div class="item-inner">
											<div class="item-title">返点金额</div>
											<div class="item-after">{{order.rebateAmount}}</div>
										</div>
									</li>
									<li class="item-content">
										<div class="item-media"><i class="icon icon-f7"></i></div>
										<div class="item-inner">
											<div class="item-title">返点状态</div>
											<div class="item-after">{{order.rebateStatus}}</div>
										</div>
									</li>
									<li class="item-content">
										<div class="item-media"><i class="icon icon-f7"></i></div>
										<div class="item-inner">
											<div class="item-title">返点时间</div>
											<div class="item-after">{{order.rebateDate}}</div>
										</div>
									</li>
									<li class="item-content">
										<div class="card-content">
											<div class="card-content-inner">订单信息：{{order.orderDesc}}</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="card-footer">
							<div class="card-content-inner">订单创建时间：{{order.orderCreateDate}}</div>
						</div>
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
			showTotal:true,
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
		}
	},
	ready () {
	}
}
</script>