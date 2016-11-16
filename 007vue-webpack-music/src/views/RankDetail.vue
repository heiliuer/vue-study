<template>
    <div>
        <h6 v-if="!songs||songs.length==0" class="text-center text-muted"><!--空--></h6>
        <div v-for="song in songs" track-by="song_id" class="card">
            <div class="card-content">
                <div class="list-block media-list">
                    <ul>
                        <router-link class="item-content" :to="{name: 'player',query:{songId:song.song_id}}" append>
                            <div class="item-media">
                                <img width="44" :src="song.pic_big">
                            </div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title" v-text="song.title"></div>
                                </div>
                                <div class="item-subtitle" v-text="song.author"></div>
                            </div>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader" v-show="hasMore">
            <div class="preloader"></div>
        </div>

    </div>
</template>
<style>
</style>
<script>
    import api from '../utils/api'
    import SongList from '../components/SongList.vue'
    export default{
        data(){
            return {
                typeName: "",
                songs: [],
                loading: false,
                page: 1,
                hasMore:true
            }
        },
        methods: {
            fetch(){
                var query = this.$route.query;
                this.typeName = query.name
                var type = query.type
                var vm = this
                console.log(type, this.typeName)
                vm.loading = true;
                if (typeof type != 'undefined') {
                    api.getOnline(type, vm.page).then(function (data) {
                        console.log("load page ", vm.page)
                        vm.hasMore=!!(data.song_list || []).length
                        vm.songs=vm.songs.concat(data.song_list || [])
//                        vm.songs = data.song_list || []
                        vm.page++
                        vm.loading = false
                        $.refreshScroller()
                        if(!vm.hasMore){
                            $.detachInfiniteScroll($('.infinite-scroll'))
                            $('.infinite-scroll-preloader').remove()
                        }
                    })
                }
            },
            initInfint(){
                var vm = this;
                console.log("initInfint")
                $(document).on('infinite', '.infinite-scroll-bottom', function () {
                    console.log("infinite");
                    // 如果正在加载，则退出
                    if (vm.loading) return;
                    // 设置flag
                    vm.fetch()
                });
            }
        },
        watch: {
            "$route": fetch
        },
        mounted(){
            this.fetch()
            this.initInfint()
        },
        components: {SongList}
    }


</script>
