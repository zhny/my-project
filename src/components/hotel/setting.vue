<template>
<div class="main-content">
  <div style="display:none" class="breadcrumbs"><a>房态</a> &gt; 客房管理 </div>
    <div class="page-cnt">
        <div class="page-header page-header-report clx">
            <div class="chart-type">
              <ul class="clx">
                  <li class="on"><a v-link="{ path: '/hotel/setting/addroom' }">增加房间</a></li>
                  <li><a href="editroom.html">编辑客房</a></li>
                  <li><a href="delroom.html">删除客房</a></li>
              </ul>
            </div>
        </div>
        <router-view transition-mode="out-in" keep-alive></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'bbb!'
    }
  }
}
</script>