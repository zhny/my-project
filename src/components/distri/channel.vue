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
            <li><a href="javascript:;" class="newChannel" @click="addChan">新建渠道</a></li>
            <li><a href="javascript:;" class="delChannel" @click="delChan">删除渠道</a></li>
          </ul>
        </div>
        <!-- <form action="">
          <div style="" class="date-box clx" id="reportid">
            <select class="fl mr10" v-model="channelCode">
              <option></option>
              <option v-for="channel in channels" :value="channel.channelCode">{{channel.channelName}}</option>
            </select>
            <input type="button" value="查询" class="fl btn btn-primary dealbtn" style="width:50px;" @click="search">
          </div>
        </form> -->
      </div>
      <div>
        <table class="table table-striped table-bordered table-analytics">
          <tbody>
            <tr>
              <th width="60"><input type="checkbox"></th>
              <th width="120">分销渠道ID</th>
              <th width="160">分销渠道名称</th>
              <th width="120">负责人</th>
              <th width="120">联系方式</th>
              <th width="120">返点比例</th>
              <th>备注</th>
              <th width="120">编辑</th>
            </tr>
            <tr v-for="row in channels">
              <td><input type="checkbox"></td>
              <td>{{row.channelCode}}</td>
              <td>{{row.channelName}}</td>  
              <td>小李子</td>
              <td>{{row.phone}}</td>
              <td>{{row.rebate}}</td>
              <td></td>
              <td><a class="mr10" @click="editChan(row.id)" href="javascript:;">编辑</a></td>
            </tr>
          </tbody>  
        </table>
      </div>
  </div>
  <modal :show.sync="showmodel">
    <template slot="title">{{curChan.id?'编辑分销渠道':'新建分销渠道'}}</template>
    <div slot="body" class="cntbox tab-content cntbox-ota" style="position:static;">
        <div class="divider">
            <ul class="inninfo mb10">
                <li>
                     <tt class="lab tr" style="width:120px;"><strong class="red">*</strong>分销渠道代码：</tt>
                     <input type="text" name="" value="{{curChan.channelCode}}" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr" style="width:120px;"><strong class="red">*</strong>分销渠道名称：</tt>
                     <input type="text" name="" value="{{curChan.channelName}}" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr" style="width:120px;"><strong class="red">*</strong>渠道负责人：</tt>
                     <input type="text" name="" value="" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr" style="width:120px;"><strong class="red">*</strong>联系方式：</tt>
                     <input type="text" name="" value="{{curChan.phone}}" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr" style="width:120px;"><strong class="red">*</strong>微信号：</tt>
                     <input type="text" name="" value="" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr" style="width:120px;"><strong class="red">*</strong>返点比例：</tt>
                     <input type="text" name="" value="{{curChan.rebate}}" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr" style="width:120px;">备注：</tt>
                     <input type="text" name="" value="" style="width:320px;">
                </li>
                <li>
                  <tt class="lab tr" style="width:120px;">&nbsp;</tt>
                  <a class="btn btn-primary btn-small" href="javascript:;" @click="submitChan">确认新增渠道</a>
                </li>
            </ul>
        </div>                
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
      channelCode:'',
      params:{},
      showmodel:false,
      curChan:{}
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
    addChan(){
      this.curChan={},
      this.showmodel=true;
    },
    editChan(id){
      this.curChan = this.channels[--id];
      this.showmodel=true;
    },
    delChan() {
      if(confirm('确定删除所选的渠道?')){
        api.delChan({userId:this.userId},function(r){
          console.log("del:"+ids);
        });
      }
    },
    submitChan(){
      api.submitChan(this.curChan,function(r){
        this.showmodel=false;
      });
    }
  }
}
</script>