<template >
	<div class="paging tc" v-show="counts>0">
		<ul style="">
			<li>
				<a href="javascript:void(0);" @click="prev">«</a>
			</li>
			<li v-for="i in showPageNum" :class="{'active':iscur(i)}">
				<a href="javascript:void(0);" @click="choose(i)">{{i}}</a>
			</li>
			<li>
				<a href="javascript:void(0);" @click="next">»</a>
			</li>
		</ul>
	</div>
</template>

<script>
import api from '../common/api'

export default {
	props: {
		columns: Array,
	    params: Object,
	    url: String,
	    firstLoad:{
	      type:String,
	      default:"false"
	    },
	    curRows:{
	      type:Array,
	      default:function(){
	        return [];
	      }
	    },
	    rows:{
	      type:Array,
	      default:function(){
	        return [];
	      }
	    },
	    pageSize:{
	      type:Number,
	      default:10,
	    },
	    total:{
	      type:Number,
	      default:0
	    },
	    cur:{
	      type:Number,
	      default:1
	    },
	    counts:{
	      type:Number,
	      default:0
	    }
	},
	methods:{
		prev:function(){
			if(this.cur>1){
				this.cur--;
			}
		},
		next:function(){
			if(this.cur<this.total){
				this.cur++;
			}
		},
		choose:function(i){
			this.cur=i;
		},
		iscur:function(i){
			return this.cur===i;
		},
		renderData () {					//渲染到页面的数据
			var _start=(this.cur-1)*this.pageSize;
			var _end=this.cur*this.pageSize>this.counts?this.counts:(this.cur*this.pageSize);
			this.curRows=this.rows.slice(_start, _end);
		},
		loadData (){			//后台加载数据
			var $this=this;
			this.params.cur=this.cur;
			api[$this.url]($this.params,function(r){
				$this.rows=r.rows;
				$this.counts=r.rows.length;
				$this.total=Math.floor($this.counts/$this.pageSize)+($this.counts%$this.pageSize>0?1:0);
				$this.renderData();
			});
		}
	},
	ready () {
	    if(this.firstLoad=="true"){
	      this.loadData();
	    }
	},
	computed: {
		showPageNum: function () {
			var result=[];
			if(this.total<10||this.cur<6){
				for(var i =1;i<=(this.total>10?10:this.total);i++){
					result.push(i);
				}
			}else if(this.total>9&&this.cur<this.total-4){
				for(var i=this.cur-5;i<this.cur+5;i++){
					result.push(i);
				}
			}else{
				for(var i=this.total-9;i<=this.total;i++){
					result.push(i);
				}
			}
			return result;
		}
	},
	watch:{
		cur:function(){
			this.renderData();
		},
		params:function(){
			this.loadData();
		}
	}
}
</script>