<template>
  <div class="main-content">
    <div style="display:none" class="breadcrumbs">
      <a>设置</a>
      &gt; 用户管理
    </div>
    <div class="page-cnt">
      <div class="page-header clx">
        <h1>用户列表</h1> 
      </div>
      <div>
        <div class="pb10 t14 clx">
          <div class="date-box">
            <form action="" method="get">
              <select name="innid">
                <option value="287" selected="selected">翰院壹号客栈</option>
              </select>
                  &nbsp;
              <select name="selectuserid" id="selectuserid">
                <option value="0">所有操作员</option>
                <option value="264">掌柜</option>
                <option value="2">系统</option>
                <option value="67440">掌柜翰林</option>
                <option value="67441">测试号</option>
                <option value="67468">测试</option>                        
              </select>
              &nbsp;                          
              <input id="searchbtn" type="button" class="btn btn-primary dealbtn" value="查询">
            </form>
          </div>
          <div class="chart-type">
            <ul class="clx">
              <li style="border-radius:5px;"><a href="javascript:;" @click="addUser">增加用户</a></li>
            </ul>
          </div>
        </div>
        <page :columns="columns" url="users" :params="params" first-load="true"></page>
      </div>
  </div>
  <modal :show.sync="showmodel">
    <template slot="title">{{curUser.userId?'编辑用户':'新增用户'}}</template>
    <div slot="body" class="cntbox tab-content cntbox-ota" style="position:static;">
        <div class="divider">
            <ul class="inninfo mb10">
                <li>
                     <tt class="lab tr">用户名：</tt>
                     <input type="text" name="" value="" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr">密码：</tt>
                     <input type="password" name="" value="" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr">权限设置：</tt>
                     <select name="" id="" style="width:220px; padding:0 6px; box-sizing: content-box;">
                      <option value="">请设置用户权限</option>
                      <option value="">超级管理员</option>
                      <option value="">管理员</option>
                     </select>
                </li>
                <li>
                     <tt class="lab tr">电话：</tt>
                     <input type="text" name="" value="" style="width:220px;">
                </li>
                <li>
                     <tt class="lab tr">所属客栈：</tt>
                     <input type="text" name="" value="" style="width:220px;">
                </li>
                <li>
                  <tt class="lab tr">&nbsp;</tt>
                  <a class="btn btn-primary btn-small" href="javascript:;" @click="submitUser">确认新增用户</a>
                </li>
            </ul>
        </div>                
    </div>
  </modal>
</template>

<script>
import page from '../common/page'
import api from '../common/api'
import modal from '../common/modal'

export default {
  data () {
    return {
      params:{},
      columns: [
        {title: '用户名',width: '120',name: 'account'},
        {title: '权限',width: '180',name: 'userGroup'},
        {title: '电话',width: '120',name: 'phone'},
        {title: '所属客栈',width: '',name: 'hotelName'},
        {title: '管理',width: '150',name: 'ope',template:function(row){
          var html='<a class="mr10" @click="$parent.edit(\''+row.id+'\')" href="javascript:;">编辑</a>';
          html+='<a class="del-rm mr10" @click="$parent.del(\''+row.id+'\')" href="javascript:;">删除</a>';
          return html;
        }}
      ],
      showmodel:false,
      curUser:{}

    }
  },
  components :{
    page,modal
  },
  methods:{
    edit (userId) {
      var $this=this;
      api.getUser({userId:userId},function(r){
        $this.curUser=r;
        $this.showmodel=true;
      });
    },
    del (userId) {
      if(confirm('确定删除此账号?')){
        api.deluser({userId:this.userId},function(r){
          console.log("del:"+userId);
        });
      }
    },
    addUser(){
      this.curUser={},
      this.showmodel=true;
    },
    submitUser(){
      api.submitUser(this.curUser,function(r){
        this.showmodel=false;
      });
    }
  }
}
</script>