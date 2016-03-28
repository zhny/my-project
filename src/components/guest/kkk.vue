<template>
<div class="wrapper">
    <div class="inn-main">
        <div class="inn-top">
            <ul class="switch-pics">
                <li><img :src="hotel.hotelFace" alt=""></li>
            </ul>
            <h2>{{hotel.hotelName}}</h2>
        </div>
        <div class="inn-detail">
            <address>{{hotel.hotelAdr}}<span>map</span></address>
        </div>
        <div class="inn-detail inn-det-flex">
            <div class="inn-det-date"><span>入住：</span><mobile-date-pick :time.sync="checkIn"></mobile-date-pick><i class="icon-ar icon-d"></i></div>
            <div class="inn-det-dategap"> - </div>
            <div class="inn-det-date"><span>离开：</span><mobile-date-pick :time.sync="checkOut"></mobile-date-pick><i class="icon-ar icon-d"></i></div>
        </div>
        <div class="room-list">
            <div class="room-item" v-for="room in hotel.types" @click="showDetail($event)">
                <h3>{{room.typeName}}</h3>
                <p class="room-descript">{{room.typeBrief}}</p>
                <div class="inn-price">{{room.rooms[0].price}}</div>
                <button class="inn-btn" @click.stop="orderGen(room.typeId)">预定</button>
                <div class="room-detail">
                    <img :src="room.typeFace" alt="">
                    <p v-for="typeDetail in room.typeDetails">{{typeDetail.detailTag}}：{{typeDetail.detailCont}}</p>
                    <i class="icon-ar icon-u"></i>
                </div>
            </div>
        </div>
        <div class="hotel-detail">
            <h3>酒店介绍</h3>
            <p class="indent">{{hotel.hotelInfo}}</p>
        </div>
        <div class="hotel-detail">
            <h3>酒店设施</h3>
            <p v-for="item in hotel.serves"><span class="{{item.serveCode}}">{{item.serveName}}</span></p>
        </div>
        <div class="hotel-detail">
            <h3>酒店政策</h3>
            <p v-for="term in hotel.terms">{{term}}</p>
        </div>
        <div class="hotel-detail">
            <h3>周边设施</h3>
            <p class="indent">{{hotel.hotelSurround}}</p>
        </div>   
    </div>     
</div>
</template>

<script>
import mobileDatePick from '../common/mobileDatePick'
import api from '../common/api'

export default {
  components:{
    mobileDatePick
  },
  data () {
    return {
        hotel:{},
        checkIn:'',
        checkOut:'',
    }
  },
  route:{
    data({to}) {
      return {
        hotel:{
            hotelId:to.query.orderHotelId,
        },
        checkIn:to.query.orderCheckIn,
        checkOut:to.query.orderCheckOut,
      }
    }
  },
  ready () {
    var $this=this;
    api.getHotel($this.hotel.hotelId,function(r){
      $this.hotel=r;
    });
  },
  methods:{
    orderGen(roomType){
        this.$router.go({path:'/orderfill',query:{"roomType":roomType,"hotelId":this.hotel.hotelId,"hotelName":this.hotel.hotelName,"checkIn":this.checkIn,"checkOut":this.checkOut}});
    },
    showDetail(event){
        $(event.currentTarget).find(".room-detail").slideToggle();
    }
  }
}
</script>