module.exports=function(url){
	return this.$route.path.indexOf(url)>=0;
}