<template>
  <div class="panel-login">
    <div class="weui-cells weui-cells_form cells-no-border">

      <div class="weui-cell cell-logo">

      </div>
      <div class="weui-cell cell-no-top-border">
        <div class="weui-cell__hd"><label class="weui-label">学号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="userid" type="number" pattern="[0-9]*" placeholder="学号">
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">密码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="userkey" type="password" placeholder="密码">
        </div>
      </div>

      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__bd"><label for="auto_sign">自动签到</label></div>
        <div class="weui-cell__ft">
          <label for="auto_sign" class="weui-switch-cp">
            <input @click="setAutoSign" v-model="autoSign" id="auto_sign" class="weui-switch-cp__input" type="checkbox">
            <div class="weui-switch-cp__box"></div>
          </label>
        </div>
      </div>

      <div class="weui-btn-area">
        <a @click="login" class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':!cansubmit}"
           href="javascript:">登录</a>
      </div>

    </div>
  </div>
</template>
<style scoped rel="stylesheet/less" scoped lang="less">
  .panel-login {
    margin-top: 10px;
  }

  @label_color: #656565;

  .weui-cell_switch {
    .weui-cell__bd {
      width: 5em;
      color: @label_color;
      flex: inherit;
    }
  }

  .cell-logo {
    background-image: url("../assets/logo.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 100px;
    margin: 50px 0;
  }

  .cells-no-border {
    &:before, &:after {
      border: none;
    }
  }

  .cell-no-top-border {
    &:before {
      border: none;
    }
  }

  .weui-label {
    width: 5em;
    color: @label_color;
  }
</style>
<script>
  import utils from "../utils/common.utils"
  let key_split = "###"

  let storage_login_id_and_key = "login_idAndKey";

  function errorAjax() {
    $.toptip('出错了', 'error');
  }
  function errorAjaxHideLoading() {
    $.hideLoading()
    errorAjax()
  }
  export default{
    data(){
      return {
        userid: "",
        userkey: "",
        autoSign: true
      }
    },
    methods: {
      setAutoSign(){
      },
      login () {
        if (this.cansubmit) {
          var vm = this
          let params = {
            userid: this.userid,
            userkey: this.userkey
          }
          $.showLoading("正在登录")
          this.$http.get(utils.getApiPrefix() + 'api/login', {params: params}).then(function (response) {
            var rs = JSON.parse(response.body)
            if (rs.status == 0) {
              vm.$router.replace({"name": "home"})
            } else {
              $.alert(rs.msg || "", "登录失败");
            }
            $.hideLoading()
          }, errorAjaxHideLoading);
        }
        window.localStorage.setItem(storage_login_id_and_key, this.storageKey)
      }
    },
    computed: {
      cansubmit: function () {
        return this.userid != "" && this.userkey != ""
      },
      storageKey(){
        return this.userid + key_split + this.userkey
      }
    },
    watch: {},
    created() {
      let idAndKey = (window.localStorage.getItem(storage_login_id_and_key) || key_split).split(key_split)
      this.userid = idAndKey[0]
      this.userkey = idAndKey[1]
    },
    mounted(){
      var vm = this
      $.showLoading("正在加载")

      function setAutoSign(){
        vm.$watch("autoSign",function (autoSign) {
          $.showLoading("正在加载")
          var params = {
            name: "autoSign",
            value: autoSign
          }
          this.$http.get(utils.getApiPrefix() + 'api/setConfig', {params}).then(function (response) {
            $.hideLoading()
          }, errorAjaxHideLoading);
        })
      }

      this.$http.get(utils.getApiPrefix() + 'api/getConfigs').then(function (response) {
        var rs = JSON.parse(response.body)
        window.CONFIGS = rs.data
        vm.autoSign = rs.data.autoSign
        $.hideLoading()
        setAutoSign()
      }, function () {
        setAutoSign()
        errorAjaxHideLoading()
      });

    },
    components: {}
  }

</script>
