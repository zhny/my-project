<template>
  <div class="tip-remind mb15">填写新增房间的相关信息</div>
  <div style="position:static;" class="cntbox tab-content cntbox-ota">
    <div class="divider">
        <ul class="inninfo mb10">
            <li>
                 <tt class="lab tr">房间名称：</tt>
                 <input type="text" style="width:220px;" value="" name="">
            </li>
            <li>
                 <tt class="lab tr">所属房型：</tt>
                 <input type="text" style="width:220px;" value="" name="">
            </li>
            <li>
                 <tt class="lab tr">房间价格：</tt>
                 <input type="text" style="width: 220px;" value="" name="">
            </li>
            <li>
                 <tt class="lab tr">新增数量：</tt>
                 <input type="text" style="width:220px;" value="" name="">
            </li>
            <li>
                 <tt class="lab tr">房间设施：</tt>
                 <input type="text" style="width:220px;" value="" name="">
            </li>
            <li>
                 <tt class="lab tr">其他：</tt>
                 <input type="text" style="width: 220px;" value="" name="">
            </li>
            <li>
                 <tt class="lab tr">上传图片：</tt>
                 <input type="file" style="width: 220px; padding:4px 6px; font-size:12px; border: 1px solid #ccc;" value="" name="">
            </li>
            <li>
              <tt class="lab tr">&nbsp;</tt>
              <a href="#?" class="btn btn-primary btn-small">确认新增</a>
              <span style="display:none;" id="linkurl_loading"><span class="loading16"></span><span class="ml10">正在加载，请稍候</span></span>
            </li>
        </ul>
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