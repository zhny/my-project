<template>
	<div class="websiteWrapper">
		<div class="mainMenuOuterWrapper">
			<ul class="mainMenuWrapper">
				<li><a href="">Login</a></li>
				<li class="currentPage"><a href="">首页</a></li>
				<li><a href="">分销报表</a></li>
			</ul>
			<div class="mainMenuBottomDecoration"></div>
		</div>
		<div class="headerOuterWrapper">
			<div class="headerWrapper"> <a class="accountButton" href=""></a><a class="shoppingCartButton" href="">{{title}}</a><a class="mainMenuButton" href=""></a></div>
		</div>
		<router-view></router-view>
		<channel-footer></channel-footer>
	</div>
</template>

<script>
import channelFooter from './components/channel/footer'

export default {
	components:{
		channelFooter
	},
	computed:{
		title(){
			var path=this.$route.path;
			if(path.indexOf("/index")>=0){
				return "客栈股东";	
			}
			return "";
		}
	}
}
</script>