<template>
<div class="wrapper">
    <div class="inn-main">
        <div class="login-tips">
            马上登录，可享更多优惠!
            <a  v-link="{ path: '/login' }" class="fr inn-btn">立即登录</a>
        </div>
        <div class="order-info">
            <h2>{{quest.hotelName}}</h2>
            <p><span>入住时间：</span>{{quest.checkIn}}至{{quest.checkOut}} 共1晚</p>
            <p><span>入住房型：</span>{{roomdetail.typeName}}</p>
        </div>
        <div class="search-form">
            <div class="search-list order-fill">
                <div id="room-num" class="search-item">
                    <span class="mark">房&nbsp;&nbsp;间&nbsp;&nbsp;数</span>
                    <select class="cont" v-model="number">
                        <option value="1" v-for="i in roomdetail.available" :value="$index+1">{{$index+1}}间</option>
                    </select>
                </div>
                <div class="visitors">
                    <div v-for="n in number" class="search-item">
                        <span class="mark">入&nbsp;&nbsp;住&nbsp;&nbsp;人</span>
                        <input class="cont order-ipt" placeholder="请填写第{{$index+1}}个入住人姓名" v-model="guest[$index]">
                    </div> 
                </div>
                <div class="search-item">
                    <span class="mark">联系方式</span>
                    <input class="cont order-ipt" placeholder="请填写联系人手机号码" v-model="phone">
                </div>
            </div>
            <div class="order-tips">
                <p>入住人姓名需与入住时所填姓名一致。</p>
                <p>该酒店14：00办理入住，早到可能需要等待。</p>
                <p>订单总额<span class="price">￥<span id="order-price">{{amount}}</span></span>，请于酒店前台支付。</p>
            </div>
            <div class="submit">
                <button type="submit" id="submit" class="inn-btn inn-btn-packed" @click="orderSub">确认订单</button>
            </div>
        </div>     
    </div>     
</div>
</template>

<script>
import api from '../common/api'

export default {
  data () {
    return {
        quest:{
            hotelId:'',
            hotelName:'',
            roomType:'',
            checkIn:'',
            checkOut:'',
        },
        roomdetail:{},
        number:1,
        phone:'',
        guest:[],
    }
  },
  route:{
    data({to}) {
      return {
        quest:{
            hotelId:to.query.hotelId,
            hotelName:to.query.hotelName,
            roomType:to.query.roomType,
            checkIn:to.query.checkIn,
            checkOut:to.query.checkOut,
        },
      }
    }
  },
  ready () {
    var $this=this;
    api.roomdetail($this.quest,function(r){
      $this.roomdetail=r;
    });
  },
  computed:{
    amount: function () {
        return this.number*this.roomdetail.price;
    }
  },
  methods:{
    orderSub(){
        var order = {};
        order.guestName=this.guset;
        order.hotelId=this.hotelId;
        order.checkInDate=this.checkIn;
        order.checkOutDate=this.checkOut;
        order.typeName=this.roomdetail.typeName;
        order.phone=this.phone;
        order.amount=this.amount;

        // $.post('',order,function(r){            //POST请求返回订单号
  //        this.$router.go({path:'/orderview',query:{"orderId":r}});
  //       }); 
        this.$router.go({path:'/questFb',query:{"orderId":1745300857,"fbCode":1}});
    }
  }
}
</script>