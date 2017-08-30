/**
 * Created by Administrator on 2016/11/17.
 */
var singleon;

var OPTIONS_DEFAULT = {}

var SyncCtrl = function (options) {
    this._options = Zepto.extend({}, OPTIONS_DEFAULT, options || {}, true)
    this.connecting = false
    this.init()
    this.initSocket()
    singleon = this
    this.messageHandlers = []
}

var proto = SyncCtrl.prototype

proto.init = function () {
}

proto.initSocket = function () {
    var that = this
    var url = "ws://" + location.hostname + ":" + location.port+"/sync";
    var mSocket = new WebSocket(url, "echo-protocol");
    this.mSocket=mSocket;
    mSocket.onopen = function (event) {
        that.connecting = true
        // mSocket.send("亲爱的服务器！我连上你啦！");
    };

    mSocket.onclose = function () {
        that.connecting = false
        //console.log("close");
    }

    mSocket.onmessage = function (event) {
        //console.log("receive:",event.data);
        that.messageHandlers.forEach(function (handler) {
            handler.call(that, event);
        })
    }
}

proto.onmessage = function (func) {
    if ($.isFunction(func)) {
        this.messageHandlers.push(func)
    }
}

proto.send = function (str) {
    if (this.connecting) {
        this.mSocket.send(str);
        //console.log("send str:",str);
    }else{
        console.warn("send str:",str,"but connecting is false");
    }
}

export  default {
    init(options){
        return new SyncCtrl(options)
    },
    get(){
        if (!singleon) {
            console.warn("illegal call func get before call func init!");
        }
        return singleon
    }
}