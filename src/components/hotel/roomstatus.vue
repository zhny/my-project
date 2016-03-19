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

    	<div id="roomtype" class="roomnum">
          <table id="roomlist" isfold="1" style="width: 100%;">
            <tbody>
              <tr i="0">
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
                      <div v-if="col.order" @click="showDetailModal(col.order.orderId,col.order.roomId)" class="date-have ui-sortable"  :style="{width:(100*col.order.nights)+'%'}">
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

<reserve-rooms v-if="showReserve" :show.sync="showReserve" :cur-order="curOrder" :cur-rooms="curRooms"></reserve-rooms>
<order-detail v-if="showDetail" :show.sync="showDetail" :order-id="orderId" :room-id="roomId"></order-detail>
<check-in-rooms v-if="showCheckIn" :show.sync="showCheckIn" :order-id="orderId" :room-id="roomId"></check-in-rooms>
<check-Out-rooms v-if="showCheckOut" :show.sync="showCheckOut" :order-id="orderId" :room-id="roomId"></check-Out-rooms>

</template>
<script>
import dateutil from '../common/dateutil'
import api from '../common/api'
import reserveRooms from './reserveRooms'             //加载订房
import orderDetail from './orderDetail'               //订单详情
import checkInRooms from './checkInRooms'             //入住
import checkOutRooms from './checkOutRooms'           //退房

var theNow=new Date();
export default {
  components:{
    reserveRooms,orderDetail,checkInRooms,checkOutRooms
  },
  data () {
    return {              
      hotels:[],                                        //所有客栈、房型
      curRooms:{},                                      //当前客栈的所有房间
      curHotel:{},                                      //当前选中的客栈
      roomStatus:[],                                    //渲染页面的表格数据
      now:theNow,                                       //今天
      startDate:new Date(theNow.getFullYear(),theNow.getMonth(),theNow.getDate()-2),      //日历时间起
      endDate:new Date(theNow.getFullYear(),theNow.getMonth(),theNow.getDate()+7),        //日历时间止
      selectedCell:{},                                  //用于标记cell的选中状态true或者false
      curCell:'',                                       //当前最后一个选中的cell
      selectedCellStack:[],                             //选中的cell 栈
      curOrder:{                                        //当前订单
        guestName:"",
        phone:"",
        items:[]
      },
      showReserve:false,                                //显示预定
      showDetail:false,
      showCheckIn:false,
      showCheckOut:false,
      orderId:0,
      roomId:0                        
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
    isToday (d){
      return dateutil.format(this.now,'yyyy-MM-dd')==dateutil.format(d,'yyyy-MM-dd');
    },
    prev10 (){
      this.startDate=new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()-10);
      this.endDate=new Date(this.endDate.getFullYear(),this.endDate.getMonth(),this.endDate.getDate()-10);
    },
    next10 (){
      this.startDate=new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()+10);
      this.endDate=new Date(this.endDate.getFullYear(),this.endDate.getMonth(),this.endDate.getDate()+10);
    },
    changeHotel(hotel){
      this.curHotel=hotel;
    },
    toggleCell(rk,ck,col){            //点击选中或不选中某格
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
    toReserveRooms (){                      //到订房操作页
      var items={};
      var resultItems=[];
      for(var i in this.selectedCellStack){
        var cellKey=this.selectedCellStack[i].split("_");
        if(items[cellKey[0]]==undefined){
          items[cellKey[0]]=[];
        }
        items[cellKey[0]].push(cellKey[1]);
      }

      for(var i in items){
        var lastRecord=Object.assign({}, this.curRooms[i], {
            checkInDate:items[i][0],
            nights:1
        });
        if(items[i].length==1){

          resultItems.push(lastRecord);
          continue;
        }
        items[i].sort();


        var lastDate=dateutil.parseDate(items[i][0]);
        for(var x=1;x<items[i].length;x++){
          var curDate=dateutil.parseDate(items[i][x]);

          if((curDate-lastDate)/86400000==1){             //日期连续、不推入,且当前记录的入住晚上+1
            lastRecord.nights++;
          }else{                           //日期不连续，将上一个对象推入,重置上一个对象
            resultItems.push(lastRecord);
            lastRecord=Object.assign({}, this.curRooms[i], {
                checkInDate:items[i][x],
                nights:1
            });
          }
          lastDate=curDate;
          if(x==items[i].length-1){   //若果是最后一个对象，则强行推入
            resultItems.push(lastRecord);
          }
        }
      }
      this.curOrder.items=resultItems;
      this.showReserve=true;
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
    renderCurRooms (){                    //加载当前客栈的所有房间
      this.curRooms={};                   //清空之前的的房间
      for(var t in this.curHotel.types){
        for(var r in this.curHotel.types[t].rooms){
          var room=this.curHotel.types[t].rooms[r];
          this.curRooms[room.roomId]=room;
        }
      }
    },
    renderRooms (){
      var $this=this;

      this.curCell="";
      this.selectedCellStack=[];
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
    },
    showDetailModal(orderId,roomId){
      this.orderId=orderId;
      this.roomId=roomId;
      this.showDetail=true;
    }
  },
  filters:{
    dateTagfilter(d){
      return dateutil.format(d,'M/dd E');
    }
  },
  watch:{
    curHotel () {
      this.renderCurRooms();
      this.renderRooms();
    },
    startDate () {
      this.renderRooms();
    }
  }
}
</script>