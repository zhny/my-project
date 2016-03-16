<template>
  <div id="main-container">
    <div class="sidebar">
      <ul>
        <li :class="{'on':isurl('/hotel/roomstatus')}"><a href="javascript:;"  v-link="{ path: '/hotel/roomstatus' }">房态概览</a></li>
        <li :class="{'on':isurl('/hotel/orders')}"><a href="javascript:;" v-link="{ path: '/hotel/orders' }">查询统计</a></li>
        <li :class="{'on':isurl('/hotel/roomlist')}"><a href="javascript:;" v-link="{ path: '/hotel/roomlist' }">客房管理</a></li>
      </ul>
    </div>
    <router-view transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods:{
    isurl:require('../common/isurl')
  }
}
</script>