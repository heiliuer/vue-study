/**
 * Created by heiliuer on 2016/3/17 0017.
 */
var Dancer = function (options) {
    this.options = $.extend(true, {}, Dancer.OPTIONS, options || {});
    this.src = [];
    this.params = this.options.params;
};

Dancer.OPTIONS = {
    canvasSelector: "#dancer",
    params: {
        minTimer: 16,//静态值，最高fps，要根据舞蹈资源而定，60fps=16ms, 12fps=83ms
        maxTimer: 83,//静态值，最低fps
        maxRange: 1,//静态值,帧活动最大范围=舞蹈资源帧数
        minRange: 5,//静态值,帧活动最小范围=与舞蹈资源有关
        energyCountRange: 200,//静态值,计算最大最小频率的区间
        meterNum: 800 / (10 + 2),//静态值,count of the meters
        inVector: [0.5, 0.2, 0.2, 0.2],//静态值,fps增量计算的权重向量[k1*maxE+k2&minE+k3*xE+k4*E]
        hnVector: [0.2, 0.1, 0.6, 0.1],//静态值,活动帧范围计算的权重向量[k1*maxE+k2&minE+k3*xE+k4*E]
        rnVector: [0.2, 0.4, 0.1, 0.3],//静态值,动作反复概率计算的权重向量[k1*maxE+k2&minE+k3*xE+k4*E]

        timer: 16,//动态值 minTimer<~<maxTimer
        range: 1,//动态值,帧活动范围0<~<maxRange
        repeat: 0.3,//动态值，动作反复概率 0<~<1
    },
    name: "dancer"
};

Dancer.prototype = {
    init: function (src) {
        this.src = src;
        //从第一帧开始
        this.index = 0;
        this.prior = true;

        //计算能量权重
        this.energyAllWeight = 0;
        for (var i = 0; i < this.params.meterNum; i++) {
            this.energyAllWeight += this.getEnergyWeight(i);//权重斜率函数
        }

        //根据资源分析 帧最大/最小活动范围
        this.options.params.maxRange = src.length;
        this.options.params.minRange = Math.max(Math.floor(src.length * 0.1), 5);

        this.lastBufferTime=0;
        return this;
    },
    start: function () {
        var that = this;
        var c = $(this.options.canvasSelector)[0];
        var ctx = c.getContext("2d");
        var img = new Image();
        img.src = this.src[this.index];
        img.addEventListener('load', function () {
            //console.log("draw index:",img.src);
            ctx.clearRect(0, 0, c.width, c.height);
            var dparams=that.getImgDest(img,c);
            ctx.drawImage(img, 0, 0, img.width, img.height,dparams.dx,dparams.dy,dparams.dWidth,dparams.dHeight);
            setTimeout(function () {
                if(that.isBufferSuppying()){
                    that._next();
                }
                img.src = that.src[that.index];
            }, that.params.timer);
        }, false);
        return this;
    },
    getImgDest: function (rect, canvas) {
        var wTh = rect.width / rect.height;
        var cwTh = canvas.width / canvas.height;
        var rs = {
            dWidth: canvas.width,
            dHeight: canvas.height,
            dx: 0,
            dy: 0
        };
        if (wTh > cwTh) {
            rs.dHeight = rs.dWidth / wTh;
            rs.dy = (canvas.height - rs.dHeight) / 2;
        } else {
            rs.dWidth = rs.dHeight * wTh;
            rs.dx = (canvas.width - rs.dWidth) / 2;
        }
        return rs;
    },
    _next: function () {

        //动作反复概率
        //if(Math.random()<this.params.repeat){
        //    //this.prior=!this.prior;
        //}

        this._repeatFCount = this._repeatFCount || 0;

        this._repeatFCount++;

        if (this._repeatFCount >= this.options.params.range) {
            this._repeatFCount = 0;
            this.prior = !this.prior;
        }


        //防止从最后一帧跳到第一帧的视觉落差
        if (this.index >= this.src.length - 1) {
            this.prior = false;
        } else if (this.index <= 0) {
            this.prior = true;
        }
        this.prior ? this.index++ : this.index--;


    },
    getEnergyWeight: function (freIndex) {
        return freIndex * 3 + 3;
    },
    //检测是否有音频数据在输入
    isBufferSuppying:function () {
        return (new Date().getTime()-this.lastBufferTime)<600;
    },
    handlerBuffer: function (buffer) {
        this.lastBufferTime=new Date().getTime();
        var meterNum = this.params.meterNum;

        // 削减频率数据量 计算能量（量化1）
        var step = Math.round(buffer.length / meterNum); //sample limited data from the total array
        var cuttedBuffer = [];
        this.energy = this.energy || 0;
        var energy = 0;
        for (var i = 0; i < meterNum; i++) {
            var freV = buffer[i * step];//0<~<255
            cuttedBuffer.push(freV);
            energy += this.getEnergyWeight(i) * freV;
        }
        energy = energy / 255 / this.energyAllWeight / 0.5;
        this.energy = energy;
        //console.log("energy:",energy);
        $("#energy").val(energy * 1000);
        $("#energy_val").text(parseInt(energy * 100));
        //console.log(this.options.name, " cuttedBuffer:", cuttedBuffer);

        this.analyzeEnergy(energy);

        this.directDancer();

        return this;
    },
    //指导舞者
    directDancer: function () {
        var pa = this.options.params;

        var eVector = [this.energyMax, this.energyMin, 1 - (this.energyMax - this.energyMin), this.energy];
        this._in = this.calVector(pa.inVector, eVector);//fps大小

        eVector = [this.energyMax, this.energyMin, 1 - (this.energyMax - this.energyMin), this.energy];
        this._hn = 1 - this.calVector(pa.hnVector, eVector);//最大活动帧范围大小

        eVector = [this.energyMax, this.energyMin, 1 - (this.energyMax - this.energyMin), this.energy];
        this._rn = this.calVector(pa.rnVector, eVector);//动作反复概率大小

        $("#_in").val(this._in * 1000);
        $("#_hn").val(this._hn * 1000);
        $("#_rn").val(this._rn * 1000);
        //console.log(this._in,this._hn,this._rn);

        pa.timer = (pa.maxTimer - pa.minTimer) * (1 - this._in) + pa.minTimer;

        pa.range = (pa.maxRange - pa.minRange) * this._hn + pa.minRange;

        pa.repeat = this._rn;

    }
    , analyzeEnergy: function (energy) {
        this.energyCount = this.energyCount || 0;

        if (this.energyCount == 0) {
            this.energyMax = 0;
            this.energyMin = 1;
        }

        //计算能量最高与最低的间隔
        if (energy > this.energyMax) {
            this.energyMax = energy;
        }
        if (energy < this.energyMin) {
            this.energyMin = energy;
        }

        this.energyCount++;

        if (this.energyCount == this.options.params.energyCountRange) {
            this.energyCount = 0;
        }
    },
    calVector: function (V1, V2) {
        var r = 0;
        for (var i in V1) {
            r += (V1[i] * V2[i]);
        }
        return r;
    }
    ,
    getBufferHandler: function () {
        var that = this;
        return function (array) {
            that.handlerBuffer(array);
        }
    }
    ,
    setTimerIncrement: function (increment) {
        this.params.timer = this.params.minTimer + parseInt(increment);
        //console.log(this.timer);
    }
}
;