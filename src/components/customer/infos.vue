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
            <select class="fl mr10" v-model="hotelId">
              <option></option>
              <option v-for="hotel in hotels" :value="hotel.hotelId">{{hotel.hotelName}}</option>
            </select>
            <div tag="dateform" class="fl datepos mr10">
              <input type="text" value="02月18日-02月24日" class="datebox" style="width:121px;" id="daterange">
            </div>
            <input type="text" class="fl t14" value="" placeholder="姓名、手机号" setplaceholder="" style="width:150px;" v-model="keyword">
            <input type="button" value="查询" class="fl btn btn-primary dealbtn" style="width:50px;" @click="search">
          </div>
        </form>
        <div class="chart-type">
          <!-- 共有2个客人 -->
        </div>
      </div>
      <div><page :columns="columns" url="customers" :params="params"></page></div>
  </div>
</template>

<script>
import page from '../common/page'
import api from '../common/api'

export default {
  data () {
    return {
      hotels:[],
      keyword:'',
      hotelId:'',
      params:{},
      columns: [
        {title: '姓名',width: '80',name: 'name'},
        {title: '手机号',width: '120',name: 'phone'},
        {title: '所在地',width: '100',name: 'cityName'},
        {title: '入住次数',width: '100',name: 'orderCount'},
        {title: '消费总额',width: '100',name: 'totalPrice'},
        {title: '证件号码',width: '',name: 'idNum'},
        {title: '入住日期',width: '120',name: 'lastCheckInDate'},
        {title: '住几晚',width: '80',name: 'lastNights'}
      ]
    }
  },
  components: {
    page
  },
  ready () {
    var $this=this;
    api.getHotels({},function(r){
      $this.hotels=r;
    });
  },
  methods:{
    search:function(){
      this.params={
        hotelId:this.hotelId,
        keyword:this.keyword
      }
    }
  }
}
</script>