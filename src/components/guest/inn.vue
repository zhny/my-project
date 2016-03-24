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
            <div class="room-item" v-for="room in hotel.types">
                <h3>{{room.typeName}}</h3>
                <p class="room-descript">房间简要描述,限制在二十字以内</p>
                <div class="inn-price">{{room.rooms[0].price}}</div>
                <button class="inn-btn" @click="orderGen(room.typeId)">预定</button>
                <div class="room-detail">
                    <img src="" alt="">
                    <p>房间面积：40-50平米</p>
                    <p>楼层：1-2层</p>
                    <p>床型：双人床，1.8米</p>
                    <p>最多入住人数：2人</p>
                    <p>早餐：无</p>
                    <p>入住前订单可以取消</p>
                    <i class="icon-ar icon-u"></i>
                </div>
            </div>
        </div>
        <div class="hotel-detail">
            <h3>酒店介绍</h3>
            <p class="indent">客栈介绍文字，字数不限丽江古城老龙门客栈,地处丽江古城中心区域,一进两大院。原生态的纳西庭院,古色古香,原汁原味,环境幽美,闹中取静,丽江古城口碑客栈。</p>
        </div>
        <div class="hotel-detail">
            <h3>酒店设施</h3>
            <p><span></span>免费停车</p>
            <p><span></span>免费WIFI</p>
        </div>
        <div class="hotel-detail">
            <h3>酒店政策</h3>
            <p>入住时间：14:00以后      离店时间：12:00以前</p>
            <p> 不可携带宠物。</p>
        </div>
        <div class="hotel-detail">
            <h3>周边设施</h3>
            <p class="indent">客栈周边介绍文字，字数不限丽江古城老龙门客栈,地处丽江古城中心区域,一进两大院。原生态的纳西庭院,古色古香,原汁原味,环境幽美,闹中取静,丽江古城口碑客栈。</p>
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
        alert("预定房型："+roomType);
    },
  }
}
</script>