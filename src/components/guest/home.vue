<template>
<div class="wrapper home">
  <div class="h-main">
      <div class="search-form">
          <div class="search-list">
              <div id="select-posi" class="search-item">
                  <span class="mark">入住酒店</span>
                  <span id="checked-hotel" class="cont">翰林壹号客栈</span>
                  <input type="hidden">
                  <i class="icon-ar icon-f"></i>
              </div>
              <div class="search-item">
                  <span class="mark">入住日期</span>
                  <input type="date" class="cont">
                  <i class="icon-ar icon-f"></i>
              </div>
              <div class="search-item">
                  <span class="mark">离店日期</span>
                  <input type="date" class="cont">
                  <i class="icon-ar icon-f"></i>
              </div>
          </div>
          <div class="submit">
              <button type="submit" id="submit" class="inn-btn inn-btn-packed" @click="book('hoo')">预订房间</button>
          </div>
      </div>
  </div>
</div>
<div class="hotels">
  <h2>选择你要入住的酒店<i class="icon-ar icon-f"></i></h2>
  <ul>
      <li class="hotel-opt">
          <img src="" alt="">
          <h3>翰林壹号客栈</h3>
          <address>丽江 古城区 文武街文明巷177号</address>
          <p class="features">
              <span>p</span>
              <span>s</span>
              <span></span>
              <span></span>
              <span></span>
          </p>
      </li>
      <li class="hotel-opt">
          <img src="" alt="">
          <h3>翰林贰号客栈</h3>
          <address>丽江 古城区 文武街文明巷177号</address>
          <p class="features">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </p>
      </li>
      <li class="hotel-opt">
          <img src="" alt="">
          <h3>翰林叁号客栈</h3>
          <address>丽江 古城区 文武街文明巷177号</address>
          <p class="features">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </p>
      </li>
      <li class="hotel-opt">
          <img src="" alt="">
          <h3>翰林肆号客栈</h3>
          <address>丽江 古城区 文武街文明巷177号</address>
          <p class="features">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </p>
      </li>
      <li class="hotel-opt">
          <img src="" alt="">
          <h3>翰林伍号客栈</h3>
          <address>丽江 古城区 文武街文明巷177号</address>
          <p class="features">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </p>
      </li>
  </ul>
</div>
</template>

<script>
export default {
  methods:{
    book (hotelId) {
      this.$router.go({path:'/inn',query:{"hotelId":hotelId}});
    },
  }
}
</script>