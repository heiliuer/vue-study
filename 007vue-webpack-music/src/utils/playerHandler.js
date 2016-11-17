/**
 * Created by Heiliuer on 2016/11/7 0007.
 */
var handleSinglon;
var OPTIONS_DEFAULTS = {
    audio: ""
}
var Handler = function (options) {
    this._options = Zepto.extend({}, OPTIONS_DEFAULTS, options || {}, true)
    this.init()
    this.initAudio()
    handleSinglon = this;
}

var proto = Handler.prototype;

proto.init = function () {
    this._$appVm = this._options.$appVm
    // this._$player = this._$appVm.$refs.player
    this._src = ""
}

proto.initAudio = function () {
    this._audio = this._options.audio
    if (this._audio == "") {
        this._audio = document.createElement("audio")
        document.body.appendChild(this._audio)
    }
}

proto.setSong = function (song, forceReload) {
    if (this.isSong(song) && !forceReload) {
        return
    }
    this._song = song
    this._src = song.bitrate.file_link
    this.loadSrc()
}

proto.getSong = function () {
    return this._song;
}

proto.loadSrc = function () {
    this.pause()
    this._audio.src = this._src
}

proto.play = function () {
    // this.pause()
    this._audio.play()
}

proto.pause = function () {
    this._audio.pause()
}
proto.isSong = function (song) {
    try {
        return song.songinfo.song_id == this._song.songinfo.song_id;
    } catch (e) {
    }
    return false
}

proto.showPlayer = function () {
    this._$appVm.playerShow = true
}

proto.hidePlayer = function () {
    this._$appVm.playerShow = false
}


proto.getCurrent = function () {

}

export  default {
    initHandler($appVm){
        return new Handler($appVm)
    },
    getHandler(){
        if (!handleSinglon) {
            console.warn("illegal call func getHandler before call func initHandler!");
        }
        return handleSinglon
    }
}