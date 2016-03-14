<template>
<div v-show="show" class="bootbox modal view">
	<div class="modal-header"><a @click="show=false" class="close" href="javascript:;">×</a>
		<h4 tag="title"><slot name="title"></slot></h4>
	</div>
	<div class="modal-body">
		<slot name="body"></slot>
	</div>
</div>
</template>

<script>
export default {
	props:{
		show:{
			type:Boolean,
			require:true,
			twoWay:true
		}
	}
}
</script>