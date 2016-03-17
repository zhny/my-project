<template>
	<div id="main-container">
		<div class="main-content full">
			<!--客栈或分店信息-->
			<div class="page-cnt">
				<div class="page-header clx">
					<h1>操作日志</h1>
				</div>
				<div class="cntbox">
					<div class="pb10 t14 clx">
						<div class="date-box">
							<form method="get" action="">
								<select v-model="curHotel">
					                <option value="">请选择客栈</option>
					                <option v-for="hotel in hotels" :value="hotel.hotelId">{{hotel.hotelName}}</option>
					            </select>
								&nbsp;
								<select v-model="curUser">
									<option v-for="user in users" :value="user.id">{{user.account}}</option>
								</select>
								&nbsp;
								<datepick :value.sync="startDate"></datepick>                          
								 - 
								<datepick :value.sync="endDate"></datepick> 
								<input type="button" value="查询" class="btn btn-primary dealbtn" @click="search">
							</form>
						</div>
						共找到{{counts}}条操作日志
					</div>
					<page :columns="columns" :params="params" url="logs" :counts.sync="counts">
				</div>
			</div>
			<!--end客栈或分店信息-->                
		</div>
	</div>
</template>

<script>
import page from '../common/page'
import api from '../common/api'
import datepick from '../common/datepick'

export default {
	data () {
		return {
			hotels:[],
			curHotel:'',
			users:[],
			curUser:'',
			startDate:'',
			endDate:'',
			counts:0,
			params:{},
			columns: [
				{title: '操作时间',width: '120',name: 'createon'},
				{title: '操作员',width: '100',name: 'createby'},
				{title: '操作类型',width: '100',name: 'logType'},
				{title: '客户信息',width: '150',name: 'guestInfo'},
				{title: '相关订单及操作详情',name: 'logDetail'}
			]
		}
	},
	components :{
	    page,datepick
	},
	ready () {
	    var $this=this;
	    api.getHotels({},function(r){
	      $this.hotels=r;
	    });
	},
	watch :{
		curHotel () {
			var $this=this;
			api.users({hotelId:this.curHotel},function(r){
				$this.users=r.rows;
			});
		}
	},
	methods:{
		search(){
			this.params={
				hotelId:this.curHotel,
				userId:this.curUser
			}
		}
	}
}
</script>