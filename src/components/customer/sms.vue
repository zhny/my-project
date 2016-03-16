<template>
	<div class="main-content ">
		<div class="page-cnt" style="padding-bottom:0;">
			<div class="tabbable">
				<ul class="nav-tabs">
					<li :class="{'active':auto}"><a href="javascript:;" @click="auto=true">自动短信服务</a></li>
					<li :class="{'active':!auto}"><a href="javascript:;" @click="auto = false">发送记录</a></li>
					<div class="clear"></div>
				</ul>
				<div class="nav-tabs-line"></div>
			</div>
		</div>
		<div class="page-cnt msg-cnt" v-show="auto">
			<div class="page-header">
				<p>启用后将在办理预订、入住、退房时自动为客人发送相应短信。</p>
				<p>短信模板需云掌柜人工审核，新模板审核通过前将发送上次生效的短信内容。</p>
				<p>短信中不可含促销、反动等信息，如“8折、代订、代购、求好评”等，短信模板需云掌柜人工审核。</p>
				<p>
					<select v-model="hotelId">
		              <option v-for="conf in confs" :value="conf.hotelId">{{conf.hotelName}}</option>
		            </select>
	        	</p>
			</div>
			<div id="tpllist" class="cntbox">
				<div class="notedemo autonote">
					<ul>
						<li tplcode="order">
							<h5 tag="name">订单提醒<i title="" class="ico-question"></i></h5>
							<p tag="content">{{curConf.reserveSms}}</p>
							<div class="link">
								<span class="fl">{{curConf.reserveStatus==1?'已启用':'已停用'}}</span>
								<a href="javascript:;" class="fr" @click="modifyTmpl(1)">设置</a>
							</div>
						</li>
						<li tplcode="checkin">
							<h5 tag="name">入住通知<i title="" class="ico-question"></i></h5>
							<p tag="content">{{curConf.checkInSms}}</p>
							<div class="link">
								<span class="fl">{{curConf.checkInStatus==1?'已启用':'已停用'}}</span>
								<a href="javascript:;" class="fr" @click="modifyTmpl(2)">设置</a>
							</div>
						</li>
						<li tplcode="checkout">
							<h5 tag="name">离店问候<i title="" class="ico-question" tag="info_checkout"></i></h5>
							<p tag="content">{{curConf.checkOutSms}}</p>
							<div class="link">
								<span class="fl">{{curConf.checkOutStatus==1?'已启用':'已停用'}}</span>
								<a href="javascript:;" class="fr" @click="modifyTmpl(3)">设置</a>
							</div>
						</li>
						<div class="clear"></div>
						<!-- 状态：未启用、未启用（审核中）、未启用（审核未通过）、已启用、已启用（审核中）、已启用（审核未通过），审核未通过color:#c00，已启用color:#093，其他状态无color -->
					</ul>
				</div>					
			</div>
		</div>
		<div class="page-cnt msg-cnt"  v-show="!auto">
			<div class="cntbox">
				<div class="page-header">
					<h1>短信发送记录</h1>
				</div>
				<!--发送记录-->
				<div class="pb10 t14">
					时间范围：
					<datepick :value.sync="startDate"></datepick> - <datepick :value.sync="endDate"></datepick>
					所属客栈:
					<select v-model="hotelId">
		              <option v-for="conf in confs" :value="conf.hotelId">{{conf.hotelName}}</option>
		            </select>
					<input type="button" value="查询" class="btn btn-info btn-small" @click="search">
				</div>
				<div class="borderbox">
					<page :columns="columns" url="smshistory" :params="params"></page>     
				</div>             
				<!--end of 发送记录-->
			</div>
		</div>
	</div>
	<modal :show.sync="showmodel">
		<template slot="title">{{modalContent.t}}</template>
		<form slot="body">
			<div>
				<ul class="cntlist">
					<li v-if="modalContent.showRes" style="" class="over">预订成功。【订单信息】张果老，豪华大床房，1间，2月14日入住，住3晚。</li>
					<li v-if="modalContent.showRes" style="" class="over tc"><span class="green">以上订单信息为自动生成，并与以下内容同时发送</span></li>

					<li class="over"><textarea placeholder="" setplaceholder="" style="width:415px; height:120px;" v-model="modalContent.c"></textarea></li>
					<li class="over tc">
						<a id="savemsg" href="javascript:;" class="btn btn-primary" @click="sureconf">确定</a>
						<a style="display: inline;" class="ml30" href="javascript:;" @click="changestatus()">{{modalContent.s==1?"停用":"启用"}}</a>
					</li>
				</ul>
			</div>
		</form>
	</modal>
</template>

<script>
import modal from '../common/modal'
import api from '../common/api'
import page from '../common/page'
import datepick from '../common/datepick'

export default{
	components:{
		modal,page,datepick
	},
	data () {
		return {
			confs:[],
			curConf:{},
			hotelId:'',
			auto:true,
			showmodel:false,
			modalTitle:'呵呵',
			modalContent:{
				t:'',
				showRes:false,
				c:'',
				s:0,
				v:''
			},
			startDate:'',
			endDate:'',
			params:{},
			columns: [
				{title: '姓名',width: '60',name: 'guestName'},
				{title: '手机号',width: '100',name: 'phone'},
				{title: '房间信息',width: '120',name: 'roomName'},
				{title: '发送内容',width: '',name: 'content'},
				{title: '发送时间',width: '160',name: 'sendTime'},
				{title: '发送状态',width: '70',name: 'status'},
				{title: '发送状态',width: '70',name: 'ope',template:function(row){
				  return row.status==1?'已发送':'待发送';
				}}
			],
		}
	},
	methods:{
		modifyTmpl(v){
			if(v==1){
				this.modalContent.t='修改预订提醒模板';
				this.modalContent.showRes=true;
				this.modalContent.c=this.curConf.reserveSms;
				this.modalContent.s=this.curConf.reserveStatus;
				this.modalContent.v=v;
			}else if(v==2){
				this.modalContent.t='修改入住通知模板';
				this.modalContent.showRes=false;
				this.modalContent.c=this.curConf.checkInSms;
				this.modalContent.s=this.curConf.checkInStatus;
				this.modalContent.v=v;
			}else if(v==3){
				this.modalContent.t='修改退房通知模板';
				this.modalContent.showRes=false;
				this.modalContent.c=this.curConf.checkOutSms;
				this.modalContent.s=this.curConf.checkOutSms;
				this.modalContent.v=v;
			}
			this.showmodel=true
		},
		changestatus(){
			this.modalContent.s=(this.modalContent.s==1?0:1);
		},
		sureconf(){
			var $this=this;
			if(this.modalContent.v==1){
				this.curConf.reserveSms=this.modalContent.c;
				this.curConf.reserveStatus=this.modalContent.s;
			}else if(this.modalContent.v==2){
				this.curConf.checkInSms=this.modalContent.c;
				this.curConf.checkInStatus=this.modalContent.s;
			}else if(this.modalContent.v==3){
				this.curConf.checkOutSms=this.modalContent.c;
				this.curConf.checkOutSms=this.modalContent.s;
			}
			api.autosmsconfs_post(this.curConf,function(r){				//提交配置
				$this.showmodel=false;
			});
		},
		search(){
			this.params={
				hotelId:this.hotelId,
				startDate:this.startDate,
				endDate:this.endDate
			}
		}
	},
	ready () {
		var $this=this;
		api.autosmsconfs({},function(r){
			$this.confs=r.smsConfs;
			if($this.confs.length>0){
				$this.hotelId=$this.confs[0].hotelId;
			}
		});	
	},
	watch:{
		hotelId (){
			for(var i in this.confs){
				if(this.hotelId==this.confs[i].hotelId){
					this.curConf=this.confs[i];
					break;
				}
			}
		}
	}
}
</script>