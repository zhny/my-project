<template>
  <div class="main">
    <div id="header">
    <div class="inn-name">
      <h2>翰林客栈管理系统</h2>
      <p><span class="user">ID:9527</span><span tag="regards">，</span>&nbsp;&nbsp;<a href="javascript:;">登出</a></p>
    </div>
    <div class="logo"><a href=""><span class="logo_big"></span></a></div>
    <div id="sub-nav">
      <a :class="{'active':isurl('/hotel')}" v-link="{ path: '/hotel/roomstatus' }">房态</a>
      <a class="" href="../stats/budget.html">统计</a>
      <a :class="{'active':isurl('/customer')}" v-link="{ path: '/customer/infos' }">客户</a>
      <a href="../marketing/weibo.html">营销</a><a class="" href="../setting/create.html">设置</a>
      <a class="" href="../logs/logs.html">日志</a>
    </div>
  </div>
    <div class="clear"></div>
    <router-view transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    isurl:require('./components/common/isurl')
  }
}
</script>
