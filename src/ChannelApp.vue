<template>
	<div class="websiteWrapper">
		<div class="mainMenuOuterWrapper" v-show="showMainMenu" transition="fade">
			<ul class="mainMenuWrapper">
				<li><a href="javascript:;"  v-link="{ path: '/login' }" @click="showMainMenu=false">Login</a></li>
				<li class="currentPage"><a href="javascript:;" v-link="{ path: '/index' }" @click="showMainMenu=false">首页</a></li>
				<li><a href="javascript:;"  v-link="{ path: '/report' }" @click="showMainMenu=false">分销报表</a></li>
			</ul>
			<div class="mainMenuBottomDecoration"></div>
		</div>
		<div class="headerOuterWrapper">
			<div class="headerWrapper"> <a class="accountButton" href=""></a><a class="shoppingCartButton" href="">{{title}}</a><a class="mainMenuButton" href="javascript:;" @click="showMainMenu=!showMainMenu"></a></div>
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
	data (){
		return {
			showMainMenu:false
		}
	},
	transitions:{
		fade:{
		    css: false,
		    enter: function (el, done) {
		    // 元素已被插入 DOM
		    // 在动画结束后调用 done
		    	$(el).css('opacity', 0).animate({ opacity: 1 }, 500, done)
		    },
		    enterCancelled: function (el) {
		        $(el).stop()
		    },
		    leave: function (el, done) {
		    // 与 enter 相同
		        $(el).animate({ opacity: 0 }, 100, done)
		    },
		    leaveCancelled: function (el) {
		        $(el).stop()
		    }
		}
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