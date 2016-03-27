<template>
	<div class="page page-current"> 
		<header class="bar bar-nav"> 
			<!-- <a class="button button-link button-nav pull-left" href="#">
				<span class="icon icon-left"></span> 返回 
			</a> -->
	    	<h1 class="title">{{title}}</h1>
	    </header>
	    <nav class="bar bar-tab"> 
			<a class="tab-item external" v-link="{ path: '/index', activeClass: 'active' }" href="javascript:;"> 
				<span class="icon icon-home"></span> 
				<span class="tab-label">我的</span> 
			</a> 
			<a class="tab-item external" v-link="{ path: '/report', activeClass: 'active' }" href="javascript:;"> 
				<span class="icon icon-star"></span>
				<span class="tab-label">分销</span> 
			</a> 
			<a class="tab-item external" v-link="{ path: '/login', activeClass: 'active' }" href="javascript:;"> 
				<span class="icon icon-settings"></span> 
				<span class="tab-label">切换账号</span> 
			</a> 
		</nav>
		<router-view keep-alive></router-view>
	</div>
</template>

<script>

export default {
	components:{
		
	},
	methods: {
    	
  	},
	data (){
		return {
			showMainMenu:false
		}
	},computed:{
		title(){
			var path=this.$route.path;
			if(path.indexOf("/index")>=0){
				return "客栈股东";	
			}else if(path.indexOf("/resetpass")>=0){
				return "忘记密码";
			}else if(path.indexOf("/login")>=0){
				return "登录";
			}else if(path.indexOf("/report")>=0){
				return "分销报表";
			}
			return "";
		}
	}
}
</script>