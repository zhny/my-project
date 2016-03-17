<template>
  <div class="main-content">
    <div style="display:none" class="breadcrumbs">
      <a>房态</a>
      &gt; 客房管理
    </div>
    <div class="page-cnt">
      <div class="page-header page-header-report clx">
        <div class="chart-type">
          <ul class="clx">
            <li><a href="javascript:;" class="newChannel">新建渠道</a></li>
            <li><a href="javascript:;" class="delChannel">删除渠道</a></li>
          </ul>
        </div>
        <form action="">
          <div style="" class="date-box clx" id="reportid">
            <select class="fl mr10" v-model="channelCode">
              <option></option>
              <option v-for="channel in channels" :value="channel.channelCode">{{channel.channelName}}</option>
            </select>
            <input type="button" value="查询" class="fl btn btn-primary dealbtn" style="width:50px;" @click="search">
          </div>
        </form>
      </div>
      <div><page :columns="columns" url="channels" :params="params" first-load="true"></page></div>
  </div>
</template>

<script>
import page from '../common/page'
import api from '../common/api'
import modal from '../common/modal'

export default {
  data () {
    return {
      channels:[],
      channelCode:'',
      params:{},
      columns: [
        {title: '分销渠道ID',width: '80',name: 'channelCode'},
        {title: '分销渠道名称',width: '120',name: 'channelName'},
        {title: '负责人',width: '100',name: ''},
        {title: '联系方式',width: '100',name: 'phone'},
        {title: '返点比例',width: '100',name: 'rebate'},
        {title: '备注',width: '',name: ''},
        {title: '编辑',width: '80',name: 'edi',}
      ]
    }
  },
  components: {
    page,modal
  },
  ready () {
    var $this=this;
    api.getChannels({},function(r){
      $this.channels=r;
    });
  },
  methods:{
    search:function(){
      this.params={channelCode:this.channelCode}
    },
  }
}
</script>