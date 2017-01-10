/**
 * Created by Administrator on 2016/3/17 0017.
 */

//预加载舞者资源
function preDownloadSrc(src) {
    $.ajaxSettings.cache = true;
    for (var i in src) {
        $.get(src[i]);
    }
}
var SOURCES = {
    rebot: [],
    sb: []
}
for (var i = 0; i < 82; i++) {
    SOURCES.rebot.push("dancesrc/rebot/man_" + i + ".png");
}
for (var i = 0; i < 51; i++) {
    SOURCES.sb.push("dancesrc/sb/sb" + i + ".jpg");
}
preDownloadSrc(SOURCES.rebot);
preDownloadSrc(SOURCES.sb);

$.get("music/fade.mp3");

//初始化visualizer和dancers
var visualizer = new Visualizer();
visualizer.ini();


var selector = document.getElementById("audioSelect");
selector.onchange = function () {
    if (selector.value) {
        visualizer.playAudioSrc(selector.value);
    }
}


var dancer1 = new Dancer({name: "dancer1", canvasSelector: "#dancer1"}).init(SOURCES.rebot).start();
var dancer2 = new Dancer({name: "dancer2", canvasSelector: "#dancer2"}).init(SOURCES.rebot).start();
var dancer3 = new Dancer({name: "dancer3", canvasSelector: "#dancer3"}).init(SOURCES.rebot).start();
var dancer4 = new Dancer({name: "dancer4", canvasSelector: "#dancer4"}).init(SOURCES.sb).start();
var dancer5 = new Dancer({name: "dancer5", canvasSelector: "#dancer5"}).init(SOURCES.sb).start();
var dancer6 = new Dancer({name: "dancer6", canvasSelector: "#dancer6"}).init(SOURCES.sb).start();

visualizer.setHandlerBuffer(function (buffer) {
    dancer1.handlerBuffer(buffer);

    console.log("send data");


    //console.log(dancer1.energyMax,dancer1.energyMin);
    $("#maxEnergy").val(dancer1.energyMax * 1000);
    $("#minEnergy").val(dancer1.energyMin * 1000);

    dancer2.handlerBuffer(buffer);
    dancer3.handlerBuffer(buffer);
    dancer4.handlerBuffer(buffer);
    dancer5.handlerBuffer(buffer);
    dancer6.handlerBuffer(buffer);
});


//手动控制参数
var $timer = $("#timer").change(function () {
    dancer1.setTimerIncrement($timer.val());
    dancer2.setTimerIncrement($timer.val());
    dancer3.setTimerIncrement($timer.val());
    dancer4.setTimerIncrement($timer.val());
    dancer5.setTimerIncrement($timer.val());
    dancer6.setTimerIncrement($timer.val());
});

var $progress = $("#progress").change(function () {
    visualizer.getAudioBufferSouceNode().start($progress.val());
});



