<template>
<div class="wrapper home">
  <div class="h-main">
      <div class="search-form">
          <div class="search-list">
              <div id="select-posi" class="search-item">
                  <span class="mark">入住酒店</span>
                  <span id="checked-hotel" class="cont" @click="listShow">{{orderQuery.orderHotel.hotelName}}</span>
                  <input type="hidden" v-model="orderQuery.orderHotel.hotelId">
                  <i class="icon-ar icon-f"></i>
              </div>
              <div class="search-item">
                  <span class="mark">入住日期</span>
                  <mobile-date-pick :time.sync="orderQuery.orderCheckIn"></mobile-date-pick>
                  <i class="icon-ar icon-f"></i>
              </div>
              <div class="search-item">
                  <span class="mark">离店日期</span>
                  <mobile-date-pick :time.sync="orderQuery.orderCheckOut"></mobile-date-pick>
                  <i class="icon-ar icon-f"></i>
              </div>
          </div>
          <div class="submit">
              <button type="submit" id="submit" class="inn-btn inn-btn-packed" @click="book">预订房间</button>
          </div>
      </div>
  </div>
</div>
<div class="hotels">
  <h2>选择你要入住的酒店<i class="icon-ar icon-f" @click="listHide"></i></h2>
  <ul>
      <li v-for="row in hotels" class="hotel-opt"  @click="changeHotel(row)">
        <img :src="row.hotelFace" alt="">
        <h3>{{row.hotelName}}</h3>
        <address>{{row.hotelAdr}}</address>
        <p class="features">
          <span v-for="item in row.serves" class="{{item.serveCode}}">{{item.serveName}}</span>
        </p>  
      </li>
  </ul>
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
      hotels:[],
      orderQuery:{
        orderHotel:{},
        orderCheckIn:'',
        orderCheckOut:''
      },
    }
  },
  ready () {
    var $this=this;
    api.getHotels({},function(r){
      $this.hotels=r;
      $this.orderQuery.orderHotel = $this.hotels[0];
    });
  },
  methods:{
    book(){
      this.$router.go({path:'/inn',query:{"orderHotelId":this.orderQuery.orderHotel.hotelId,"orderCheckIn":this.orderQuery.orderCheckIn,"orderCheckOut":this.orderQuery.orderCheckOut}});
    },
    listShow(){
      $('.hotels').show().animate({left:'0'},600);
    },
    listHide(){
      $('.hotels').animate({left:'100%'},600,function(){
        $('.hotels').hide();    
      });
    },
    changeHotel(curHotel){
      this.orderQuery.orderHotel = curHotel;
      this.listHide();
    }
  },
}
</script>