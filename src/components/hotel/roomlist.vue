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
              <select v-model="curHotel.ID" @change="changeHotel">
                <option value="">请选择客栈</option>
                <option v-for="hotel in hotels" :value="hotel.ID">{{hotel.NAME}}</option>
              </select>
              <select v-model="curHotel.curType">
                <option value="" selected="selected">所有房型</option>
                <option v-for="type in curHotel.types" :value="type">{{type.NAME}}</option>
              </select>
            </form>
          </div>
          <div class="chart-type">
            <ul class="clx">
              <li style="border-radius:5px;"><a v-link="{ path: '/hotel/addroom' }">增加房间</a></li>
            </ul>
          </div>
        </div>
        <table style="width:100%;" class="table table-bordered table-analytics">
          <tbody>
            <tr>
              <th width="80">房间名称</th>
              <th width="120">所属客栈</th>
              <th width="120">所属房型</th>
              <th width="80">房间价格</th>
              <th width="80">有否照片</th>
              <th>房间设施</th>
              <th width="100" class="tc">操作</th>
            </tr>
            <tr v-for="row in curRows">
              <td>{{row.NAME}}</td>
              <td>{{row.HOTELNAME}}</td>
              <td>{{row.TYPENAME}}</td>
              <td>{{row.PRICE}}</td>
              <td>否</td>
              <td></td>
              <td class="tc">
                <a class="mr10" @click="edit(row.ID)" href="javascript:;">编辑</a>
                <a class="del-rm mr10" @click="del(row.ID)" href="javascript:;">删除</a>
              </td>
            </tr>
          </tbody>
        </table>    
      </div>
    </div>    
  </div>
</template>

<script>
import api from '../common/api'
import realApi from '../common/realApi'

export default {
  data () {
    return {
      hotels:[],
      curHotel:{
        ID:'',
        NAME:'',
        curType:{
          ID:''
        },
        types:[]
      },
    }
  },
  methods:{
    changeHotel(){
      for(var i in this.hotels){
        if(this.hotels[i].ID==this.curHotel.ID){
          this.curHotel.NAME=this.hotels[i].NAME;
          break;
        }
      }
      if(!this.curHotel.ID)return;
      var $this=this;
      realApi.getTypesAndRooms({hotelid:this.curHotel.ID},function(r){
        $this.curHotel.types=r;
      });
    },
    edit (roomId) {
      this.$router.go({path:'/hotel/addroom',query:{"roomId":roomId}});
    },
    del (roomId) {
      if(confirm('确定删除此房间?')){
        api.delroom({roomId:this.roomId},function(r){
          console.log("del:"+roomId);
        });
      }
    }
  },
  ready () {
    var $this=this;
    realApi.getHotels({},function(r){
      $this.hotels=r;
      $this.changeHotel();
    });
  },
  computed:{
    curRows:function(){
      var rooms=[];
      if(this.curHotel.curType.ID){
        for(var i in this.curHotel.types){
          if(this.curHotel.curType.ID==this.curHotel.types[i].ID){
            for(var r in this.curHotel.types[i].rooms){
              var room=this.curHotel.types[i].rooms[r];
              room.HOTELNAME=this.curHotel.NAME;
              room.TYPENAME=this.curHotel.types[i].NAME;
              rooms.push(room);
              break;
            }
          }
        }
      }else{
        for(var i in this.curHotel.types){
          for(var r in this.curHotel.types[i].rooms){
            var room=this.curHotel.types[i].rooms[r];
            room.HOTELNAME=this.curHotel.NAME;
            room.TYPENAME=this.curHotel.types[i].NAME;
            rooms.push(room);
          }
        }
      }
      return rooms;
    }
  }
}
</script>