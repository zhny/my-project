<template>
<div style="width: 570px; display: block;" class="bootbox modal fade in ui-draggable" id="orderform">
  <div class="modal-header clx" tag="head"><a title="关闭" class="close" tag="close">×</a>
    <h4 type="" class="light"><span class="title">预订</span> </h4>
  </div>
  <div class="modal-body">
    <form>
      <div>
        <ul id="orderformbody" class="cntlist">
          <li style="width:163px;" class="combo-input"> <span class="label-input fl">姓名</span>
            <input type="text" autocomplete="off" placeholder="" name="guestname" style="width:100px" class="fl" tag="search" id="o_guestname">
            <i style="display:none" tag="memberremark" class="member"></i>
            <div style="display:none;" class="crmlist" tag="guestlist">
              <div style="display:none;" tag="tpl" class="item">
                <p tag="guestinfo"></p>
                <p tag="orderinfo">共住过8晚，消费3291元，平均单价<strong class="red">591</strong>元</p>
              </div>
            </div>
          </li>
          <li style="width:215px;" class="combo-input"><span class="label-input fl">手机号</span>
            <input type="text" placeholder="" autocomplete="off" name="phone" style="width:140px" gname="order_手机号" ga="input" class="fl" id="o_phone">
          </li>
          <li tag="channel" style="width:150px;">
            <div value="" style="width:113px;" tag="dropdownlist" class="droplist" id="droplist"> <span tag="value" value="self" class="value">自来客</span>
              <div style="display:none; width:138px; z-index: 1000;" class="ip-dropdown" id="orderfromBox">
                <div style="max-height:170px; overflow-y:auto;" name="channel" id="o_channel">
                  <div tag="option" value="self"><a tag="option" color="ofreshgreen" value="self" href="javascript:;">自来客</a></div>
                  <div tag="option" value="familiar"><a tag="option" color="ofreshgreen" value="familiar" href="javascript:;">熟客及推荐</a></div>
                  <div tag="option" value="taobao"><a tag="option" color="ofreshgreen" value="taobao" href="javascript:;">淘宝</a></div>
                  <div tag="option" value="ctrip"><a tag="option" color="ofreshgreen" value="ctrip" href="javascript:;">携程</a></div>
                  <div tag="option" value="elong"><a tag="option" color="ofreshgreen" value="elong" href="javascript:;">艺龙</a></div>
                  <div tag="option" value="qunar"><a tag="option" color="ofreshgreen" value="qunar" href="javascript:;">去哪儿</a></div>
                  <div tag="option" value="tongcheng"><a tag="option" color="ofreshgreen" value="tongcheng" href="javascript:;">同程</a></div>
                  <div tag="option" value="qingmangguo"><a tag="option" color="ofreshgreen" value="qingmangguo" href="javascript:;">青芒果</a></div>
                  <div tag="option" value="songguo"><a tag="option" color="ofreshgreen" value="songguo" href="javascript:;">松果</a></div>
                  <div tag="option" value="tuniu"><a tag="option" color="ofreshgreen" value="tuniu" href="javascript:;">途牛</a></div>
                  <div tag="option" value="xuzhu"><a tag="option" color="ofreshgreen" value="xuzhu" href="javascript:;">续住</a></div>
                  <div tag="option" value="booking"><a tag="option" color="ofreshgreen" value="booking" href="javascript:;">Booking</a></div>
                  <div tag="option" value="agoda"><a tag="option" color="ofreshgreen" value="agoda" href="javascript:;">Agoda</a></div>
                  <div tag="option" value="other"><a tag="option" color="ofreshgreen" value="other" href="javascript:;">其它</a></div>
                  <div tag="option" value="wkz"><a tag="option" color="ofreshgreen" value="wkz" href="javascript:;">微客栈</a></div>
                  <div tag="option" value="miot"><a tag="option" color="ored" value="miot" href="javascript:;">米途</a></div>
                  <div tag="option" value="wuxinghaijiaqilvxing"><a tag="option" color="ofreshgreen" value="wuxinghaijiaqilvxing" href="javascript:;">武星海假期旅行社</a></div>
                  <div tag="option" value="hanlinge"><a tag="option" color="ofreshgreen" value="hanlinge" href="javascript:;">翰林哥</a></div>
                  <div tag="option" value="zhongguoguolv"><a tag="option" color="ofreshgreen" value="zhongguoguolv" href="javascript:;">中国国旅</a></div>
                  <div tag="option" value="qunaerwangyufu"><a tag="option" color="ofreshgreen" value="qunaerwangyufu" href="javascript:;">去哪儿网预付</a></div>
                </div>
              </div>
            </div>
          </li>
          <li style="display: none;" tag="idcard" class="over">
            <div class="clx">
              <div value="1" style="width:126px;" tag="dropdownlist" t="idcardform" class="droplist fl"> <span tag="value" value="1" class="value">身份证</span>
                <div style="display:none; width:152px; z-index: 1000;" class="ip-dropdown">
                  <div>
                    <div tag="option" value="1"><a tag="option" value="1" class="on" href="javascript:;">身份证</a></div>
                    <div tag="option" value="2"><a tag="option" value="2" href="javascript:;">护照</a></div>
                    <div tag="option" value="3"><a tag="option" value="3" href="javascript:;">港澳通行证</a></div>
                    <div tag="option" value="4"><a tag="option" value="4" href="javascript:;">军官证</a></div>
                    <div tag="option" value="5"><a tag="option" value="5" href="javascript:;">其它</a></div>
                  </div>
                </div>
              </div>
              <input type="text" gname="order_证件录入" ga="input" value="" id="idnum" name="idcard" style="width:312px; margin-left:-1px;" class="fl">
              <a gname="order_多人" ga="a" tag="multiguest" title="录入或扫描证件信息" class="multiguest multiguest_alt " href="http://v.yunzhanggui.net/Book/index#?"></a> </div>
          </li>
          <li class="over">
            <div class="line"></div>
          </li>
          <li class="over pop-booking-room" tag="orderroomlist">
            <div oid="" i="0" tag="order" class="rmi clx">
              <div value="2016-02-22" style="width:58px;" tag="dropdownlist" t="datelist" class="droplist fl" id="selectDay"> <span tag="value" value="2016-02-22" class="value">02/22入住</span>
                <div tag="checkindate" style="display:none; width:83px; z-index: 1000;" class="ip-dropdown" id="daysBox"><div style="max-height:170px; overflow-y:auto;"><div tag="option" value="2016-02-12"><a tag="option" href="javascript:;">02/12</a></div><div tag="option" value="2016-02-13"><a tag="option" href="javascript:;">02/13</a></div><div tag="option" value="2016-02-14"><a tag="option" href="javascript:;">02/14</a></div><div tag="option" value="2016-02-15"><a tag="option" href="javascript:;">02/15</a></div><div tag="option" value="2016-02-16"><a tag="option" href="javascript:;">02/16</a></div><div tag="option" value="2016-02-17"><a tag="option" href="javascript:;">02/17</a></div><div tag="option" value="2016-02-18"><a tag="option" href="javascript:;">02/18</a></div><div tag="option" value="2016-02-19"><a tag="option" href="javascript:;">02/19</a></div><div tag="option" value="2016-02-20"><a tag="option" href="javascript:;">02/20</a></div><div tag="option" value="2016-02-21"><a tag="option" href="javascript:;">02/21</a></div><div tag="option" value="2016-02-22"><a tag="option" href="javascript:;">02/22入住</a></div><div tag="option" value="2016-02-23"><a tag="option" href="javascript:;">02/23</a></div><div tag="option" value="2016-02-24"><a tag="option" href="javascript:;">02/24</a></div><div tag="option" value="2016-02-25"><a tag="option" href="javascript:;">02/25</a></div><div tag="option" value="2016-02-26"><a tag="option" href="javascript:;">02/26</a></div><div tag="option" value="2016-02-27"><a tag="option" href="javascript:;">02/27</a></div><div tag="option" value="2016-02-28"><a tag="option" href="javascript:;">02/28</a></div><div tag="option" value="2016-02-29"><a tag="option" href="javascript:;">02/29</a></div><div tag="option" value="2016-03-01"><a tag="option" href="javascript:;">03/01</a></div><div tag="option" value="2016-03-02"><a tag="option" href="javascript:;">03/02</a></div><div tag="option" value="2016-03-03"><a tag="option" href="javascript:;">03/03</a></div></div></div>
              </div>
              <div value="2259" style="width:120px; margin-left:-1px;" tag="rooms" t="rooms" class="droplist fl" id="selectRoom"> <span value="2259" class="value">朝天懒</span>
                <div style="display:none; width:145px; z-index: 1000;" class="ip-dropdown" id="roomsBox">
                  <div roomid="2259" tag="room" style="max-height:170px; overflow-y:auto;"> </div>
                </div>
              </div>
              <div value="1" style="width:38px; margin-left:-1px;" tag="rns" t="nights" class="droplist fl" id="selectNights"> <span value="1" class="value">1晚</span>
                <div style="display:none; width:63px; z-index: 1000;" class="ip-dropdown" id="rnsBox">
                  <div nights="1" tag="nights" style="max-height:170px; overflow-y:auto;"> </div>
                </div>
              </div>
              <input type="text" style="width:50px; margin-left:-1px; margin-right:5px;" class="fl tr" value="" tag="price">
               <a tag="addroom" href="javascript:;" class="add-book mt5" title="添加预订"></a></div>
            <div tag="orderinfo" class="sum"><span class="title">订单总额</span><strong tag="totalprice">¥0</strong><i style="display:none" tag="discount" class="sale-num">10折</i></div>
          </li>
          <li style="display: none;" tag="blockbookinglist" class="over pop-booking-room">
            <div class="rmi clx">
              <div style="width:108px;" class="droplist fl" t="selectcheckin"> <span class="value"></span>
                <div tag="selectcheckinlist" style="width:133px; z-index: 1000;display:none" class="ip-dropdown">
                  <div style="max-height:170px; overflow-y:auto;"></div>
                </div>
              </div>
              <div style="width:38px; margin-left:-1px;" class="droplist fl" t="selectcheckinnights"> <span class="value"></span>
                <div style="display:none; width:63px; z-index: 1000;" class="ip-dropdown">
                  <div tag="tpllist" style="max-height:170px; overflow-y:auto;"></div>
                </div>
              </div>
              <div tag="totalprice" style="position:relative;" class="fl"> <span style="position:absolute; left:5px; top:5px;" class="">总价</span>
                <input type="text" style="width:70px; margin-left:-1px; margin-right:5px; padding-left:30px;" class="tr" tag="bookallroom_input" value="0">
              </div>
              <span class="fl mt5 ml5">（共0间房）</span> </div>
          </li>
          <li class="over pop-booking-room" tag="paytype">
            <div tag="roomrateform" class="pop-booking-finance mt10 clx">
              <div class="fr"> <span class="fl mt5 light">收款：</span>
                <input type="text" value="" style="width:50px; margin-right:0;" tag="roompay" class="fl" gname="order_支付房费" ga="input" name="roomrate">
                <div value="alipay" style="width:63px; margin-left:-1px;" tag="dropdownlist" class="droplist fl" t="roomrate"> <span value="alipay" tag="value" class="value">支付宝</span>
                  <div style="display: none; width: 151px;z-index: 1000; max-height: 110px;overflow-y: auto;" class="ip-dropdown ip-right" t="paymentsBox">
                    <div>
                      <div tag="option" class="" value="alipay"><a tag="option" id="668" class="on" href="javascript:;">支付宝</a></div>
                      <div tag="option" class="" value="cash"><a tag="option" id="669" class="on" href="javascript:;">现金</a></div>
                      <div tag="option" class="" value="elong"><a tag="option" id="670" class="on" href="javascript:;">艺龙代收</a></div>
                      <div tag="option" class="" value="ctrip"><a tag="option" id="671" class="on" href="javascript:;">携程代收</a></div>
                      <div tag="option" class="" value="shouyintai"><a tag="option" id="53373" class="on" href="javascript:;">收银台</a></div>
                      <div tag="option" class="" value="shuaka"><a tag="option" id="90536" class="on" href="javascript:;">刷卡</a></div>
                    </div>
                  </div>
                </div>
                <a tag="delpayform" style="display:none" href="#" class="del-book mr5 mt5" title="删除该预订"></a> </div>
            </div>
            <div tag="checkoutroomrateform" style="display:none" class="pop-booking-finance mt10 clx">
              <div class="fr"> <span class="fl mt5 light">退房费：</span>
                <input type="text" value="" style="width:50px; margin-right:0;" tag="roompay" class="fl" gname="order_支付房费" ga="input" name="roomrate">
                <div value="alipay" style="width:63px; margin-left:-1px;" tag="dropdownlist" class="droplist fl" t="roomrate"> <span value="alipay" tag="value" class="value">支付宝</span>
                  <div style="display: none; width: 151px;z-index: 1000; max-height: 110px;overflow-y: auto;" class="ip-dropdown ip-right" t="paymentsBox">
                    <div>
                      <div tag="option" class="" value="alipay"><a tag="option" id="668" class="on" href="javascript:;">支付宝</a></div>
                      <div tag="option" class="" value="cash"><a tag="option" id="669" class="on" href="javascript:;">现金</a></div>
                      <div tag="option" class="" value="elong"><a tag="option" id="670" class="on" href="javascript:;">艺龙代收</a></div>
                      <div tag="option" class="" value="ctrip"><a tag="option" id="671" class="on" href="javascript:;">携程代收</a></div>
                      <div tag="option" class="" value="shuaka"><a tag="option" id="90536" class="on" href="javascript:;">刷卡</a></div>
                    </div>
                  </div>
                </div>
                <a tag="delpayform" style="display:none" href="#" class="del-book mr5 mt5" title="删除该预订"></a> </div>
            </div>
            <div tag="finlist" class="pop-booking-finance mt10 clx">
              <div class="fr addfinance"> <a tag="showaddconsume" href="#">添加收款 + </a>
                <div tag="consumelistform" style="" class="ip-dropdown">
                  <div>
                    <div><span class="placeholder">添加收款 + </span></div>
                    <div tag="option"><a tag="addroomrate" href="javascript:;">收款</a></div>
                    <div tag="option"><a tag="adddeposit" href="javascript:;">押金</a></div>
                    <div tag="option"><a tag="addconsume" href="javascript:;">其它消费</a></div>
                    <div tag="option"><a tag="addcheckoutroomrate" href="javascript:;">退房费</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:none" tag="depositform" class="pop-booking-finance clx">
              <div class="fr"> <span class="fl mt5 light">押金：</span>
                <input type="text" class="fl" style="width:50px; margin-right:0;" tag="roomdeposit" value="" gname="order_押金" ga="input" name="deposit">
                <div value="cash" class="droplist fl" tag="dropdownlist" style="width:63px; margin-left:-1px;" t="deposit"> <span value="cash" tag="value" class="value">现金</span>
                  <div id="paymentsBox" class="ip-dropdown ip-right" style="display:none; z-index: 1000; width: 151px; max-height: 110px;overflow-y: auto;">
                    <div>
                      <div tag="option" class="" value="alipay"><a tag="option" id="668" class="on" href="javascript:;">支付宝</a></div>
                      <div tag="option" class="" value="cash"><a tag="option" id="669" class="on" href="javascript:;">现金</a></div>
                      <div tag="option" class="" value="elong"><a tag="option" id="670" class="on" href="javascript:;">艺龙代收</a></div>
                      <div tag="option" class="" value="ctrip"><a tag="option" id="671" class="on" href="javascript:;">携程代收</a></div>
                      <div tag="option" class="" value="shuaka"><a tag="option" id="90536" class="on" href="javascript:;">刷卡</a></div>
                    </div>
                  </div>
                </div>
                <a tag="delpayform" style="display:none" href="#" class="del-book mr5 mt5" title="删除该预订"></a> </div>
            </div>
            <div style="display:none" tag="consumeform_tpl" class="pop-booking-finance clx">
              <div class="fr"> <span class="fl mt5 light">其它消费：</span>
                <input type="text" value="" style="width:50px; margin-right:0;" class="fl" name="consume" tag="input_consume">
                <div t="consume" style="width:63px; margin-left:-1px;" class="droplist droplist_on fl"> <span tag="showconsumetype" class="value">项目</span>
                  <div tag="consumelist" style="display:none; width:200px;" class="yzg-mulcolumnlist clx">
                    <div style="width:98px;" class="yzg-mulcolumnlist-catalog">
                      <div class="yzg-mulcolumnlist-heightfixed"> </div>
                    </div>
                    <div t="typelist" style="width:98px;" class="yzg-mulcolumnlist-content">
                      <div class="yzg-mulcolumnlist-heightfixed"> </div>
                    </div>
                  </div>
                </div>
                <a tag="delpayform" style="display:none" href="#" class="del-book mr5 mt5" title="删除该预订"></a> </div>
            </div>
            <div style="display:none" tag="paystatistics" class="pop-booking-record">
              <div> <span class="title">已收</span><a tag="showfindetail" class="t14 past" gname="order_已付房费" ga="a" href="#">¥NaN</a> </div>
              <div> <span class="title">待收</span><a tag="showneedpaydetail" href="#" class="t14 unpaid">¥NaN</a> </div>
            </div>
          </li>
          <li class="over">
            <div class="line"></div>
          </li>
          <li class="over">
            <textarea style="width:516px; height:50px" placeholder="备注信息" maxlength="1000" setplaceholder="" gname="order_备注" ga="input" id="o_remark"></textarea>
          </li>
          <li id="ordercolor" class="over" tag="ordercolor">
            <div tag="color" class="ordercolors fl"> <span title="默认：清新绿" class="ofreshgreen checked"></span> <em>订单颜色</em>
              <div tag="colorlist" style="display:none;z-index: 10000 ! important;" class="selection clx"><span title="默认：清新绿" class="ofreshgreen checked" ison="1" val="ofreshgreen" tag="color"></span><span title="宝石蓝" class="osapphireblue" val="osapphireblue" tag="color"></span><span title="蓝色" class="oblue" val="oblue" tag="color"></span><span title="青绿色" class="ocyan" val="ocyan" tag="color"></span><span title="绿色" class="ogreen" val="ogreen" tag="color"></span><span title="黄色" class="oyellow" val="oyellow" tag="color"></span><span title="橙色" class="oorange" val="oorange" tag="color"></span><span title="红色" class="ored" val="ored" tag="color"></span><span title="奢华红" class="oluxuryred" val="oluxuryred" tag="color"></span><span title="紫色" class="opurple" val="opurple" tag="color"></span></div>
            </div>
            <label style="position: relative;margin-left: 30px;" tag="remindlabel" class="fl ml20 t12 cursor-p">
              <input type="checkbox" tag="remind" class="hidden-input" value="1" id="checkbox" name="checkbox">
              提醒<span class="circle-btn"></span></label>
            <label tag="checkboxlabel" style="position: relative;margin-right: 14px;" class="fr ml20 t12">
              <input type="checkbox" value="4" id="o_paystatus" class="hidden-input" name="checkbox" gname="order_担保" ga="a">
              已担保<span tag="checkbox" class="circle-btn"></span></label>
          </li>
        </ul>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <input type="hidden" name="cellindex" id="ordercell">
    <a style="display: none;" class="fl btn btn-info" id="orderandcheckinbtn">直接入住</a> 
    <a class="btn btn-primary" >提交订单</a> </div>
</div>
</template>

<script>
export default {
  data () {

  }
}
</script>