<script>
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    time: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      default: function _default() {
        return {
          type: 'day',
          week: ['一', '二', '三', '四', '五', '六', '日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
          format: 'YYYY-MM-DD',
          color: {
            header: '#3f51b5',
            headerText: '#fff'
          },
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          placeholder: '',
          buttons: {
            clear:'清空',
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5,
          dismissible: true
        };
      }
    },
    limit: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    function hours() {
      var list = [];
      var hour = 24;
      while (hour > 0) {
        hour--;

        list.push({
          checked: false,
          value: hour < 10 ? '0' + hour : hour
        });
      }
      return list;
    }
    function mins() {
      var list = [];
      var min = 60;
      while (min > 0) {
        min--;
        list.push({
          checked: false,
          value: min < 10 ? '0' + min : min
        });
      }
      return list;
    }
    return {
      hours: hours(),
      mins: mins(),
      showInfo: {
        hour: false,
        day: false,
        month: false,
        year: false,
        check: false
      },
      displayInfo: {
        month: ''
      },
      library: {
        week: this.option.week,
        month: this.option.month,
        year: []
      },
      checked: {
        oldtime: '',
        currentMoment: null,
        year: '',
        month: '',
        day: '',
        hour: '00',
        min: '00'
      },
      dayList: []
    };
  },

  methods: {
    nextMonth: function nextMonth(type) {
      var next = null;

      type == 'next' ? next = (0, _moment2.default)(this.checked.currentMoment).add(1, 'M') : next = (0, _moment2.default)(this.checked.currentMoment).add(-1, 'M');

      this.showDay(next);
    },
    showDay: function showDay(time) {
      if (time === undefined || !Date.parse(time)) {
        this.checked.currentMoment = (0, _moment2.default)();
      } else {
        this.checked.currentMoment = (0, _moment2.default)(time, this.option.format);
      }
      this.showOne('day');

      this.checked.year = (0, _moment2.default)(this.checked.currentMoment).format("YYYY");
      this.checked.month = (0, _moment2.default)(this.checked.currentMoment).format("MM");
      this.checked.day = (0, _moment2.default)(this.checked.currentMoment).format("DD");

      this.displayInfo.month = this.library.month[(0, _moment2.default)(this.checked.currentMoment).month()];

      var days = [];
      var currentMoment = this.checked.currentMoment;
      var firstDay = (0, _moment2.default)(currentMoment).date(1).day();

      //gettting previous and next month

      var currentMonth = _lodash2.default.cloneDeep(currentMoment);
      var previousMonth = _lodash2.default.cloneDeep(currentMoment);
      var nextMonth = _lodash2.default.cloneDeep(currentMoment);
      nextMonth.add(1, 'months');
      previousMonth.subtract(1, 'months');

      var monthDays = (0, _moment2.default)(currentMoment).daysInMonth();
      var oldtime = this.checked.oldtime;
      for (var i = 1; i <= monthDays; ++i) {
        days.push({
          value: i,
          inMonth: true,
          unavailable: false,
          checked: false
        });
        if (i == Math.ceil((0, _moment2.default)(currentMoment).format("D")) && (0, _moment2.default)(oldtime).year() == (0, _moment2.default)(currentMoment).year() && (0, _moment2.default)(oldtime).month() == (0, _moment2.default)(currentMoment).month()) {
          days[i - 1].checked = true;
        }
      }

      if (firstDay == 0) firstDay = 7;

      for (var _i = 0; _i < firstDay - 1; _i++) {
        var passiveDay = {
          value: previousMonth.daysInMonth() - _i,
          inMonth: false,
          action: 'previous'
        };
        days.unshift(passiveDay);
      }

      if (this.limit.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.limit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var li = _step.value;

            switch (li.type) {
              case 'fromto':
                days = this.limitFromTo(li, days);
                break;
              case 'weekday':
                days = this.limitWeekDay(li, days);
                break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var passiveDaysAtFinal = 42 - days.length;
      for (var _i2 = 1; _i2 <= passiveDaysAtFinal; _i2++) {
        var _passiveDay = {
          value: _i2,
          inMonth: false,
          action: 'next'
        };
        days.push(_passiveDay);
      }
      this.dayList = days;
    },
    limitWeekDay: function limitWeekDay(limit, days) {
      var _this = this;

      days.map(function (day) {
        var tday = void 0;
        day.value < 10 ? tday = '0' + day.value : tday = day.value;

        if (limit.available.indexOf(Math.floor((0, _moment2.default)(_this.checked.year + '-' + _this.checked.month + '-' + tday).format('d'))) == -1) {
          day.unavailable = true;
        }
      });
      return days;
    },
    limitFromTo: function limitFromTo(limit, days) {
      var _this2 = this;

      days.map(function (day) {
        if (!(0, _moment2.default)(_this2.checked.year + '-' + _this2.checked.month + '-' + day.value).isBetween(limit.from, limit.to)) {
          day.unavailable = true;
        }
      });
      return days;
    },
    checkDay: function checkDay(obj) {
      if (obj.unavailable || obj.value == '') {
        return false;
      }

      if (!obj.inMonth) {
        this.nextMonth(obj.action);
      }

      this.dayList.map(function (x) {
        return x.checked = false;
      });
      obj.checked = true;
      this.checked.day = obj.value;
      this.checked.day.length < 2 ? this.checked.day = '0' + this.checked.day : this.checked.day;
      if (this.option.type == 'day') {
        this.picked();
      } else {
        this.showOne('hour');
      }
    },
    showYear: function showYear() {
      var year = (0, _moment2.default)(this.checked.currentMoment).year();
      this.library.year = [];
      var yearTmp = [];
      for (var i = year - 100; i < year + 5; ++i) {
        yearTmp.push(i);
      }
      this.library.year = yearTmp;

      this.showOne('year');

      var self = this;
      this.$nextTick(function () {
        var listDom = document.getElementById('yearList');
        listDom.scrollTop = listDom.scrollHeight - 100;
        self.addYear();
      });
    },
    showOne: function showOne(type) {
      switch (type) {
        case 'year':
          this.showInfo.hour = false;
          this.showInfo.day = false;
          this.showInfo.year = true;
          this.showInfo.month = false;
          break;
        case 'month':
          this.showInfo.hour = false;
          this.showInfo.day = false;
          this.showInfo.year = false;
          this.showInfo.month = true;
          break;
        case 'day':
          this.showInfo.hour = false;
          this.showInfo.day = true;
          this.showInfo.year = false;
          this.showInfo.month = false;
          break;
        case 'hour':
          this.showInfo.hour = true;
          this.showInfo.day = false;
          this.showInfo.year = false;
          this.showInfo.month = false;
          break;
        default:
          this.showInfo.day = true;
          this.showInfo.year = false;
          this.showInfo.month = false;
          this.showInfo.hour = false;

      }
    },
    showMonth: function showMonth() {
      this.showOne('month');
    },
    addYear: function addYear() {
      var self = this;
      var listDom = document.getElementById('yearList');
      var tmp = 0;
      listDom.addEventListener('scroll', function (e) {

        if (listDom.scrollTop < listDom.scrollHeight - 100) {
          var len = self.library.year.length;
          var lastYear = self.library.year[len - 1];
          self.library.year.push(lastYear + 1);
        }
      }, false);
    },
    setYear: function setYear(year) {
      this.checked.currentMoment = (0, _moment2.default)(year + '-' + this.checked.month + '-' + this.checked.day);
      this.showDay(this.checked.currentMoment);
    },
    setMonth: function setMonth(month) {
      var mo = this.library.month.indexOf(month) + 1;
      if (mo < 10) {
        mo = '0' + '' + mo;
      }
      this.checked.currentMoment = (0, _moment2.default)(this.checked.year + '-' + mo + '-' + this.checked.day);
      this.showDay(this.checked.currentMoment);
    },
    showCheck: function showCheck() {
      if (this.time == '') {
        this.showDay();
      } else {
        this.checked.oldtime = this.time;
        this.showDay(this.time);
      }

      this.showInfo.check = true;
    },
    setTime: function setTime(type, obj, list) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          item.checked = false;
          if (item.value == obj.value) {
            item.checked = true;
            this.checked[type] = item.value;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    picked: function picked() {
      var ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
      this.checked.currentMoment = (0, _moment2.default)(ctime, "YYYY-MM-DD HH:mm");
      this.time = (0, _moment2.default)(this.checked.currentMoment).format(this.option.format);
      this.showInfo.check = false;
    },
    clear(){
      this.time="";
      this.showInfo.check = false;
    },
    dismiss: function dismiss(evt) {
      if (evt.target.className === 'datepicker-overlay') {
        if (this.option.dismissible == undefined || this.option.dismissible) {
          this.showInfo.check = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.datepicker-overlay{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index:998;
  top:0;
  left: 0;
  overflow: hidden;
  -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0.5s; /* Firefox < 16 */
        -ms-animation: fadein 0.5s; /* Internet Explorer */
         -o-animation: fadein 0.5s; /* Opera < 12.1 */
            animation: fadein 0.5s;
}


@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.cov-date-body {
  display: inline-block;
  background: #3F51B5;
  overflow: hidden;
  position: relative;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 400;
  position: fixed;
  display: block;
  width: 400px;
  max-width: 100%;
  z-index: 999;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
}

.cov-picker-box {
  background: #fff;
  width: 100%;
  display: inline-block;
  padding: 25px;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
  -ms-box-sizing: border-box !important;
  width: 400px;
  max-width: 100%;
  height: 280px;
  text-align: start!important;
}

.cov-picker-box td {
  height: 34px;
  width: 34px;
  padding: 0;
  line-height: 34px;
  color: #000;
  background: #fff;
  text-align: center;
  cursor: pointer;
}

.cov-picker-box td:hover {
  background: #E6E6E6;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

.day {
  width: 14.2857143%;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  height: 34px;
  padding: 0;
  line-height: 34px;
  color: #000;
  background: #fff;
  vertical-align: middle;
}

.week ul {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
}

.week ul li {
  width: 14.2%;
  display: inline-block;
  text-align: center;
  background: transparent;
  color: #000;
  font-weight: bold;
}

.passive-day{
  color: #bbb;
}
.checked {
  background: #F50057;
  color: #FFF !important;
  border-radius: 3px;
}

.unavailable {
  color: #ccc;
  cursor: not-allowed;
}

.cov-date-monthly {
  height: 80px;
}

.cov-date-monthly > div {
  display: inline-block;
  padding: 0;
  margin: 0;
  vertical-align: middle;
  color: #fff;
  height: 80px;
  float: left;
  text-align: center;
  cursor: pointer;
}

.cov-date-previous,
.cov-date-next {
  position: relative;
  width: 20% !important;
  text-indent: -300px;
  overflow: hidden;
  color: #fff;
}

.cov-date-caption {
  width: 60%;
  padding: 10px 0!important;
  box-sizing: border-box;
  font-size: 24px;
}

.cov-date-caption span:hover {
  color: rgba(255, 255, 255, 0.7);
}

.cov-date-previous:hover,
.cov-date-next:hover {
  background: rgba(255, 255, 255, 0.1);
}

.day:hover {
  background: #EAEAEA;
}

.unavailable:hover {
  background: none;
}

.checked:hover {
  background: #FF4F8E;
}

.cov-date-next::before,
.cov-date-previous::before {
  width: 20px;
  height: 2px;
  text-align: center;
  position: absolute;
  background: #fff;
  top: 50%;
  margin-top: -7px;
  margin-left: -7px;
  left: 50%;
  line-height: 0;
  content: '';
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}

.cov-date-next::after,
.cov-date-previous::after {
  width: 20px;
  height: 2px;
  text-align: center;
  position: absolute;
  background: #fff;
  margin-top: 6px;
  margin-left: -7px;
  top: 50%;
  left: 50%;
  line-height: 0;
  content: '';
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.cov-date-previous::after {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}

.cov-date-previous::before {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.date-item {
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
  cursor: pointer;
}

.date-item:hover {
  background: #e0e0e0;
}

.date-list {
  overflow: auto;
  vertical-align: top;
  padding: 0;
}

.cov-datepicker {
  display: inline-block;
/*  padding: 6px;
  line-height: 22px;
  font-size: 16px;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  font-family: 'Roboto';
  color: #5F5F5F;*/
}

.cov-vue-date {
  display: inline-block;
  color: #5D5D5D;
}

.button-box {
  background: #fff;
  vertical-align: top;
  height: 50px;
  line-height: 50px;
  text-align: right;
  padding-right: 20px;
}

.button-box span {
  cursor: pointer;
  padding: 10px 20px;
}

.watch-box {
  height: 100%;
  overflow: hidden;
}

.hour-box,
.min-box {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 100%;
  overflow: auto;
  float: left;
}
.hour-box ul,
.min-box ul{
  list-style: none;
    margin: 0;
    padding: 0;
}

.hour-item, .min-item {
  padding: 10px;
  font-size: 36px;
  cursor: pointer;
}
.hour-item:hover, .min-item:hover{
  background: #E3E3E3;
}
.hour-box .active, .min-box .active{
  background: #F50057;
  color: #FFF !important;
}
::-webkit-scrollbar {
    width: 2px;
}
::-webkit-scrollbar-track {
    background: #E3E3E3;
}
::-webkit-scrollbar-thumb {
    background: #C1C1C1;
    border-radius: 2px;
}
</style>
<template>
  <div class="cov-vue-date">
    <div class="datepickbox">
<!--       <input 
      readonly="readonly"
      type="text" 
      title="input date" 
      class="cov-datepicker" 
      placeholder="{{option.placeholder}}" 
      v-model="time" 
      @click="showCheck" 
      :style="option.inputStyle"/> -->
      <input 
      readonly="readonly"
      type="text" 
      title="input date" 
      class="cov-datepicker" 
      placeholder="{{option.placeholder}}" 
      v-model="time" 
      @click="showCheck" 
      :style=""/>
    </div>

    <div class="datepicker-overlay"
      v-if="showInfo.check"
      @click="dismiss($event)"
      v-bind:style="{'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'}">
      <div 
      class="cov-date-body" 
      :style="{'background-color': option.color ? option.color.header : '#3f51b5'}">
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div class="cov-date-caption" :style="{'color': option.color ? option.color.headerText : '#fff'}">
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div
            class="day"
            v-for="day in dayList"
            track-by="$index"
            @click="checkDay(day)"
            :class="{'checked':day.checked,'unavailable':day.unavailable,'passive-day': !(day.inMonth)}"
            >{{day.value}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
              <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
              <ul>
                <li 
                class="hour-item" 
                v-for="hitem in hours" 
                @click="setTime('hour', hitem, hours)"
                :class="{'active':hitem.checked}"
                >{{hitem.value}}</li>
              </ul>
              </div>
              <div class="min-box">
              <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div 
                class="min-item" 
                v-for="mitem in mins" 
                @click="setTime('min',mitem, mins)"
                :class="{'active':mitem.checked}"
                >{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <span @click="clear">{{option.buttons? option.buttons.clear : 'Clear'}}</span>
          <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
          <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>