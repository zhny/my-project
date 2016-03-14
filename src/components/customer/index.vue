<template>
  <div id="main-container">
    <div class="sidebar">
      <ul>
        <li :class="{'on':isurl('/customer/infos')}"><a v-link="{ path: '/customer/infos' }">入住旅客信息</a></li>
        <li :class="{'on':isurl('/customer/sms')}"><a v-link="{ path: '/customer/sms' }">短信服务</a></li>
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