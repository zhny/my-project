<template>
<div class="wrapper">
  <div class="h-main">
      <div class="search-form">
          <div class="search-list">
              <div class="search-item">
                <span class="mark">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</span>
                  <input type="text" class="cont" placeholder="您注册时填写的手机"  v-model="formData.phone">
                  <input type="button" class="inn-btn reset-btn" @click="getValicode" class="resetButton" :value="tipInfo" :disabled="disabledGetValicode"/>
              </div>
              <div class="search-item">
                  <span class="mark">验&nbsp;&nbsp;证&nbsp;&nbsp;码</span>
                  <input type="text" class="cont" placeholder="输入收到的验证码" v-model="formData.valicode">
              </div>
              <div class="search-item">
                  <span class="mark">新&nbsp;&nbsp;密&nbsp;&nbsp;码</span>
                  <input type="password" class="cont" placeholder="新的密码" v-model="formData.password">
              </div>
              <p class="errmsg">{{errMsg}}</p>
          </div>
          <div class="submit">
              <button type="submit" id="submit" class="inn-btn inn-btn-packed" @click.stop="submit">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;认</button>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import api from '../common/api'

export default {
  data (){
    return {
      disabledGetValicode:false,
      tipInfo:'获取验证码',
      formData:{
        phone:'',
        valicode:'',
        password:''
      }
      
    }
  },
  methods:{
    getValicode (){
      if(this.formData.phone&&/^(13|14|15|18|17)[0-9]\d{8}$/i.test(this.formData.phone)){
        var $this=this;
        $this.disabledGetValicode=true;
        api.getSmsVali({phone:this.formData.phone},function(r){
          var lastSeconds=90;
          var timer=setInterval(function(){
            if(--lastSeconds==0){
              window.clearInterval(timer);
              $this.disabledGetValicode=false;
              $this.tipInfo='获取验证码';
            }else{
              $this.tipInfo=lastSeconds+"秒后重新获取";
            }
          },1000);
        });
      }
    },
    submit(){
      if(this.formData.phone&&this.formData.phone&&this.formData.phone){
        var $this=this;
        api.resetpassword(this.formData,function(r){
          alert('密码修改成功');
          $this.$router.go({path:'/login'});
        });
      }
    }
  }
}
</script>