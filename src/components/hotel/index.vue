<template>
  <<div id="main-container">
    <div class="sidebar">
      <ul>
        <li><a href="javascript:;">房态概览</a></li>
        <li><a href="javascript:;">查询统计</a></li>
        <li class="on"><a v-link="{ path: '/hotel/setting' }">客房管理</a></li>
      </ul>
    </div>
    <router-view transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'bbb!'
    }
  }
}
</script>