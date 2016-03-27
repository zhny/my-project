<template>
<div class="wrapper">
    <div class="inn-main">
        <div class="login-tips">
            您的账号：{{account.accountId}}
            <a  v-link="{ path: '/reset' }" class="fr inn-btn">修改密码</a>
        </div>
        <div class="search-form">
            <div class="search-list account-info">
                <p class="errmsg">{{errMsg}}</p>
                <div class="account-item">
                    <span class="mark">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</span>
                    <input class="cont order-ipt" placeholder="请填写联系人手机号码" v-model="account.phone">
                    <a class="fr inn-btn" @click="phoneReset">修改</a>
                </div>
                <div class="account-item">
                    <span class="mark">电子邮箱</span>
                    <input class="cont order-ipt" placeholder="请填写联系人电子邮箱" v-model="account.email">
                    <a class="fr inn-btn" @click="mailReset">修改</a>
                </div>
            </div>
            <div class="orderlist">
                <h2>您的订单</h2>
                <ul>
                    <li v-for="row in orders" @click="orderView(row.orderId)">
                        <span>订单ID：{{row.orderId}}</span>
                        <span class="order-time">{{row.orderItems[0].created}}</span>
                        <template v-if="row.orderItems[0].orderItemStatus==0">
                            <span class="order-sts sts-o fr">已预定</span>    
                        </template>
                        <template v-else>
                            <template v-if="row.orderItems[0].orderItemStatus==1">
                                <span class="order-sts sts-g fr">已入住</span>    
                            </template>
                            <template v-else>
                                <span class="order-sts sts-b fr">已入住</span>
                            </template>
                        </template>
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
        account:{},
        orders:{},
        errMsg:'',
    }
  },
  ready () {
    var $this=this;
    api.getAccount({},function(r){
        $this.account=r;
    });
    api.getOrders($this.account.accountId,function(r){
        $this.orders=r.rows;
    });
  },
  methods:{
    mailReset(){
        var validMail=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(this.account.email){
            if(!validMail.test(this.account.email)){
                this.errMsg="请填写正确的电子邮箱";
                return false;
            }
            this.errMsg='';
            alert("新的电子邮箱："+this.account.email);
        } else {
            this.errMsg="请输入新的电子邮箱";
            return false;
        }
    },
    phoneReset(){
        var validPhone=/^(13|14|15|18|17)[0-9]\d{8}$/;
        if(this.account.phone){
            if(!validPhone.test(this.account.phone)){
                this.errMsg="请填写正确的手机号码";
                return false;
            }
            this.errMsg='';
            alert("新的手机号码："+this.account.phone);
        } else {
            this.errMsg="请输入新的手机号";
            return false;
        }
    },
    orderView(orderId){
        this.$router.go({path:'/orderView',query:{"orderId":orderId}});
    }
  }
}
</script>