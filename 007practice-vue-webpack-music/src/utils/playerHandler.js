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
    this.initAudioAnaly()
    handleSinglon = this;
}

var proto = Handler.prototype;

proto.init = function () {
    this._$appVm = this._options.$appVm
    // this._$player = this._$appVm.$refs.player
    this._src = ""
}

proto.setOnFrame = function (func) {
    this._funcs = this._funcs || [];
    this._funcs.push(func)

    if (func) {
        this.render()
    }
}

proto.render = function () {
    var that = this;
    if (!this._rendering && that._funcs && that._funcs.length) {
        that._rendering = true
        function renderFrame() {
            // update data in frequencyData
            that._analyser.getByteFrequencyData(that._frequencyData);
            // render frame based on values in frequencyData
            // console.log(frequencyData)
//            console.log(frequencyData)
            if (that._funcs && that._funcs.length) {
                that._funcs.forEach(function (func) {
                    func(that._frequencyData)
                })
            }
            if (that._rendering) {
                requestAnimationFrame(renderFrame);
            }
        }

        renderFrame()
    }
}

proto.initAudioAnaly = function () {
    var that = this

    this._audio.addEventListener("seeking", function () {
        that._audio2.currentTime = that._audio.currentTime
    });
    this._audio.addEventListener("pause", function () {
        console.log("event pause")
        that._audio2.pause()
        that._rendering = false
    });
    this._audio.addEventListener("play", function () {
        console.log("event play")
        that._audio2.play()
        that.render()
    });


    this._rendering = false
    this._audio2 = new Audio()
    var ctx = new AudioContext();
    let audio = this._audio2;
    var audioSrc = ctx.createMediaElementSource(audio);
    var analyser = ctx.createAnalyser();

    this._analyser = analyser


    // we have to connect the MediaElementSource with the analyser
    audioSrc.connect(analyser);

    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

    // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    this._frequencyData = frequencyData
    // we're ready to receive some data!
    // loop

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
    this._audio2.src = this._src
}

proto.play = function () {
    // this.pause()
    this._audio.play()
    this._audio2.play()
}

proto.pause = function () {
    this._audio.pause()
    this._audio2.pause()
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