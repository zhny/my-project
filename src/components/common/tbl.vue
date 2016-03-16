<template>
  <table class="table table-striped table-bordered table-analytics">
    <tbody v-el:tbody>
      <tr>
        <th v-for="column in columns" width="{{ column.width }}">{{ column.title }}</th>
      </tr>
      <tr v-for="row in rows">
        <td v-for="column in columns" v-html="row | renderpage column"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import renderpage from './renderpage'
import api from './api'

export default {
  props: {
    columns: Array,
    params: Object,
    url: String
  },
  data () {
    return {
      rows: [],
      total:0,
      cur:1,
      temps:{}
    }
  },
  filters:{
    renderpage
  },
  methods:{
    // prev:function(){
    //   if(this.cur>1){
    //     this.cur--;
    //   }
    // },
    // next:function(){
    //   if(this.cur<this.total){
    //     this.cur++;
    //   }
    // },
    // choose:function(i){
    //   this.cur=i;
    // },
    // iscur:function(i){
    //   return this.cur===i;
    // },
    loadData:function(){
      var $this=this;
      this.params.cur=this.cur;
      api[$this.url]($this.params,function(r){
        $this.total=r.total;
        $this.rows=r.rows;
      });
    },
    compiletbody:function(){
      this.$compile(this.$els.tbody);
    }
  },
  compiled:function(){
    this.loadData();
    this.compiletbody();
  },
  // computed: {
  //   showPageNum: function () {
  //     var result=[];
  //     if(this.total<10||this.cur<6){
  //       for(var i =1;i<=(this.total>10?10:this.total);i++){
  //         result.push(i);
  //       }
  //     }else if(this.total>9&&this.cur<this.total-4){
  //       for(var i=this.cur-5;i<this.cur+5;i++){
  //         result.push(i);
  //       }
  //     }else{
  //       for(var i=this.total-9;i<=this.total;i++){
  //         result.push(i);
  //       }
  //     }
  //     return result;
  //   }
  // },
  watch:{
    cur:function(){
      this.loadData();
    },
    params:function(){
      this.loadData();
    },
    rows:function(){
      this.compiletbody();
    }
  }
}
</script>