<template>
  <div>
    <div class="weui-cells cells-top cell-all-no-border">

      <div class="weui-cell cell-cur-day">
        <div class="weui-cell__hd"><label for="date" class="weui-label">今日</label></div>
        <div class="weui-cell__bd">
          <p v-text="curDate"></p>
          <!--<input class="weui-input" type="date" v-model="curDate" readonly id="curDate" value="">-->
          <input class="weui-input" type="hidden" id="date" value="">
        </div>
      </div>

      <div id="calendar">
      </div>


    </div>

    <div class="weui-cells cell-all-no-border" v-if="'createTime' in curDateRecord">
      <div v-if="curDateRecord.success">
        <div class="weui-cell">
          <p class="msg msg-success">
            <span v-text=""></span>
            {{curDateRecord.signTime|date}} 已签到
          </p>
        </div>
      </div>

      <div v-if="!curDateRecord.success">
        <div class="weui-cell">
          <p class="msg msg-error">
            {{curDateRecord.signTime|date}} 签到失败
          </p>
        </div>
        <div class="weui-cell">
          <a @click="sign" href="javascript:;" class="weui-btn weui-btn_primary">重新签到</a>
        </div>
      </div>
    </div>

    <div class="weui-cells cell-all-no-border" v-if="!('createTime' in curDateRecord)">
      <div class="weui-cell ">

      </div>
      <div class="weui-cell ">
        <a @click="sign" href="javascript:;" class="weui-btn weui-btn_primary">签到</a>
      </div>
    </div>

    <p class="fix_bottom_link">
      <router-link replace :to="{name: 'login'}">返回登陆</router-link>
    </p>

  </div>
</template>

<style rel="stylesheet/less" lang="less">

  .fix_bottom_link {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    a {
      color: #444;
      font-size: 13px;
      text-decoration: underline;
    }
  }

  .picker-calendar-day {
    &.sign_success span {
      border: 2px solid #15ff3f;
    }
    &.sign_failed span {
      border: 2px solid #ff455b;
    }
  }

  .msg {
    width: 100%;
    font-size: 12px;
    color: #888;
    text-align: center;

    &.msg-success {
      color: #1AAD19;
    }
    &.msg-warn {
      color: #FFEEBC;
    }
    &.msg-error {
      color: #e64c32;
    }
  }
</style>


<style rel="stylesheet/less" scoped lang="less">

  .cells-top {
    margin-top: 0;
  }

  .cell-cur-day {
    color: #484848;
    /*font-size: 14px;*/
    .weui-label {
      text-align: right;
      width: 100%;
    }
    .weui-cell__hd {
      flex: .7;
      padding-right: 10px;
    }
    * {
      vertical-align: middle;
    }
  }

  @baseColor: #1AAD19;
  .weui-icon-checked {
    &:before {
      display: inline-block;
      content: '\EA08';
      color: #09BB07;
      font-size: 16px;
      vertical-align: middle;
    }
    float: right;
    vertical-align: middle;
    height: 1em * 1.41176471;
  }

  .fixed-bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  .noborder() {
    &:before, &:after {
      border: none;
    }
  }

  .cell-all-no-border {
    .noborder();
    * {
      .noborder();
    }
  }

  .weui-btn_primary {
    width: 100%;
  }


</style>
<script>
  import utils from "../utils/common.utils"
  function handlerDayDate($day, record) {
    $day.toggleClass("sign_success", record.success)
    $day.toggleClass("sign_failed", !record.success)
    $day.data("record", record)
  }

  function errorAjax() {
    $.toptip('出错了', 'error');
  }

  function errorAjaxHideLoading() {
    $.hideLoading()
    errorAjax()
  }

  function getMonthShow() {
    return $(".picker-calendar-month-current").data("month") + 0
  }

  function date1Gt2(dateStr1, dateStr2) {
    return new Date(dateStr1).getTime() > new Date(dateStr2).getTime()
  }

  function getCurDateStr() {
    let date = new Date()
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
  }


  export default{
    data(){
      let curDateStr = getCurDateStr();
      return {date: curDateStr, curDate: curDateStr, dateRecord: {}, curDateRecord: {}}
    },
    methods: {
      sign(){
        var vm = this
        $.showLoading("正在签到")
        this.$http.get(utils.getApiPrefix() + 'api/sign', {params: {date: this.date}}).then(function (response) {
          var rs = JSON.parse(response.body)
          if (rs.status == 0) {
            $.toptip("签到成功", "success")
          } else {
            $.modal({
              title: "提示",
              text: "签到失败" + rs.msg || "",
              buttons: [
                {
                  text: "确认", onClick: function () {
                }
                },
                {
                  text: "返回登录", onClick: function () {
                  vm.$router.replace({"name": "login"})
                }
                }
              ]
            });
          }
          $.hideLoading()
          vm.loadMonthData($(".picker-calendar-month-current")[0])
        }, errorAjaxHideLoading)
      },
      loadMonthData(monthContainer){

        var vm = this
        let $monthContainer = $(monthContainer);

        let canSelectDaySelector = "[class='picker-calendar-day']";
        if (!$monthContainer.find(canSelectDaySelector).length) {
          return
        }

        var month = $monthContainer.data("month") + 1
        var year = $monthContainer.data("year")

        var loadShowMonth = getMonthShow() == month

        if (loadShowMonth) {
          $.showLoading("正在加载")
        }


        this.$http.get(utils.getApiPrefix() + 'api/datas', {params: {year, month}}).then(function (response) {
          var records = JSON.parse(response.body).data.records;
          records.forEach(function (record) {
            if (record.signDate == getCurDateStr()) {
              vm.curDateRecord = record
            }
            var date = record.signDate.split("-")
            date[1] = parseInt(date[1]) - 1
            let $day = $monthContainer.find(".picker-calendar-day[data-date='" + date.join("-") + "']");
            handlerDayDate($day, record)
          })
          $.hideLoading()
        }, errorAjaxHideLoading)

      }
    },
    watch: {},
    mounted(){
      var vm = this

      let curDate = getCurDateStr();
      $("#calendar").calendar({
        container: "#calendar",
        input: "#date",
        maxDate: curDate,
//        minDate: curDate,
        onChange(){
//          console.log("onChange:", arguments)
        },
        onDayClick(p, dayContainer, year, month, day){
//          console.log("onDayClick:", arguments)
          //click 多次，只会回调一次
          vm.date = [year, month, day].join("-")
          var record = $(dayContainer).data("record") || {}
//          console.warn(record)
          vm.dateRecord = record
//          console.warn($(dayContainer))
          if ("createTime" in record) {
            $.alert(utils.formatDate(record.createTime) + " " + (record.autoSigned?"自动":"手动") + "签到" + (record.success ? "成功" : "失败") +
              "<br>" + $("<pre>").text(record.logJson)[0].outerHTML)
          } else {
            $.alert(vm.date + " 未签到")
          }
        },
        onMonthAdd(p, monthContainer){
//          console.log("onMonthAdd:", arguments)
          vm.loadMonthData(monthContainer)
        }
      });

    },
    created(){
    },
    computed: {},
    components: {}
  };
</script>
