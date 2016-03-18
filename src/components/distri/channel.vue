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
      <div>
        <table class="table table-striped table-bordered table-analytics">
          <tbody>
            <tr>
              <th width="80"><input type="checkbox"></th>
              <th width="120">分销渠道ID</th>
              <th width="160">分销渠道名称</th>
              <th width="120">负责人</th>
              <th width="120">联系方式</th>
              <th width="120">返点比例</th>
              <th>备注</th>
              <th width="120">编辑</th>
            </tr>
          </tbody>
          <template v-for="row in distorders">
            <tr>
              <td><input type="checkbox"></td>
              <td>{{row.channelCode}}</td>
              <td>{{row.channelName}}</td>  
              <td>{{row.orderDesc}}</td>
              <td>{{row.orderStatus==0?'未完成':'已完成'}}</td>
              <td>{{row.orderAmount}}</td>
              <td>{{row.channelName}}</td>
              <td>{{row.rebate}}</td>
            </tr>
          </template>
        </table>
      </div>
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
        // {title: '编辑',width: '80',name: 'edi',}
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