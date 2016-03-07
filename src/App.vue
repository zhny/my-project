<template>
  <div class="main">
    <main-header></main-header>
    <div class="clear"></div>
    <router-view transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'

export default {
  components: {
    MainHeader
  }
}
</script>
