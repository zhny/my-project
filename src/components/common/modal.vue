<template>
<div v-show="show" class="bootbox modal w500">
	<div class="modal-header"><a @click="show=false" class="close" href="javascript:;">×</a>
		<slot name="main-title"></slot>
		<h4 tag="title"><slot name="title"></slot></h4>
	</div>
	<div class="modal-body">
		<slot name="body"></slot>
	</div>
	<div class="modal-footer">
		<slot name="footer"></slot>
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