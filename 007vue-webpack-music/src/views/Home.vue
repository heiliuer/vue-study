<template>
    <div v-title="title">
        <header class="bar bar-nav">
            <router-link class="icon icon-settings pull-right" :to="{path: '/about'}"></router-link>
            <!--<a @click="showPlayer" class="icon icon-down pull-left"></a>-->
            <h1 class="title">播放列表</h1>
        </header>
        <searcher></searcher>
        <div class="content">
            <div class="search-content-wrapper">
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
            </div>
        </div>
    </div>
</template>
<style>
    .search-content-wrapper {
        /*padding: 2.5rem 0;*/
    }
</style>
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
                title: '主页',
                listData: {
                    album: [],
                    song: []
                }
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
                if (key == "") {
                    vm.listData = {}
                } else {
                    api.search(key).then(function (data) {
                        vm.listData = data
                    });
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
