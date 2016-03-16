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

            <input type="button" style="padding:4px 20px;" value="查询"class="btn btn-primary" @click="search">
            
          </div>
        </div>
      </form>
      <!-- 全部订单 -->
      <div class="mb20">
        <div class="mb10 clx"> <span>共找到 <strong class="bold t16 red">{{counts}}</strong> 个订单</div>
        <table style="width:100%;" class="table table-bordered table-analytics">
          <tbody>
            <tr>
              <th width="80">客人姓名</th>
              <th width="120">手机号</th>
              <th width="90">订单来源</th>
              <th width="110">录入时间</th>
              <th width="130">入住/退房日期</th>
              <th>房间号</th>
              <th width="90">订单金额</th>
              <th width="100">操作员</th>
              <th width="80">订单状态</th>
              <th width="100" class="tc">操作</th>
            </tr>
            <template v-for="row in curRows">
              <tr>
                <td rowspan="{{row.orderItems.length}}">{{row.guestName}}</td>
                <td rowspan="{{row.orderItems.length}}">{{row.phone}}</td>
                <td rowspan="{{row.orderItems.length}}">{{row.channelName}}</td>
                <td>02/19 12:48</td>
                <td>02/19 - 02/20</td>
                <td>秋波媚</td>
                <td>¥320</td>
                <td>掌柜</td>
                <td>已退房</td>
                <td class="tc"><a href="#">查看订单</a></td>
              </tr>
              <tr v-for="item in row.orderItems | limitBy row.orderItems.length-1 1">
                <td>02/19 12:48</td>
                <td>02/19 - 02/20</td>
                <td>调笑令</td>
                <td>¥320</td>
                <td>掌柜</td>
                <td>已退房</td>
                <td class="tc"><a href="javascript:;" @click="viewOrder(row)">查看订单</a></td>
              </tr>
            </template>
            
          </tbody>
        </table>
        <pagebar :cur-rows.sync="curRows" :params="params" url="orders" :counts.sync="counts"></pagebar>
      </div>
    </div>
  </div>
</template>

<script>
import datepick from '../common/datepick'
import api from '../common/api'
import pagebar from '../common/pagebar'

export default {
  components:{
    datepick,pagebar
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
      params:{},
      curRows:[],
      counts:0
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
  },
  methods:{
    search(){
      this.params={
        hotelId:this.curHotel,
        roomId:this.curRoom,
        dateType:this.dateType,
        startDate:this.startDate,
        endDate:this.endDate,
        orderStatus:this.orderStatus
      }
    }
  }
}
</script>