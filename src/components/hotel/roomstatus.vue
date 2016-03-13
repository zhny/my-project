<template>
<div class="main-boxer">
	<div class="nav_bg">

	    <div id="page" class="date-tools" >
	        <div class="prev" @click="prev10"></div>
	        <div class="range">
	        	<p id="datedesc">{{startDateShort}}~{{endDateShort}}</p>
	        	<b>{{year}}</b> </div>
	      	<div class="next" @click="next10"></div>
    	</div>

    	<div id="roomtype" class="roomnum" style="overflow-y: scroll;">
          <table id="roomlist" isfold="1" style="width: 100%;">
            <tbody>
              <tr i="0" time="2016-02-15">
                <td  style="width:10%" v-for="t in dateTags" :class="{'on':isToday(t)}"><b>{{t | dateTagfilter }}</b></td>   <!-- 选中后加selected-->
              </tr>
            </tbody>
          </table>
        </div>

	</div>

	<div id="leftpanel">
    	<div id="innroomdate" class="roomdom ">
            <div class="leftbox">
            	<div id="pickerdate" class="dateitem" style="overflow-x: hidden;">
                	<table cellpadding="0" cellspacing="0" border="0" t="pickerheader" style="width:100%;">
                		<tbody>
                      <template v-for="type in curHotel.types">
                			<tr>
              						<th rowspan="{{type.rooms.length}}" scope="row" style="border:1px solid #ccc; border-top:none; border-left:none;width:50%;">
                            <div class="count" title="{{type.typeName}}">{{type.typeName}}</div>
                          </th>
              						<td><div class="num" style="width:50%;text-align:center;"><span>{{type.rooms[0].roomName}}</span> </div></td>
           						</tr>
           						<tr v-for="room in type.rooms | limitBy type.rooms.length-1 1">
              						<td><div class="num" style="width:50%;text-align:center;"><span>{{room.roomName}}</span> </div></td>
            					</tr>
                    </template>
                		</tbody>
                	</table>
                </div>
            </div>
            <div class="rightbox">
              <div id="pickerarea" class="datepicker" style="overflow-x: hidden;">
                <table cellpadding="0" cellspacing="0" border="0" t="content">
                  <tr v-for="(rk,row) in roomStatus">
                    <td v-for="(ck,col) in row" :class="{'td-selected':selectedCell[rk][ck]}" @click="toggleCell(rk,ck,col)" >
                      <div v-if="col.order" class="date-have ui-sortable"  style="width:10%;">
                        <div class="date-day-checkedout ogray" style="height: 40px;">
                          <p class="">{{col.order.guestName}}</p>
                          <p class="t12 light">{{col.order.channelName}}</p>
                          <div class="demand"><span class="nopay"></span></div>
                          <div class="demand_top"><span class="ico-checkout"></span></div>
                        </div>
                      </div>
                      <div v-else class="date-day ui-sortable" style="width: 109px;">
                        <a v-if="curCell==(rk+'_'+ck)" class="day-selected" @click.stop="toReserveRooms" href="javascript:;"></a>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
        </div>
    </div>
</div>
<div id="footer" class="foot">
    <div class="inntab clx"> 
      <div class="wrap">
        <ul style="margin-left:0;" class="clx">
          <li v-for="hotel in hotels" :class="{'on':(curHotel.hotelId==hotel.hotelId)}" @click="changeHotel(hotel)">
            <a href="javascript:;">{{hotel.hotelName}}</a>
          </li>
        </ul>
      </div>
    </div>
</div>


</template>
<script>
import dateutil from '../common/dateutil'
import orderform from './orderform'
import api from '../common/api'

var theNow=new Date();
export default {
  components:{
    orderform
  },
  data () {
    return {
      hotels:[],
      curHotel:{},
      roomStatus:[],
      now:theNow,
      startDate:new Date(theNow.getFullYear(),theNow.getMonth(),theNow.getDate()-2),
      endDate:new Date(theNow.getFullYear(),theNow.getMonth(),theNow.getDate()+7),
      selectedCell:{},
      curCell:'',
      selectedCellStack:[]
    }
  },
  ready () {
    this.renderHotels();
  },
  computed:{
    year:function(){
      return this.endDate.getFullYear()
    },
    startDateShort:function(){
      return dateutil.format(this.startDate,'MM/dd');
    },
    endDateShort:function(){
      return dateutil.format(this.endDate,'MM/dd');
    },
    dateTags:function(){
      var result=[];
      var sd=new Date(this.startDate);
      var ed=new Date(this.endDate);
      for(var i=0;i<10;i++){
        if(i>0)sd.setDate(sd.getDate()+1);
        result.push(new Date(sd));
      }
      return result;
    }
  },
  methods:{
    isToday:function isToday(d){
      return dateutil.format(this.now,'yyyy-MM-dd')==dateutil.format(d,'yyyy-MM-dd');
    },
    prev10:function(){
      this.startDate=new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()-10);
      this.endDate=new Date(this.endDate.getFullYear(),this.endDate.getMonth(),this.endDate.getDate()-10);
    },
    next10:function(){
      this.startDate=new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()+10);
      this.endDate=new Date(this.endDate.getFullYear(),this.endDate.getMonth(),this.endDate.getDate()+10);
    },
    changeHotel:function(hotel){
      this.curHotel=hotel;
    },
    toggleCell:function(rk,ck,col){            //点击选中或不选中某格
      if(col.order==undefined){
        var temp= Object.assign({}, this.selectedCell, {});
        temp[rk][ck]=!(this.selectedCell[rk][ck]);
        this.selectedCell= temp;
        var key=rk+"_"+ck;
        if(temp[rk][ck]){
          this.curCell=key;
          this.selectedCellStack.push(key);
        }else{
          var tempi="";
          for(var i in this.selectedCellStack){
            if(this.selectedCellStack[i]==key){
              tempi=i;
              break;
            }
          }
          this.selectedCellStack.splice(tempi,1);
          this.curCell=this.selectedCellStack[this.selectedCellStack.length-1];
        }
      } 
    },
    toReserveRooms:function(){                      //到订房操作页
      
    },
    renderHotels () {
      var $this=this;
      api.getHotels({},function(r){
        $this.hotels=r;
        if(r.length>0){
          r[0].isCur=true;
          $this.curHotel=r[0];
        }
      });
    },

    renderRooms (){
      var $this=this;                               
      if(this.curHotel.hotelId){                          //渲染空表格
        var types=this.curHotel.types;
        var emptyRoomStatus={};
        for(var _t in types){
          var t=types[_t];
          for(var _r in t.rooms){
            var r=t.rooms[_r];
            var rk=r.roomId;
            emptyRoomStatus[rk]={};
            this.selectedCell[rk]={};
            for(var i=0;i<10;i++){
              var d=new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()+i);
              var fd=dateutil.format(d,'yyyy-MM-dd');
              r.sel=false;
              r.d=d;
              emptyRoomStatus[rk][fd]={};
              emptyRoomStatus[rk][fd]['room']=r;

              this.selectedCell[rk][fd]=false;
            }
          }
        }

        api.roomstatus({
            hotelId:$this.curHotel.hotelId,
            fromDate:dateutil.format($this.startDate,'yyyy-MM-dd'),
            endDate:dateutil.format($this.endDate,'yyyy-MM-dd')
          },function(r){
            var orders=r.roomStatus;
            for(var i in orders){
              var order=orders[i];
              emptyRoomStatus[order.roomId][order.checkInDate]['order']=order;
            }
            $this.roomStatus=emptyRoomStatus;
        });
      }
    }
  },
  filters:{
    dateTagfilter(d){
      return dateutil.format(d,'M/dd E');
    }
  },
  watch:{
    curHotel () {
      this.renderRooms();
    },
    startDate () {
      this.renderRooms();
    },
    endDate () {
      this.renderRooms();
    }
  }
}
</script>