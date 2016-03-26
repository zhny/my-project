<template>
<div class="wrapper">
    <div class="inn-main">
        <div class="order-success">
            <p class="center"><img src="../../assets/img/success.jpg" alt=""></p>
            <p class="success-info">订单已成功提交，我们将在稍后以短信方式通知您预订结果</p>
            <p>订单号：<strong>{{orderId}}</strong> <a class="inn-btn order-check fr" @click="orderView">查看订单</a></p>
            <p>总价：<span class="price">￥{{orderdetail.orgPrice}}</span> 请于酒店前台付款</p>
            <p>请确保您的手机号码填写正确，无效手机号码可能导致订单取消。</p>    
        </div>    
    </div>
</div>  
</template>

<script>
import api from '../common/api'

export default {
  data () {
    return {
        orderdetail:{},
    }
  },
  route:{
    data({to}) {
      return {
        orderId:to.query.orderId,
        fbCode:to.query.fbCode,
      }
    }
  },
  ready () {
    var $this=this;
    api.roomorder($this.orderId,function(r){
      $this.orderdetail=r;
    });
  },
  methods:{
    orderView(){
        this.$router.go({path:'/orderView',query:{"orderId":this.orderId}});
    }
  }
}
</script>