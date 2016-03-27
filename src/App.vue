<template>
  	<header class="inn-header">
	    <h2 class="title">翰林客栈{{pageTitle}}</h2>
	    <a v-link="{ path: '/home' }" class="back-link"><i class="icon-ar icon-b"></i></a>
	    <template v-if="haslogin">
	    	<a v-link="{ path: '/account' }" class="login-link"></a>	
	    </template>
	    <template v-else>
	    	<a v-link="{ path: '/login' }" class="login-link"></a>
	    </template>
	</header>
	<router-view transition-mode="out-in"></router-view>
	<footer class="inn-footer">
	  <p>© 2015 云掌柜 京ICP证130068号 京公网安备11010802010798号</p>
	</footer>
</template>

<script>
export default {
	data () {
		return {
			haslogin:false,
		}
	},
	methods: {
		isurl:require('./components/common/isurl')
	},
}
</script>