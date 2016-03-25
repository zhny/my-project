<template>
<div class="wrapper">
    <div class="inn-main">
        <div class="login-tips">
            马上登录，可享更多优惠!
            <a  v-link="{ path: '/login' }" class="fr inn-btn">立即登录</a>
        </div>
        <div class="order-info">
            <h2>{{order.hotelName}}</h2>
            <p><span>入住时间：</span>{{order.checkIn}}至{{order.checkOut}} 共1晚</p>
            <p><span>入住房型：</span>{{order.roomTypeName}}</p>
            <input type="hidden" id="inn-price" value="500">
        </div>
        <div class="search-form">
            <div class="search-list order-fill">
                <div id="room-num" class="search-item">
                    <span class="mark">房&nbsp;&nbsp;间&nbsp;&nbsp;数</span>
                    <select name="" id="room-num-set" class="cont">
                        <option value="1" slected>1间</option>
                        <option value="2">2间</option>
                        <option value="3">3间</option>
                        <option value="4">4间</option>
                        <option value="5">5间</option>
                        <option value="6">6间</option>
                        <option value="7">7间</option>
                        <option value="8">8间</option>
                        <option value="9">9间</option>
                        <option value="10">10间</option>
                    </select>
                </div>
                <div class="visitors">
                    <div class="search-item">
                        <span class="mark">入&nbsp;&nbsp;住&nbsp;&nbsp;人</span>
                        <input class="cont order-ipt" placeholder="请填写入住人姓名">
                    </div>    
                </div>
                <div class="search-item">
                    <span class="mark">联系方式</span>
                    <input class="cont order-ipt" placeholder="请填写入住人手机号码">
                </div>
            </div>
            <div class="order-tips">
                <p>入住人姓名需与入住时所填姓名一致。</p>
                <p>该酒店14：00办理入住，早到可能需要等待。</p>
                <p>订单总额<span class="price">￥<span id="order-price">{{order.amount}}</span></span>，请于酒店前台支付。</p>
            </div>
            <div class="submit">
                <button type="submit" id="submit" class="inn-btn inn-btn-packed" onclick="document.location.href='success.html'">确认订单</button>
            </div>
        </div>     
    </div>     
</div>
</template>

<script>
import api from '../common/api'

export default {
  components:{
    mobileDatePick
  },
  data () {
    return {
        order:{
            hotelId:'',
            hotelName:'',
            roomType:'',
            roomTypeName:'',
            checkIn:'',
            checkOut:'',
            amount:'',
        },
    }
  },
  route:{
    data({to}) {
      return {
        order:{
            hotelId:to.query.hotelId,
            hotelName:to.query.hotelName,
            roomType:to.query.roomType,
            checkIn:to.query.checkIn,
            checkOut:to.query.checkOut,
            roomTypeName:to.query.roomTypeName,
        },
      }
    }
  },
  ready () {

  },
}
</script>