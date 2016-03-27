<template>
	<div class="content">
		<div class="list-block">
			<ul>
				<li>
					<div class="item-content">
						<div class="item-media"><i class="icon icon-form-name"></i></div>
						<div class="item-inner">
							<div class="item-title label">用户名</div>
							<div class="item-input">
								<input type="text" placeholder="用户名" v-model="user.username">
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
								<input type="password" placeholder="密码" class="" v-model="user.password">
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="card-content">
			<div class="card-content-inner" style="text-align:center;"><a href="javascript:;" v-link="{path:'/resetpass'}">忘记密码？</a></div>
		</div>
		<div class="content-block">
			<div class="content-block">
				<p><a href="javascript:;" @click.stop="submit" class="button button-fill button-big">登录 </a></p>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import api from '../common/api'

export default{
  data(){
    return {
      user:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    submit(){
      if(this.user.username&&this.user.password){
        var $this=this;
        api.login(this.user,function(r){
          $this.$router.go({ path: '/' });
        });
      }
    }
  }
}
</script>

