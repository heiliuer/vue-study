<template>
    <div class="page-group">
        <slot></slot>

        <nav class="bar bar-tab bar-tab-status" @click="showPlayer">
            <i class="icon icon-right s_icon_in"></i>
            <div class="s_info">
                <p class="s_title" v-text="songinfo.title||'---'"></p>
                <p class="s_sub-title" v-text="songinfo.album_title||'---'"></p>
            </div>
            <div class="s_img" :style="{backgroundImage:bgImg}"></div>
        </nav>

        <div class="page">
            <div class="player-wrapper">
                <!--磨砂背景 >30px 卡顿-->
                <div class="player-bg" :style="{backgroundImage:bgImg}"></div>

                <header class="bar bar-nav">
                    <h1 class="title" v-text="songinfo.title">></h1>
                </header>

                <div class="content">
                    <h6 class="text-center text-muted sub-title" v-text="songinfo.album_title"></h6>
                    <!--<div class="img-song" :style="{backgroundImage:bgImg}"></div>-->

                    <div class="comments">
                        <div class="dancers" id="dancers"></div>
                        <p class="comments-title">
                            <span>用户：<input maxlength="5" type="text" name="" v-model="user.name"></span>
                            <span>在线 <b v-text="connInfo.size"></b></span>
                            <span class="s_btn" @click="sendOnline">推送</span>
                        </p>
                        <p class="comments-title">
                            <span v-if="onlineSong.user.name">直播: <a href="javascript:void(0)" @click="switchOnline"
                                                                     v-text="onlineSong.name"></a> 来自 <b
                                    v-text="onlineSong.user.name"></b></span>
                            <span v-if="!(onlineSong.user.name)">暂无直播</span>
                        </p>
                        <ul>
                            <li class="comment" v-for="comment in comments">
                                <p>
                                    <span v-text="comment.time"></span>
                                    <span v-text="comment.name"></span>
                                </p>
                                <p>
                                    <span v-text="comment.content"></span>
                                </p>
                            </li>
                        </ul>

                        <div class="audio-wrapper">
                            <audio class="audio-controls" controls="controls" autoplay="autoplay" width="100%"></audio>
                        </div>
                        <form class="form-comment" @submit="comment" onsubmit="return false">
                            <input maxlength="200" v-model="commentContent" type="text" name="" placeholder="说点什么吧"
                                   id="">
                        </form>


                    </div>


                </div>

                <nav class="bar bar-tab bar-player-bottom">
                    <a class="icon icon-menu pull-right" @click="hidePlayer()"></a>
                </nav>
            </div>
        </div>

    </div>
</template>

<style lang="less" rel="stylesheet/less">
    .dancers {
        position: absolute;
        width: 100%;
        text-align: center;
        opacity: 0.3;
        margin-top: 42px;
        box-sizing: border-box;
        padding-bottom: 42px;
        canvas {
        }
    }

    .comments {
        background-color: hsla(0, 0%, 100%, 0.76);
        width: 100%;
        overflow-x: hidden;

        position: absolute;
        bottom: ~'calc(55% - 170px)';

        .comments-title {
            -webkit-margin-before: 0em;
            -webkit-margin-after: 0em;
            font-size: 12px;
            color: #757575;
            padding: 8px;
            background-color: rgba(255, 255, 255, 0.33);
            text-align: center;
            > span {
                display: inline-block;
                margin: 0 5px;
                cursor: pointer;
            }
            input {
                border: 1px solid rgba(169, 169, 169, 0.59);
                background: transparent;
                padding: 2px;
                width: 4em
            }
            &:first-of-type {
                padding-bottom: 0;
            }
        }
        .s_btn:active {
            color: darken(#757575, 50%);
        }
        .form-comment {
            flex: 1;
            padding: 8px;
            background-color: rgba(255, 255, 255, 0.33);
            input {
                width: 100%;
                border: none;
                background-color: rgba(255, 255, 255, 0.68);
                padding: 4px;
                border-radius: 5px;
            }
        }

        > ul {
            padding: 8px;
            height: 180px;
            overflow-y: scroll;
            overflow-x: hidden;
            margin: 0;
            list-style: none;
        }

        li.comment {
            color: #111;
            font-size: 13px;
            p {
                -webkit-margin-before: 0em;
                -webkit-margin-after: 0em;
                -webkit-margin-start: 0px;
                -webkit-margin-end: 0px;
                &:first-of-type {
                    color: #999;
                }
            }
        }
    }

</style>

<script>
    import api from "../utils/api"
    import Vue from "vue"
    import PlayerHandler from "../utils/playerHandler"
    import SyncCtrl from '../utils/SyncCtrl'
    import config from '../config'


    function filterSrc(src) {
        if (src == "") {
            return src
        }
        return src.split("http://yinyueshiting.baidu.com")[1] || src;
    }


    function getBg(url) {
        if (!url) {
            return "none"
        } else {
            return "url('" + url + "')"
        }
    }

    //预加载舞者资源
    function preDownloadSrc(src) {
        $.ajaxSettings.cache = true;
        for (var i in src) {
            $.get(src[i]);
        }
    }

    function initDancer() {
        var SOURCES = {
            rebot: [],
            sb: []
        }
        for (var i = 0; i < 82; i++) {
            SOURCES.rebot.push("/static/dancesrc/rebot/man_" + i + ".png");
        }
        for (var i = 0; i < 51; i++) {
            SOURCES.sb.push("/static/dancesrc/sb/sb" + i + ".jpg");
        }
        preDownloadSrc(SOURCES.rebot);
        preDownloadSrc(SOURCES.sb);

        var dancers = document.getElementById("dancers")

//        var dId = "dancer1";
//        $('<canvas id="' + dId + '" width="100" height="200">').appendTo(dancers)
//        var dancer1 = new Dancer({name: dId, canvasSelector: "#" + dId}).init(SOURCES.rebot).start();


        var dId = "dancer4";
        $('<canvas id="' + dId + '" width="100" height="200">').appendTo(dancers)
        var dancer4 = new Dancer({name: dId, canvasSelector: "#" + dId}).init(SOURCES.sb).start();

        PlayerHandler.getHandler().setOnFrame(function (frequencyData) {
//            dancer1.handlerBuffer(frequencyData)
            dancer4.handlerBuffer(frequencyData)
        })
    }

    export default{
        data(){
            return {
                song: {},
                user: {},
                commentContent: "",
                comments: [],
                connInfo: {},
                onlineSong: {name: "", user: {}}
            };
        },
        computed: {
            songinfo(){
                if (this.song.songinfo) {
                    return this.song.songinfo;
                }
                return {}
            },
            bgImg(){
                return getBg(this.songinfo.pic_big)
            }
        },
        methods: {
            sendOnline(){
                let songOnline = {"songId": this.songinfo.song_id, "name": this.songinfo.title, user: this.user};
                this.onlineSong = songOnline
                SyncCtrl.get().send(JSON.stringify({
                    type: "song",
                    data: songOnline
                }));
            },
            switchOnline(){
                if (this.onlineSong.songId) {
                    this.loadSong(this.onlineSong)
                }
            },
            comment(){
                SyncCtrl.get().send(JSON.stringify({type: "comment", data: {"content": this.commentContent}}));
                this.commentContent = ""
            },
            hidePlayer(){
                this.$parent.playerShow = false
            },
            showPlayer(){
                this.$parent.playerShow = true
            },
            routeIn(to){
                this.loadSong(to.query)
            },
            loadSong(song){
                var songId = song.songId
                if (songId != "") {
                    var vm = this
                    api.getDetail(songId).then(function (song) {
                        var handler = PlayerHandler.getHandler();
//                        console.log("handler.getSong():", handler.getSong());

                        if (!handler.getSong()) {
                            vm.showPlayer()
//                            console.log("showPlayer");
                        }
                        handler.setSong(song)
                        vm.song = song
                        handler.play()
                    });
                }
            },
            scrollCToBottom(){
                let $comments = $(".comments ul");
                this.$nextTick(function () {
                    $comments.scrollTop($comments[0].scrollHeight - $comments.height() + 200)
                })
            }
        },
        props: ['playerShow'],
        components: {},
        watch: {
            "user.name": function () {
                let vm = this
                SyncCtrl.get().send(JSON.stringify({
                    type: "setUser",
                    data: vm.user
                }));
                localStorage.setItem("user", JSON.stringify(vm.user))
            }
        },
        mounted(){
            PlayerHandler.initHandler({
                    $appVm: this.$parent,
                    audio: this.$el.querySelectorAll('audio')[0]
                }
            )

            var vm = this

            vm.user = JSON.parse(localStorage.getItem("user")) || {'name': '' + (Math.floor(Math.random() * 10000))}

            if (config.enableSyncCtrl) {
                var syncCtrl = SyncCtrl.init();
                syncCtrl.onmessage(function (event) {
                    var data = event.data
                    if (typeof data == "string") {
                        data = JSON.parse(data)
                    }
                    //console.log("event.data:",event.data);

                    if (data.type == "song") {
                        console.log(vm.songinfo.song_id, data.data.songId)
                        if (vm.songinfo.song_id != data.data.songId) {
                            vm.loadSong(data.data)
                            console.log("load and play")
                        } else if (!vm.songinfo.song_id) {
                            PlayerHandler.getHandler().play();
                            console.log("play")
                        }
                        vm.onlineSong = data.data
                    } else if (data.type == "comments") {
                        vm.comments = data.data;
                        vm.scrollCToBottom();
                    } else if (data.type == "comment") {
                        vm.comments.push(data.data)
                        vm.scrollCToBottom();
                    } else if (data.type == "connChange") {
                        vm.connInfo = data.data;
                    } else if (data.type == "init") {
                        SyncCtrl.get().send(JSON.stringify({
                            type: "setUser",
                            data: vm.user
                        }));
                    }
                })
            }

            //拦截路由
            //console.log("player mounted");
            ROUTER.beforeEach(function (to, from, next) {
//                console.log("player beforeEach");
                if (to.name == "player") {
                    vm.routeIn(to)
                    if (config.enableSyncCtrl) {
                    }
                } else {
                    next();
                }
            })

            initDancer(vm)

        }
    }


</script>


<style lang="less" rel="stylesheet/less">
    @colorTxt: #dcdcdc;
    .bar-player-bottom {
        background-color: transparent;
        &:before {
            content: none !important;
        }
        .icon {
            @margin: 0.3rem;
            margin: @margin;
            @height: 1.1rem;
            line-height: @height;
            font-size: @height;
            @padding: (2.5rem - @height) / 2 - @margin;
            padding: @padding @padding;
            border-radius: 50%;
            background-color: rgba(251, 251, 251, 0.28);
            color: @colorTxt;
        }
    }

    .audio-controls {
        margin: 0 auto;
        opacity: 0.8;
    }

    .player-wrapper {
        height: 100%;
        position: relative;

        .player-bg {
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            -webkit-filter: blur(10px); /* Chrome, Opera */
            filter: blur(10px);
            &:after {
                content: '';
                height: 100%;
                width: 100%;
                display: inline-block;
                background-color: rgba(0, 0, 0, 0.33);
            }
        }

        .bar-nav {
            background-color: transparent;
            /*background: -webkit-linear-gradient(rgba(234, 234, 234, 0.4), rgba(234, 234, 234, 0));*/
        }

        .bar-nav .title {
            color: @colorTxt;
        }

        .content {
            .text-muted {
                color: @colorTxt;
            }
        }

        .sub-title {
            -webkit-margin-before: 0;
            -webkit-margin-after: 0;
            color: #bdbdbd !important;
        }

        .bar-nav:after {
            content: none;
        }

        .bar-nav .icon {
            color: @colorTxt;
        }

    }

    .audio-wrapper {
        width: 100%;
        text-align: center;
        padding: 8px;
        padding-bottom: 0;
        background-color: hsla(0, 0%, 100%, .33);
        > audio {
            width: 100%;
        }
    }

    @-webkit-keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(361deg);
        }
    }

    .img-song {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        border: none;
        outline: none;
        margin: 0 auto;
    }

    .s_img, .img-song {
        animation: rotation 10s linear infinite;
    }

    .page {
        display: block;
        z-index: 12;

        &.page-current {
            z-index: 13;

            .content {
                padding-bottom: 2.5rem;
            }

        }
    }

    .bar-tab-status {
        position: absolute;
        z-index: 12;

        .s_title, .s_sub-title {
            padding: 0 1rem;
            margin: 0;
        }

        .s_info {
            display: inline-block;
        }

        .s_title {
            font-size: 0.8rem;
            line-height: 1.5rem;
        }

        .s_sub-title {
            font-size: 0.6rem;
            color: #828282;
        }

        .s_img {
            height: 2.3rem;
            width: 2.3rem;
            margin: .1rem .5rem;
            float: left;
            background-size: cover;
            border-radius: 50%;
            display: inline-block;
        }

        .s_icon_in {
            float: right;
            margin-top: 0.15rem;
            margin-right: 0.5rem;
            font-size: 0.6rem;
        }

    }

    .page-current + .bar-tab-status {
        z-index: 15;
    }

</style>
