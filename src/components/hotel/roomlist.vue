<template>
  <div class="main-content">
    <div style="display:none" class="breadcrumbs"><a>房态</a> &gt; 客房管理 </div>
    <div class="page-cnt">
      <div class="page-header clx">
        <h1>客房列表</h1> 
      </div>
      <div>
        <div class="pb10 t14 clx">
          <div class="date-box">
            <form action="">
              <select v-model="curHotel">
                <option></option>
                <option v-for="hotel in hotels" :value="hotel.hotelId">{{hotel.hotelName}}</option>
              </select>
              <select v-model="curType">
                <option></option>
                <option v-for="type in types" :value="type.typeId">{{type.typeName}}</option>
              </select>
              <input type="button" value="查询" class="btn btn-primary dealbtn" @click="search">
            </form>
          </div>
          <div class="chart-type">
            <ul class="clx">
              <li style="border-radius:5px;"><a v-link="{ path: '/hotel/addroom' }">增加房间</a></li>
            </ul>
          </div>
        </div>
        <page :columns="columns" url="roomlist" :params="params"></page>         
      </div>
    </div>    
  </div>
</template>

<script>
import page from '../common/page'
import api from '../common/api'

export default {
  data () {
    return {
      hotels:[],
      curHotel:'',
      curType:'',
      keyword:'',
      params:{},
      columns: [
        {title: '房间名称',width: '80',name: 'roomName'},
        {title: '所属酒店',width: '150',name: 'hotelName'},
        {title: '所属房型',width: '120',name: 'typeName'},
        {title: '房间价格',width: '80',name: 'price'},
        {title: '有否照片',width: '80',name: 'imgs'},
        {title: '房间设施',width: '',name: 'facilities'},
        {title: '管理',width: '150',name: 'ope',template:function(row){
          var html='<a class="mr10" @click="$parent.edit(\''+row.roomId+'\')" href="javascript:;">编辑</a>';
          html+='<a class="del-rm mr10" @click="$parent.del(\''+row.roomId+'\')" href="javascript:;">删除</a>';
          return html;
        }}
      ]
    }
  },
  components :{
    page
  },
  methods:{
    edit (roomId) {
      this.$router.go({path:'/hotel/addroom',query:{"roomId":roomId}});
    },
    del (roomId) {
      if(confirm('确定删除此房间?')){
        api.delroom({roomId:this.roomId},function(r){
          console.log("del:"+roomId);
        });
      }
    },
    search (){
      this.params={
        hotelId:this.curHotel,
        typeId:this.curType
      }
    },
  },
  computed :{
    types () {
      for(var i in this.hotels){
        if(this.hotels[i].hotelId==this.curHotel){
          return this.hotels[i].types;
        }
      }
    }
  },
  ready () {
    var $this=this;
    api.getHotels({},function(r){
      $this.hotels=r;
    });
  }
}
</script>