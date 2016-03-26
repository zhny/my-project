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
    }
  },
  methods:{
    registor(){
      alert(this.regQuest.email); 
    }
  },
}
</script>