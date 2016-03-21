<template>
<div class="wrapper home">
  <div class="h-main">
      <div class="search-form">
          <div class="search-list">
              <div class="search-item">
                  <span class="mark">用&nbsp;&nbsp;户&nbsp;&nbsp;名</span>
                  <input type="text" class="cont" placeholder="手机号/电子邮箱">
              </div>
              <div class="search-item">
                  <span class="mark">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span>
                  <input type="password" class="cont">
              </div>
          </div>
          <div class="submit">
              <button type="submit" id="submit" class="inn-btn inn-btn-packed" onclick="document.location.href='index.html'">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
          </div>
          <div class="login-helper"><a href="pwd-change.html" class="fl pwdlink">忘记密码？</a><a href="registor.html" class="fr inn-btn reg-btn">立即注册</a></div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      pageTitle:'用户注册' , 
    }
  },
  methods:{
    isurl:require('../common/isurl')
  }
}
</script>