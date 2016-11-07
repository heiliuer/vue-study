<template>
    <div class="page-group">
        <slot></slot>

        <!-- 工具栏 -->
        <nav class="bar bar-tab bar-tab-status" @click="showPlayer">
            <p class="s_title" v-text="songinfo.title"></p>
            <p class="s_sub-title" v-text="songinfo.album_title"></p>
        </nav>

        <div class="page">
            <div class="player-wrapper">
                <!--磨砂背景卡顿-->
                <div class="player-bg" :style="{backgroundImage:bgImg}"></div>

                <header class="bar bar-nav">
                    <h1 class="title" v-text="songinfo.title">></h1>
                </header>

                <div class="content">
                    <h6 class="text-center text-muted" v-text="songinfo.album_title"></h6>
                    <h5 class="text-center">

                    </h5>
                    <div class="img-song" :style="{backgroundImage:bgImg}"></div>


                    <div class="audio-wrapper">
                        <audio class="audio-controls" controls="controls" autoplay="autoplay" width="100%"></audio>
                    </div>

                </div>

                <nav class="bar bar-tab bar-player-bottom">
                    <a class="icon icon-menu pull-right" @click="hidePlayer()"></a>
                </nav>

            </div>
        </div>

    </div>
</template>
<style lang="less">
    @colorTxt: #dcdcdc;
    .bar-player-bottom {
        background-color: transparent;
        &:before {
            content: none !important;
        }

        .icon {
            @height: 1.1rem;
            line-height: @height;
            font-size: @height;
            padding: (2.5 - @height)/2rem 1rem;
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
        bottom: 5rem;
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
        animation: rotation 10s linear infinite;
        -moz-animation: rotation 10s linear infinite;
        -webkit-animation: rotation 10s linear infinite;
        -o-animation: rotation 10s linear infinite;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        border: none;
        outline: none;
        margin: 0 auto;
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
        .s_title {
            font-size: 0.8rem;
            margin-top: 0.3rem;
        }
        .s_sub-title {
            font-size: 0.6rem;
            color: #828282;
        }
    }

    .page-current + .bar-tab-status {
        z-index: 15;
    }

</style>
<script>
    import api from "../utils/api"
    import Vue from "vue"
    import PlayerHandler from "../utils/playerHandler"
    function filterSrc(src) {
        if (src == "") {
            return src
        }
        return src.split("http://yinyueshiting.baidu.com")[1] || src;
    }

    function getBg(url) {
        if (url == "") {
            return "none"
        } else {
            return "url('" + url + "')"
        }
    }

    export default{
        data(){
            return {song: {}}
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
                        console.log("handler.getSong():", handler.getSong());

                        if (!handler.getSong()) {
                            vm.showPlayer()
                            console.log("showPlayer");
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
            );
            //拦截路由
            var vm = this;
            console.log("player mounted");
            ROUTER.beforeEach((to, from, next) => {
                console.log("player beforeEach");
                if (to.name == "player") {
                    vm.routeIn(to)
                } else {
                    next();
                }
            })
        }
    }




</script>
