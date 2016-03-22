<template>
<div class="wrapper">
    <div class="inn-main">
        <div class="inn-top">
            <ul class="switch-pics">
                <li><img src="" alt=""></li>
            </ul>
            <h2>翰林壹号客栈</h2>
        </div>
        <div class="inn-detail">
            <address>丽江 古城区 文武街文明巷177号<span>map</span></address>
        </div>
        <div class="inn-detail inn-det-flex">
            <div class="inn-det-date"><span>入住：</span><input type="date" class="cont"><i class="icon-ar icon-d"></i></div>
            <div class="inn-det-dategap"> - </div>
            <div class="inn-det-date"><span>离开：</span><input type="date" class="cont"><i class="icon-ar icon-d"></i></div>
        </div>
        <div class="room-list">
            <div class="room-item">
                <h3>房型名称</h3>
                <p class="room-descript">房间简要描述,限制在二十字以内</p>
                <div class="inn-price">￥500</div>
                <button class="inn-btn" onclick="document.location.href='order.html'">预定</button>
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
            <div class="room-item">
                <h3>房型名称</h3>
                <p class="room-descript">房间简要描述,限制在二十字以内</p>
                <div class="inn-price">￥500</div>
                <button class="inn-btn" onclick="document.location.href='order.html'">预定</button>
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
            <div class="room-item">
                <h3>房型名称</h3>
                <p class="room-descript">房间简要描述,限制在二十字以内</p>
                <div class="inn-price">￥500</div>
                <button class="inn-btn" onclick="document.location.href='order.html'">预定</button>
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
export default {
  data () {
    return {
        hotels:[],
        detail:{}
    }
  },
  route:{
    data({to}) {
      return {
        detail:{
            hotelId:to.query.hotelId
        }
      }
    }
  },
  ready () {
    alert(this.detail.hotelId);
  },
}
</script>