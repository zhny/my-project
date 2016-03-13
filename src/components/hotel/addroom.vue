<template>
    <div class="main-content">
        <div style="display:none" class="breadcrumbs"><a>房态</a> &gt; 客房管理 </div>
        <div class="page-cnt">
            <div class="page-header clx">
                <h1>{{(detail.roomId!=undefined&&detail.roomId!='')?'编辑':'增加'}}客房</h1>
            </div>
            <div class="tip-remind mb15">填写房间的相关信息</div>
            <div style="position:static;" class="cntbox tab-content cntbox-ota">
                <div class="divider">
                    <ul class="inninfo mb10">
                        <li>
                            <tt class="lab tr">所属酒店：</tt>
                            <select style="width:220px; padding:0 6px; box-sizing: content-box;" v-model="detail.hotelId">
                                <option v-for="hotel in hotels" :value="hotel.hotelId">{{hotel.hotelName}}</option>
                            </select>
                        </li>
                        <li>
                            <tt class="lab tr">所属房型：</tt>
                            <select style="width:220px; padding:0 6px; box-sizing: content-box;" v-model="detail.typeId">
                                <option v-for="type in types" :value="type.typeId">{{type.typeName}}</option>
                            </select>
                        </li>
                        <li>
                            <tt class="lab tr">房间名称：</tt>
                            <input type="text" style="width:220px;" v-model="detail.roomName">
                        </li>
                        <li>
                            <tt class="lab tr">房间价格：</tt>
                            <input type="text" style="width: 220px;" v-model="detail.price">
                        </li>
                        <li>
                            <tt class="lab tr">房间设施：</tt>
                            <input type="text" style="width:220px;" v-model="detail.facilities">
                        </li>
                        <li>
                            <tt class="lab tr">上传图片：</tt>
                            <input type="file" style="width: 220px; padding:4px 6px; font-size:12px; border: 1px solid #ccc;" value="" name="">
                            <ul class="fj-piclist">
                                <li>
                                    <a title="查看原图" href="http://img5.cache.netease.com/sports/2016/2/28/201602282315211cf14_550.jpg" target="_black"><img height="100" alt="" src="http://img5.cache.netease.com/sports/2016/2/28/201602282315211cf14_550.jpg"></a>
                                    <b title="删除" onclick="$(this).parent().remove();" class="fj-delicon">×</b></li>
                                    <li>
                                        <a title="查看原图" href="http://img3.cache.netease.com/photo/0005/2016-02-29/BGVH4E9L00DE0005.jpg" target="_black"><img height="100" alt="" src="http://img3.cache.netease.com/photo/0005/2016-02-29/BGVH4E9L00DE0005.jpg"></a>
                                        <b title="删除" onclick="$(this).parent().remove();" class="fj-delicon">×</b>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <tt class="lab tr">&nbsp;</tt>
                                <a href="javascript:;" class="btn btn-primary btn-small" @click="submit">确认新增</a>
                            </li>
                        </ul>
                    </div>                
                </div>
            </div>    
        </div>
</template>

<script>
import api from '../common/api'

export default {
  data () {
    return {
        hotels:[],
        detail:{}
    }
  },
  route:{
    data({to}) {
      return {
        detail:{
            roomId:to.query.roomId
        }
      }
    }
  },
  methods:{
    submit(){
        var $this=this;
        api.addroom($this.detail,function(r){                                  
            console.log(r);
        });
    }
  },
  ready () {
    var $this=this;
    if(this.detail.roomId){
        api.roomdetail($this.detail,function(r){
            $this.detail=r;
        });
    }

    api.getHotels({},function(r){
      $this.hotels=r;
    });
  },
  computed :{
    types () {
      for(var i in this.hotels){
        if(this.hotels[i].hotelId==this.detail.hotelId){
          return this.hotels[i].types;
        }
      }
    }
  },
}
</script>