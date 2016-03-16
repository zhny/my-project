<template>
  <div class="main-content">
    <!-- 全部订单 -->
    <div class="page-cnt">
      <form>
        <div class="page-header clx">
          <div style="float:left;" class="date-box clx">
            
            <select v-model="dateType">
              <option value="reserve" selected="selected">预订日期</option>
              <option value="checkin">入住日期</option>
              <option value="checkout">预订日期</option>
            </select>
            <datepick :value.sync="startDate"></datepick> - <datepick :value.sync="endDate"></datepick>

            <select v-model="curHotel">
              <option value="" selected="selected">所有客栈</option>
              <option v-for="hotel in hotels" :value="hotel.hotelId">{{hotel.hotelName}}</option>
            </select>

            <select v-model="curRoom">
                <option value="" selected="selected">所有房间</option>
                <option v-for="room in rooms" :value="room.roomId">{{room.roomName}}</option>
            </select>

            <select v-model="orderStatus">
              <option value="" selected="selected">订单状态</option>
              <option value="0">已预订</option>
              <option value="1">已入住</option>
              <option value="2">已删除</option>
            </select>

            <input type="button" style="padding:4px 20px;" value="查询"class="btn btn-primary" @click="seach">
            
          </div>
        </div>
      </form>
      <!-- 全部订单 -->
      <div class="mb20">
        <page :params="params" :columns="columns" url="orders"><page>
      </div>
    </div>
  </div>
</template>

<script>
import datepick from '../common/datepick'
import api from '../common/api'
import page from '../common/page'

export default {
  components:{
    datepick,page
  },
  data () {
    return {
      dateType:'',
      startDate:'',
      endDate:'',
      orderStatus:'',
      hotels:[],
      curHotel:'',
      curRoom:'',
      params:'',
      columns: [
        {title: '客人姓名',width: '80',name: 'guestName'},
        {title: '手机号',width: '120',name: 'phone'},
        {title: '订单来源',width: '90',name: 'channelName'},
        {title: '录入时间',width: '110',name: 'created'},
        {title: '入住/退房日期',width: '80',name: 'imgs'},
        {title: '房间号',width: '',name: 'facilities'},
        {title: '订单金额',width: '',name: 'facilities'},
        {title: '操作员',width: '',name: 'facilities'},
        {title: '管理',width: '150',name: 'ope',template:function(row){
          var html='<a class="mr10" @click="$parent.edit(\''+row.roomId+'\')" href="javascript:;">编辑</a>';
          html+='<a class="del-rm mr10" @click="$parent.del(\''+row.roomId+'\')" href="javascript:;">删除</a>';
          return html;
        }}
      ]

    }
  },
  ready () {
    var $this=this;
    api.getHotels({},function(r){
      $this.hotels=r;
    });
  },
  computed:{
    rooms () {
      var rooms=[];
      if(this.curHotel!=''){
        for(var i in this.hotels){
          if(this.curHotel==this.hotels[i].hotelId){
            var types=this.hotels[i].types;
            for(var t in types){
              rooms=rooms.concat(types[t].rooms);
            }
          }
        }
      }
      return rooms;
    }
  }
}
</script>