<template>
    <div class="panel-search">
        <searcher></searcher>
        <song-list :songs="listData.song" :songss="songsMore"></song-list>
    </div>

    <!--<div class="search-content-wrapper">
    <div class="buttons-tab">
        <a href="#tab1" class="tab-link active button">歌曲</a>
        <a href="#tab2" class="tab-link button">专辑</a>
    </div>
    <div class="tabs">
        <div id="tab1" class="tab active">
            <song-list :songs="listData.song"></song-list>
        </div>
        <div id="tab2" class="tab">
            <album-list :albums="listData.album"></album-list>
        </div>
    </div>
    </div>-->
</template>
<script>
    //埋葬冬天
    import SongList from '../components/SongList.vue'
    import AlbumList from '../components/AlbumList.vue'
    import Searcher from '../components/Searcher.vue'
    import api from '../utils/api'
    import PlayerHandler from "../utils/playerHandler"

    export default{
        data(){
            return {
                listData: {
                    album: [],
                    song: []
                },
                songsMore: []
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData(){
                var vm = this;
                var key = vm.$route.query.key
                //console.log("key:",key);

                if (!('key' in vm.$route.query) || key == "") {
                    vm.listData = {}
                    vm.songsMore = []
                } else {
                    api.search(key).then(function (data) {
                        vm.listData = data
                    });
                    api.searchSuggest(key).then(function (data) {
                        function sug(data) {
                            vm.songsMore = data.data.song;
                        }

                        eval(data)
                    })
                }
            },
            showPlayer(){
                PlayerHandler.getHandler().showPlayer()
            }
        },
        mounted(){
            this.fetchData()
        },
        components: {SongList, Searcher, AlbumList}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .panel-search {
        .bar-header-secondary {
            position: static;
        }
    }
</style>