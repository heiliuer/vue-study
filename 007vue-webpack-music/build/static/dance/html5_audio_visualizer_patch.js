/**
 * Created by Administrator on 2016/3/17 0017.
 */
+function () {
    var ptype = Visualizer.prototype;
    var ori_start = ptype._start;
    ptype._start = function () {
        ori_start.apply(this, arguments);
    };
    ptype.setHandlerBuffer = function (handler) {
        if (!$.isFunction(handler)) {
            handler = null;
        }
        this.handlerBuffer = handler;
    }
    ptype.playAudioSrc = function (src) {
        var audioCtx = this.audioContext;

        if (src == "stop") {
            this._audioEnd(this);
            this.audioBufferSouceNode.stop();
            return;
        }

        if (this.status === 1) {
            //the sound is still playing but we upload another file, so set the forceStop flag to true
            this.forceStop = true;
        }
        ;

        // var source = audioCtx.createBufferSource();
        var request = new XMLHttpRequest();
        var that = this;
        request.open('GET', src, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            var audioData = request.response;
            audioCtx.decodeAudioData(audioData, function (buffer) {
                    // source.buffer = buffer;
                    // source.connect(audioCtx.destination);
                    // source.loop = true;
                    that._updateInfo('Decode succussfully,start the visualizer', true);
                    that._visualize(audioCtx, buffer);
                },
                function (e) {
                    that._updateInfo('!Fail to decode the file', false);
                });

        }

        this.fileName = src;
        request.send();
        this._updateInfo('Starting read audio', true);
    }
}();