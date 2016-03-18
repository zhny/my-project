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
                      <div v-if="col.order" class="date-have ui-sortable"  :style="{width:(100*col.order.nights)+'%'}">
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

<modal :show.sync="showmodel">
  <template slot="title">{{modalTitle}}</template>
  <div slot="body">
    <ul class="cntlist" >
      <li class="combo-input" style="width:163px;"> 
        <span  class="label-input fl">姓名</span>
        <input class="fl" style="width:100px" type="text">
      </li>
      <li class="combo-input" style="width:195px;">
        <span  class="label-input fl">手机号</span>
        <input class="fl" style="width:120px" type="text">
      </li>
      <li style="width:150px;">
        <select class="xiala" style="border:1px solid #ccc; font-size:12px;">
          <option>自来客</option>
          <option>自来客1</option>
        </select>
      </li>
      <li class="over">
        <div class="line"></div>
      </li>
      <li tag="orderroomlist" class="over pop-booking-room">
        <div class="rmi clx">
            <select style="float:left; width:116px; margin-right:0; border-right:0;" >
              <option>2016-02-22</option>
            </select>
            <select style="width:120px; font-size:12px;float: left; margin-right:0; border-right:0;" >
              <option>朝天懒</option>
            </select>
            <select style="width:58px;font-size:12px;float: left; margin-right:0; border-right:0;" >
              <option>1晚</option>
            </select>
          <input type="text" class="fl tr" style="width:50px; margin-left:-1px; margin-right:5px;">
          <a title="删除该预订" class="del-book mr5 mt5" href="javascript:;" tag="removeroom"></a>
          <a title="添加预订" class="add-book mt5" href="javascript:;" tag="addroom"></a>
        </div>
        <div class="sum">
          <span class="title">订单总额</span>
          <strong >¥0</strong>
        </div>
      </li>
      
      <li class="over pop-booking-room">
        <div class="pop-booking-finance mt10 clx" >
          <div class="fr"> <span class="fl mt5 light">收款：</span>
            <input type="text" class="fl" style="width:50px; margin-right:0;">
            <select style="width:63px;font-size:12px;float: left; margin-right:0; border-left:0;" >
              <option>支付宝</option>
            </select>
            <a title="删除该预订" class="del-book mr5 mt5" href="#" style=""></a> </div>
        </div>
        <div class="pop-booking-finance mt10 clx" >
          <div class="fr addfinance addfinance_on"> 
            <a href="#" class="red"><i class="ico-finance mr5"></i>添加收款 + </a>
            <div class="ip-dropdown" style="">
              <div>
                <div><span class="placeholder">添加收款 + </span></div>
                <div ><a href="#">收款</a></div>
                <div ><a href="#">押金</a></div>
                <div ><a href="#">其它消费</a></div>
                <div ><a href="#">退房费</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pop-booking-record" style="">
          <div> <span class="title">已收</span><a href="#" class="t14 past">¥NaN</a> </div>
          <div> <span class="title">待收</span><a class="t14 unpaid" href="#">¥NaN</a> </div>
        </div>
      </li>
      <li class="over">
        <div class="line"></div>
      </li>
      <li class="over">
        <textarea id="o_remark" maxlength="1000" placeholder="备注信息" style="width:516px; height:50px"></textarea>
      </li>
      <li class="over" id="ordercolor">
        <label class="fl ml20 t12 cursor-p" style="position: relative;margin-left: 30px;">
          <input name="checkbox" type="checkbox" id="checkbox" value="1" class="hidden-input" >
          提醒<span class="circle-btn"></span></label>
        <label class="fr ml20 t12" style="position: relative;margin-right: 14px;">
          <input ga="a" gname="order_担保" name="checkbox" class="hidden-input" type="checkbox" id="o_paystatus">
          已担保<span class="circle-btn"></span></label>
      </li>
    </ul>
  </div>
  <template slot="footer">
    <a class="fl btn btn-info">直接入住</a> 
    <a class="btn btn-primary">提交订单</a> 
  </template>
</modal>

</template>
<script>
import dateutil from '../common/dateutil'
import orderform from './orderform'
import api from '../common/api'
import modal from '../common/modal'

var theNow=new Date();
export default {
  components:{
    orderform,modal
  },
  data () {
    return {
      showmodel:false,                  
      hotels:[],                                        //所有客栈、房型
      curHotel:{},                                      //当前选中的客栈
      roomStatus:[],                                    //渲染页面的表格数据
      now:theNow,                                       //今天
      startDate:new Date(theNow.getFullYear(),theNow.getMonth(),theNow.getDate()-2),      //日历时间起
      endDate:new Date(theNow.getFullYear(),theNow.getMonth(),theNow.getDate()+7),        //日历时间止
      selectedCell:{},                                  //用于标记cell的选中状态true或者false
      curCell:'',                                       //当前最后一个选中的cell
      selectedCellStack:[],                             //选中的cell 栈
      modalTitle:'',
      curOrder:{
        guestName:"",
        phone:"",
        items:[]
      }                                    
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
      this.modalTitle="预定";
      this.showmodel=true;
      var items={};
      var resultItems=[];
      for(var i in this.selectedCellStack){
        var cellKey=this.selectedCellStack[i].split("_");
        if(items[cellKey[0]]==undefined){
          items[cellKey[0]]=[];
        }
        items[cellKey[0]].push(cellKey[1]);
      }
      // if((dateutil.parseDate(_key2)-dateutil.parseDate(_key1))/86400000==1){

      for(var i in items){
        if(items[i].length==1){
          resultItems.push({
            roomId:i,
            checkInDate:items[i][0],
            nights:1
          });
          continue;
        }
        items[i].sort();

        var lastRecord={
          roomId:i,
          checkInDate:items[i][0],
          nights:1
        };

        var lastDate=dateutil.parseDate(items[i][0]);
        for(var x=0;x<items[i].length;x++){
          var curDate=dateutil.parseDate(items[i][x]);
          if((curDate-lastDate)/86400000==1){             //日期连续、不推入,且当前记录的入住晚上+1
            lastRecord.nights++;
          }else{                                          //日期不连续，将上一个对象推入,，重置上一个对象
            resultItems.push(lastRecord);
            lastRecord={
              roomId:i,
              checkInDate:items[i][x],
              nights:1
            };
          }
          lastDate=curDate;
        }
      }
      console.log(resultItems);
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
    }
  }
}
</script>