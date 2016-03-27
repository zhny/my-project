<template>
	<div class="content">
		<div class="list-block">
			<ul>
				<!-- Text inputs -->
				<li>
					<div class="item-content">
						<div class="item-media"><i class="icon icon-form-name"></i></div>
						<div class="item-inner">
							<div class="item-title label">手机</div>
							<div class="item-input">
								<input type="text" placeholder="手机号" v-model="formData.phone">
							</div>
							<a class="button button-round" href="javascript:;" @click="getValicode">{{tipInfo}}</a>
						</div>
					</div>
				</li>
				<li>
					<div class="item-content">
						<div class="item-media"><i class="icon icon-form-name"></i></div>
						<div class="item-inner">
							<div class="item-title label">验证码</div>
							<div class="item-input">
								<input type="text" placeholder="验证码" v-model="formData.valicode">
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="item-content">
						<div class="item-media"><i class="icon icon-form-password"></i></div>
						<div class="item-inner">
							<div class="item-title label">密码</div>
							<div class="item-input">
								<input type="password" class="" placeholder="密码" v-model="formData.password">
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="content-block">
			<div class="content-block">
				<p><a class="button button-fill button-big" href="javascript:;" @click.stop="submit">确定 </a></p>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../common/api'

export default{
	data (){
		return {
			disabledGetValicode:false,
			tipInfo:'获取验证码',
			formData:{
				phone:'',
				valicode:'',
				password:''
			},
		}
	},
	methods:{
		getValicode (){
			if(this.disabledGetValicode)return;
			if(this.formData.phone&&/^(13|14|15|18|17)[0-9]\d{8}$/i.test(this.formData.phone)){
				var $this=this;
				$this.disabledGetValicode=true;
				api.getSmsVali({phone:this.formData.phone},function(r){
					var lastSeconds=90;
					var timer=setInterval(function(){
						if(--lastSeconds==0){
							window.clearInterval(timer);
							$this.disabledGetValicode=false;
							$this.tipInfo='获取验证码';
						}else{
							$this.tipInfo=lastSeconds+"秒后重新获取";
						}
					},1000);
				});
			}
		},
		submit(){
			if(this.formData.phone&&this.formData.phone&&this.formData.phone){
				var $this=this;
				api.resetpassword(this.formData,function(r){
					alert('密码修改成功');
					$this.$router.go({path:'/login'});
				});
			}
		}
	}
}
</script>