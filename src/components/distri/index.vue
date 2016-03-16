<template>
  <div id="main-container">
    <div class="sidebar">
      <ul>
        <li :class="{'on':isurl('/distri/distlist')}"><a v-link="{ path: '/distri/distlist' }">分销订单列表</a></li>
        <li :class="{'on':isurl('/distri/channel')}"><a v-link="{ path: '/distri/channel' }">分销渠道设置</a></li>
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
  },
  methods:{
    isurl:require('../common/isurl')
  }
}
</script>