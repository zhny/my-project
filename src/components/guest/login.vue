<template>
<div class="wrapper home">
  <div class="h-main">
      <div class="search-form">
          <div class="search-list">
              <div class="search-item">
                  <span class="mark">用&nbsp;&nbsp;户&nbsp;&nbsp;名</span>
                  <input type="text" class="cont" placeholder="手机号/电子邮箱" v-model="loginQuest.account">
              </div>
              <div class="search-item">
                  <span class="mark">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span>
                  <input type="password" class="cont" placeholder="输入密码" v-model="loginQuest.pwd">
              </div>
              <p class="errmsg">{{errMsg}}</p>
          </div>
          <div class="submit">
              <button type="submit" class="inn-btn inn-btn-packed" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
          </div>
          <div class="login-helper"><a v-link="{ path: '/reset' }" class="fl pwdlink">忘记密码？</a><a v-link="{ path: '/registor' }"  class="fr inn-btn reg-btn">立即注册</a></div>
      </div>
  </div>
</div>
</template>

<script>
import api from '../common/api'

export default {
  data () {
    return {
        loginQuest:{
          account:'',
          pwd:'',
        },
        errMsg:'',
    }
  },
  methods:{
    login(){
      // alert(this.loginQuest.pwd); 
      if(this.loginQuest.account&&this.loginQuest.pwd){
        var $this=this;
        api.login(this.loginQuest,function(r){
          $this.$router.go({ path: '/home' });
        });
      } else {
        this.errMsg="请填写登录账号和密码";
        return false;
      }
    }
  },
}
</script>