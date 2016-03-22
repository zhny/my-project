<template>
	<div class="pageContentWrapper">
		<div class="shopSearchFormWrapper">
			<a href="" class="mainLogo">
				<img src="../../assets/channel/images/eptonic.jpg" alt="">
			</a> 
			<div class="portfolioOneItemButtonsWrapper">
				<a class="portfolioOneExpandButton" href="../../assets/channel/images/eptonic.jpg"></a>
			</div>
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
					<span class="accordionButtonTitle">www.baidu.com</span>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import api from '../common/api'

export default{
	data () {
		return {
			info:{

			}	
		}
	},
	ready(){
		var $this=this;
		api.mychannel({},function(r){			//加载分销信息
			$this.info=r;
		});
	}
}
</script>