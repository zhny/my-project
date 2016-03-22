<template>
<div class="wrapper home">
  <div class="h-main">
      <div class="search-form">
          <div class="search-list">
              <div class="search-item">
                  <span class="mark">手&nbsp;&nbsp;机&nbsp;&nbsp;号</span>
                  <input type="text" class="cont" placeholder="可用作登录名">
              </div>
              <div class="search-item">
                  <span class="mark">电子邮箱</span>
                  <input type="text" class="cont" placeholder="可用作登录名">
              </div>
              <div class="search-item">
                  <span class="mark">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span>
                  <input type="password" class="cont">
              </div>
              <div class="search-item">
                  <span class="mark">确认密码</span>
                  <input type="password" class="cont">
              </div>
          </div>
          <div class="submit">
              <button type="submit" id="submit" class="inn-btn inn-btn-packed" onclick="document.location.href='index.html'">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  methods:{
    isurl:require('../common/isurl')
  }
}
</script>