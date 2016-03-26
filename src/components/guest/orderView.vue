<template>
<div class="wrapper">
    <div class="inn-main">
        <div class="order-info order-title">
            <p>订单号<strong>{{orderdetail.orderId}}</strong><span class="price fr">￥{{orderdetail.orgPrice}}</span></p>
            <h2>翰林壹号客栈</h2>
            <address>丽江 古城区 文武街文明巷177号<span>map</span></address>
        </div>
        <div class="order-info">
            <p><span>预定日期：</span>{{orderdetail.orderId}}</p>
            <p>
                <span>订单状态：</span>
                <template v-if="orderdetail.orderItemStatus==0">
                    <span class="order-sts sts-o">已预定</span>    
                </template>
                <template v-else>
                    <template v-if="orderdetail.orderItemStatus==1">
                        <span class="order-sts sts-g">已入住</span>    
                    </template>
                    <template v-else>
                        <span class="order-sts sts-b">已入住</span>
                    </template>
                </template>
            </p>
            <p><span>入住时间：</span>{{orderdetail.checkInDate}}至{{orderdetail.checkoutDate}} 共{{orderdetail.nights}}晚</p>
            <p><span>入住房型：</span>{{orderdetail.typeName}}</p>
            <p><span>房&nbsp;&nbsp;间&nbsp;&nbsp;数：</span>2</p>
            <p><span>到店时间：</span>2016-03-08 14：00至2016-03-08 22：00</p>
            <p><span>住客信息：</span>{{orderdetail.guestName}}</p>
            <p><span>联系电话：</span>{{orderdetail.phone}}</p>
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
      }
    }
  },
  ready () {
    var $this=this;
    api.roomorder($this.orderId,function(r){
      $this.orderdetail=r;
    });
  },
}
</script>