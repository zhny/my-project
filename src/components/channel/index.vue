<template>
	<div class="pageContentWrapper">
		<div class="shopSearchFormWrapper">
			<div id="qrcode" style="margin: 0 auto;width:128px;" @click="showLarge=true"></div>
		</div>
		<div class="accordionWrapper">
			<div class="accordionItemWrapper">
				<a class="currentAccordion" href="javascript:;">
					<span class="accordionButtonIcon">分销ID：</span>
					<span class="accordionButtonTitle">{{info.channelCode}}</span>
				</a>
			</div>
			<div class="accordionItemWrapper">
				<a class="currentAccordion" href="javascript:;">
					<span class="accordionButtonIcon">分销渠道名称：</span>
					<span class="accordionButtonTitle">{{info.channelName}}</span>
				</a>
			</div>
			<div class="accordionItemWrapper">
				<a class="currentAccordion" href="javascript:;">
					<span class="accordionButtonIcon">电话：</span>
					<span class="accordionButtonTitle">{{info.phone}}</span>
				</a>
			</div>
			<div class="accordionItemWrapper">
				<a class="currentAccordion" href="javascript:;">
					<span class="accordionButtonIcon">微信号：</span>
					<span class="accordionButtonTitle">{{info.wecharNo}}</span>
				</a>
			</div>
			<div class="accordionItemWrapper">
				<a class="currentAccordion" href="javascript:;">
					<span class="accordionButtonIcon">返点比例：</span>
					<span class="accordionButtonTitle">{{info.rebate*100+'%'}}</span>
				</a>
			</div>
			<div class="accordionItemWrapper">
				<a class=" currentAccordion" href="">
					<span class="accordionButtonIcon">链接：</span>
					<span class="accordionButtonTitle">{{info.rebateUrl}}</span>
				</a>
			</div>
		</div>
	</div>
	<div class="large-qrcode-bg" v-show="showLarge" @click="showLarge=false">
		<div class="large-qrcode" id="large_qrcode"></div>
	</div>
</template>

<style>
.large-qrcode-bg{
	background: rgba(255, 255, 255, 1) none repeat scroll 0% 0%;
	animation: 0.5s ease 0s normal none 1 running fadein;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 998;
}
.large-qrcode{
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    display: block;
    font-family: "Roboto";
    font-size: 16px;
    font-weight: 400;
    left: 50%;
    max-width: 100%;
    width:256px;
    /*overflow: hidden;*/
    /*position: fixed;*/
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
}
</style>

<script>
import api from '../common/api'
import '../common/jquery.qrcode'

export default{
	data () {
		return {
			showLarge:false,
			info:{

			}	
		}
	},
	ready(){
		var $this=this;
		api.mychannel({},function(r){			//加载分销信息
			$this.info=r;
			$('#qrcode').qrcode({width: 128,height: 128,text: $this.info.rebateUrl});
			$('#large_qrcode').qrcode({width: 256,height: 256,text: $this.info.rebateUrl});
		});
	}
}
</script>