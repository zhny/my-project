<template>
  <div class="pageContentWrapper">
    <div class="headerBreak headerBreakTitleBottom"></div>
    <div class="loginFormWrapper">
        <fieldset>
          <div class="formFieldWrapper">
            <label for="loginNameField">用户名:</label>
            <input type="text" class="loginNameField fieldWithIcon userFieldIcon" v-model="user.username">
          </div>
          <div class="formFieldWrapper">
            <label for="loginPasswordField">密码:</label>
            <input type="password"  class="loginPasswordField fieldWithIcon passwordFieldIcon" v-model="user.password">
          </div>
          <div class="loginButtonsWrapper"><a class="loginRecoverButton" href="javascript:;" v-link="{path:'/resetpass'}">忘记密码？</a> </div>
          <input type="submit" @click.stop="submit" class="loginButton" value="登录">
        </fieldset>
    </div>
  </div>
</template>

<script>
import api from '../common/api'

export default{
  data(){
    return {
      user:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    submit(){
      if(this.user.username&&this.user.password){
        var $this=this;
        api.login(this.user,function(r){
          $this.$router.go({ path: '/index' });
        });
      }
    }
  }
}
</script>