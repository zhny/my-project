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
            <input type="text" class="fl t14 mr10" value="" placeholder="订单号" setplaceholder="" style="width:150px;" v-model="orderId">
            <input type="button" value="查询" class="fl btn btn-primary dealbtn" style="width:50px;" @click="search">
          </div>
        </form>
      </div>
      <div>
        <div class="table-header clx">
          <a id="exportwaterdetail" href="javascript:;" target="_blank" class="fr btn btn-primary btn-small">导出excel表格</a>
          <a href="javascript:;" class="fr btn btn-primary btn-small mr10" @click="rebate">批量返点</a>
          <h1>分销订单列表<span class="ml5 light">（2016-02-01 00:00 至 2016-02-22 23:59）</span></h1>
        </div>
        <table id="guestlist" class="table table-striped table-bordered table-analytics">
          <tbody>
            <tr>
              <th width="100">订单号</th>
              <th width="100">订单时间</th>
              <th width="120">订单客栈</th>
              <th>订单详情</th>
              <th width="60">订单状态</th>
              <th width="60">订单金额</th>
              <th width="60">所属分销</th>
              <th width="60">返点比例</th>
              <th width="60">返点金额</th>
              <th width="60">返点状态</th>
              <th width="100">返点时间</th>
              <th width="60">操作人</th>
            </tr>
            <tr v-for="row in distorders">
              <td>{{row.orderId}}</td>
              <td>{{row.orderCreateDate}}</td>
              <td>{{row.hotelId}}</td>  
              <td>{{row.orderDesc}}</td>
              <td>{{row.orderStatus==0?'未完成':'已完成'}}</td>
              <td>{{row.orderAmount}}</td>
              <td>{{row.channelName}}</td>
              <td>{{row.rebate}}</td>
              <td>{{row.rebateAmount}}</td>
              <td>{{row.rebateStatus==0?'未返点':'已返点'}}</td>
              <td>{{row.rebateDate}}</td>
              <td>{{row.userName}}</td>
            </tr>
          </tbody> 
        </table>
        <div style="text-align:right; padding:10px;"><span class="mr20">未返点金额：{{orderStatistic.totalUnRebateAmount}}</span><span>已返点金额：{{orderStatistic.totalHadRebateAmount}}</span></div>
      </div>
  </div>
  <modal :show.sync="showmodel">
    <template slot="title">批量返点</template>
    <div slot="body" class="cntbox tab-content cntbox-ota" style="position:static;">
      <p>你将为{{rebateNum}}个订单执行返点操作，确定返点？</p>
      <p style="text-align:center;"><button type="submit" class="confir-btn mr10" @click="rebateReq">确认</button><button type="cancel" class="confir-btn" @click="this.showmodel=false;">返回</button></p>               
    </div>
  </modal>
</template>

<script>
import page from '../common/page'
import api from '../common/api'
import modal from '../common/modal'

export default {
  data () {
    return {
      channels:[],
      orderId:'',
      channelCode:'',
      rebateStatus:'',
      orderStatistic:{},
      params:{},
      distorders:[],
      orderIds:'',
      rebateNum:0,
      showmodel:false,
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
    api.getDistorders({},function(r){
      $this.distorders=r;
    });
    api.getOrderStatistic([],function(r){
      $this.orderStatistic=r;
    });
  },
  methods:{
    search:function(){
      this.params={channelCode:this.channelCode,orderId:this.orderId,rebateStatus:this.rebateStatus}
    },
    rebate:function(){
      this.rebateNum = 0;
      this.orderIds = '';
      var len = this.distorders.length;
      for(var i=0; i<len; i++) {
        if(this.distorders[i].rebateStatus==0){
          this.orderIds += this.distorders[i].orderId +';';
          this.rebateNum++;
        }
      }
      this.showmodel=true;
    },
    rebateReq:function(){
      //发送一个GET请求,传回orderIds,更新distorders
      this.showmodel=false;
    }
  }
}
</script>