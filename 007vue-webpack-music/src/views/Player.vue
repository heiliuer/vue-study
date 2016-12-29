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
                    <h6 class="text-center text-muted" v-text="songinfo.album_title"></h6>
                    <h5 class="text-center">

                    </h5>
                    <!--<div class="img-song" :style="{backgroundImage:bgImg}"></div>-->

                    <div class="comments">
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
                    </div>

                    <div class="audio-wrapper">
                        <audio class="audio-controls" controls="controls" autoplay="autoplay" width="100%"></audio>
                    </div>

                </div>

                <nav class="bar bar-tab bar-player-bottom">
                    <form class="form-comment" @submit="comment" onsubmit="return false">
                        <input v-model="commentContent" type="text" name="" placeholder="说点什么吧" id="">
                    </form>
                    <a class="icon icon-menu" @click="hidePlayer()"></a>
                </nav>
            </div>
        </div>

    </div>
</template>

<style lang="less" rel="stylesheet/less">
    .bar-player-bottom {
        display: flex;
        width: 100%;
        align-items: center;
        .form-comment {
            flex: 1;
            padding: 4px 11px;
            input {
                width: 100%;
                border: none;
                background-color: rgba(255, 255, 255, 0.68);
                padding: 4px;
            }
        }
    }

    .comments {
        background-color: rgba(255, 255, 255, 0.68);
        max-height: 250px;
        overflow: scroll;
        width: 100%;
        overflow-x: hidden;
        padding: 8px;
        > ul {
            -webkit-margin-start: 0;
            -webkit-margin-before: 0;
            list-style: none;
            -webkit-margin-after: 0;
            -webkit-padding-start: 0;
        }
        li.comment {
            color: #111;
            font-size: 13px;
            p{
                -webkit-margin-before: 0em;
                -webkit-margin-after: 0em;
                -webkit-margin-start: 0px;
                -webkit-margin-end: 0px;
                &:first-of-type{
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

    export default{
        data(){
            return {song: {}, commentContent: "", comments: []};
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
            loadSong(query){
                var songId = query.songId
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
                        handler.play()
                        vm.song = song
                    });
                }
            }
        },
        props: ['playerShow'],
        components: {},
        mounted(){
            PlayerHandler.initHandler({
                    $appVm: this.$parent,
                    audio: this.$el.querySelectorAll('audio')[0]
                }
            )

            var vm = this

            if (config.enableSyncCtrl) {
                var syncCtrl = SyncCtrl.init();
                syncCtrl.onmessage(function (event) {
                    var data = event.data
                    if (typeof data == "string") {
                        data = JSON.parse(data)
                    }
                    //console.log("event.data:",event.data);

                    if (data.type == "song") {
                        vm.loadSong(data.data)
                    } else if (data.type == "comments") {
                        vm.comments = data.data;
                    }
                })
            }

            //拦截路由
            //console.log("player mounted");
            ROUTER.beforeEach((to, from, next) => {
//                console.log("player beforeEach");
                if (to.name == "player") {
                    vm.routeIn(to)
                    if (config.enableSyncCtrl) {
                        syncCtrl.send(JSON.stringify({type: "song", data: to.query}))
                    }
                } else {
                    next();
                }
            })
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
        }

        .bar-nav {
            background-color: transparent;
            /*background: -webkit-linear-gradient(rgba(234, 234, 234, 0.4), rgba(234, 234, 234, 0));*/
        }

        .bar-nav .title {
            color: @colorTxt;
        }

        .content .text-muted {
            color: @colorTxt;
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
        position: absolute;
        bottom: 3rem;
        left: 0;
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
