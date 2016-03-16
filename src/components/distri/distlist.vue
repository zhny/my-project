<template>
  <div class="main-content">
    <div style="display:none" class="breadcrumbs">
      <a>房态</a>
      &gt; 客房管理
    </div>
    <div class="page-cnt">
      <div class="page-header page-header-report clx">
        <form action="">
          <div style="" class="date-box clx" id="reportid">
            <select class="fl mr10" v-model="channelCode">
              <option></option>
              <option v-for="channel in channels" :value="channel.channelCode">{{channel.channelName}}</option>
            </select>
            <select class="fl mr10" v-model="rebateStatus">
              <option value="0">未返点</option>
              <option value="1">已返点</option>
            </select>
            <div tag="dateform" class="fl datepos mr10">
              <input type="text" value="02月18日-02月24日" class="datebox" style="width:121px;" id="daterange">
            </div>
            <input type="text" class="fl t14" value="" placeholder="订单号" setplaceholder="" style="width:150px;" v-model="orderId">
            <input type="button" value="查询" class="fl btn btn-primary dealbtn" style="width:50px;" @click="search">
          </div>
        </form>
      </div>
      <div>
        <div class="table-header clx">
          <a id="exportwaterdetail" href="javascript:;" target="_blank" class="fr btn btn-primary btn-small">导出excel表格</a>
          <a href="javascript:;" class="fr btn btn-primary btn-small mr10" >批量返点</a>
          <h1>分销订单列表<span class="ml5 light">（2016-02-01 00:00 至 2016-02-22 23:59）</span></h1>
        </div>
        <tbl :columns="columns" url="orders" :params="params"></tbl>
        <div style="text-align:right; padding:10px;"><span class="mr20">未返点金额：{{rebateAmount}}</span><span>已返点金额：{{hasRebateAmount}}</span></div>
      </div>
  </div>
</template>

<script>
import tbl from '../common/tbl'
import api from '../common/api'
import modal from '../common/modal'

export default {
  data () {
    return {
      channels:[],
      orderId:'',
      channelCode:'',
      rebateStatus:'',
      params:{},
      columns: [
        {title: '订单号',width: '100',name: 'orderId'},
        {title: '订单时间',width: '100',name: 'orderCreateDate'},
        {title: '订单客栈',width: '120',name: 'hotelName'},
        {title: '订单详情',width: '',name: 'orderDesc'},
        // {title: '订单房型',width: '100',name: ' '},
        // {title: '入住时间',width: '120',name: ' '},
        // {title: '退房时间',width: '120',name: ' '},
        // {title: '入住天数',width: '60',name: ' '},
        // {title: '房间状态',width: '60',name: ' '},
        {title: '订单状态',width: '60',name: 'orderStatus',template:function(row){
          var html;
          if(row.orderStatus==0) {
            html = '未完成';
          } else if(row.orderStatus==1) {
            html = '已完成';
          }
          return html;
        }},
        {title: '订单金额',width: '60',name: 'orderAmount'},
        {title: '所属分销',width: '60',name: 'channelName'},
        {title: '返点比例',width: '60',name: 'rebate'},
        {title: '返点金额',width: '60',name: 'rebateAmount'},
        {title: '返点操作',width: '60',name: 'rebateStatus',template:function(row){
          var html;
          if(row.rebateStatus==0) {
            html = '未返点';
          } else if(row.rebateStatus==1) {
            html = '已返点';
          }
          return html;
        }},
        {title: '返点时间',width: '100',name: 'rebateDate'},
        {title: '操作人',width: '60',name: 'userName'}
      ]
    }
  },
  components: {
    tbl,modal
  },
  ready () {
    var $this=this;
    api.getChannels({},function(r){
      $this.channels=r;
    });
  },
  methods:{
    search:function(){
      this.params.channelCode=this.channelCode;
      this.params.orderId=this.orderId;
      this.params.rebateStatus=this.rebateStatus;
    }
  }
}
</script>