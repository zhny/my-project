<template>
  <div id="main-container">
    <div class="sidebar">
      <ul>
        <li :class="{'on':isurl('/setting/userlist')}"><a v-link="{ path: '/setting/userlist' }">用户设置</a></li>
        <li :class="{'on':isurl('/setting/distribute')}"><a v-link="{ path: '/setting/distribute' }">分销设置</a></li>
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