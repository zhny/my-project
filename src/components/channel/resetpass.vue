<template>
<div class="pageContentWrapper">
  <div class="recoverFormWrapper">
      <fieldset>
        <div class="formFieldWrapper">
          <label>手机:</label>
          <div>
          	<input style="float:left;width:40%" v-model="formData.phone" type="text" class="fieldWithIcon phoneFieldIcon" />
         	<input style="float:left;width:40%;" type="button" @click="getValicode" class="resetButton" :value="tipInfo" :disabled="disabledGetValicode"/>
      	  </div>
        </div>
        <div class="formFieldWrapper">
          <label>验证码:</label>
          <input type="text" v-model="formData.valicode" class="recoverUserNameField fieldWithIcon userFieldIcon">
        </div>
        <div class="formFieldWrapper">
          <label>新密码:</label>
          <input type="password" v-model="formData.password" class="recoverUserNameField fieldWithIcon">
        </div>
        <input type="submit" class="loginButton" value="确定" @click.stop="submit">
      </fieldset>
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
			}
			
		}
	},
	methods:{
		getValicode (){
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