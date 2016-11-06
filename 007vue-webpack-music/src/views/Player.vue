<template>
    <div class="player-wrapper">
        <!--磨砂背景卡顿-->

        <div class="player-bg" :style="{backgroundImage:bgImg}"></div>

        <header class="bar bar-nav">
            <a class="icon icon-left pull-left" @click="hidePlayer()"></a>
            <h1 class="title" v-text="songinfo.title">></h1>
        </header>
        <div class="content">
            <h6 class="text-center text-muted" v-text="songinfo.album_title"></h6>
            <h5 class="text-center"><img class="img-song" :src="songinfo.pic_big" alt=""/></h5>
            <div class="audio-wrapper">
                <audio class="audio-controls" controls="controls" autoplay="autoplay" width="100%"></audio>
            </div>
        </div>
    </div>
</template>
<style>
    .audio-controls {
        margin: 0 auto;
        opacity: 0.8;
    }

    .player-wrapper {
        height: 100%;
        position: relative;
    }

    .player-wrapper .player-bg {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        -webkit-filter: blur(10px); /* Chrome, Opera */
        filter: blur(10px);

    }

    .player-wrapper .bar-nav {
        background: -webkit-linear-gradient(rgba(234, 234, 234, 0.4), rgba(234, 234, 234, 0));
    }

    .player-wrapper .bar-nav .title {
        color: #dcdcdc;
    }

    .player-wrapper .content .text-muted {
        color: #dcdcdc;

    }

    .player-wrapper .bar-nav:after {
        content: none;
    }

    .player-wrapper .bar-nav .icon {
        color: #dcdcdc;
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
    }

    .img-song {
        width: 10rem;
        height: 10rem;

        border-radius: 50%;
        border: none;
        outline: none;

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
                var url = this.songinfo.pic_big
                if (url == "") {
                    return "none"
                } else {
                    return "url('" + url + "')"
                }
            }
        },
        methods: {
            hidePlayer(){
                this.$parent.playerShow = false
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
