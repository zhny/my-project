<template>
<div class="wrapper home">
  <div class="h-main">
      <div class="search-form">
          <div class="search-list">
              <div class="search-item">
                  <span class="mark">手&nbsp;&nbsp;机&nbsp;&nbsp;号</span>
                  <input type="text" class="cont" placeholder="可用作登录名" v-model="regQuest.phone">
              </div>
              <div class="search-item">
                  <span class="mark">电子邮箱</span>
                  <input type="text" class="cont" placeholder="可用作登录名" v-model="regQuest.email">
              </div>
              <div class="search-item">
                  <span class="mark">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span>
                  <input type="password" class="cont" placeholder="输入密码" v-model="regQuest.pwd">
              </div>
              <div class="search-item">
                  <span class="mark">确认密码</span>
                  <input type="password" class="cont" placeholder="确认密码" v-model="regQuest.pwdcheck">
              </div>
              <p class="errmsg">{{errMsg}}</p>
          </div>
          <div class="submit">
              <button type="submit" id="submit" class="inn-btn inn-btn-packed" @click.prevent="registor">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        regQuest:{
          phone:'',
          email:'',
          pwd:'',
          pwdcheck:'',
        },
        errMsg:'',
    }
  },
  methods:{
    registor(){
      var validPhone=/^(13|14|15|18|17)[0-9]\d{8}$/; //手机正则
      var validMail=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱正则
      if(this.regQuest.phone||this.regQuest.email){
        if(this.regQuest.phone){
          if(!validPhone.test(this.regQuest.phone)){
              this.errMsg="请填写正确的手机号";
              return false;
          } 
        }
        if(this.regQuest.email){
          if(!validMail.test(this.regQuest.email)){
              this.errMsg="请填写正确的电子邮箱";
              return false;
          } 
        }
        if(this.regQuest.pwd){
          if(this.regQuest.pwd===this.regQuest.pwdcheck){ //通过前端验证，发起注册，成功后返回登录页面
            alert("注册成功！");
            this.errMsg='';
            this.$router.go({ path: '/login' });
          } else {
            this.errMsg="两次输入的密码不一致";
            return false;
          }
        } else {
          this.errMsg="请设置密码";
          return false;
        }
      } else {
        this.errMsg="请填写手机号和电子邮箱中的至少一项";
        return false;
      }
    }
  },
}
</script>