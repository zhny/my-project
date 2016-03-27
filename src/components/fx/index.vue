<template>
	<div class="content">
		<div class="content-block-title open-large">
			<div id="qrcode" style="margin: 0 auto;width:128px;" @click="showLarge=true"></div>
		</div>
		<div class="list-block">
			<ul>
				<li class="item-content">
					<div class="item-media"><i class="icon icon-f7"></i></div>
					<div class="item-inner">
						<div class="item-title">分销ID</div>
						<div class="item-after">{{info.channelCode}}</div>
					</div>
				</li>
				<li class="item-content">
					<div class="item-media"><i class="icon icon-f7"></i></div>
					<div class="item-inner">
						<div class="item-title">分销渠道名称</div>
						<div class="item-after">{{info.channelName}}</div>
					</div>
				</li>
				<li class="item-content">
					<div class="item-media"><i class="icon icon-f7"></i></div>
					<div class="item-inner">
						<div class="item-title">电话</div>
						<div class="item-after">{{info.phone}}</div>
					</div>
				</li>
				<li class="item-content">
					<div class="item-media"><i class="icon icon-f7"></i></div>
					<div class="item-inner">
						<div class="item-title">微信号</div>
						<div class="item-after">{{info.wecharNo}}</div>
					</div>
				</li>
				<li class="item-content">
					<div class="item-media"><i class="icon icon-f7"></i></div>
					<div class="item-inner">
						<div class="item-title">返点比例</div>
						<div class="item-after">{{info.rebate*100+'%'}}</div>
					</div>
				</li>
				<li class="item-content">
					<div class="item-media"><i class="icon icon-f7"></i></div>
					<div class="item-inner">
						<div class="item-title">链接</div>
						<div class="item-after">{{info.rebateUrl}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="popup popup-large" style="display: block;" :class="{'modal-in':showLarge,'modal-out':!showLarge}" @click="showLarge=false">
		<div class="content-block">
			<div id="large_qrcode" style="margin: 0 auto;width:256px;margin-top:50%"></div>
		</div>
	</div>
</template>

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