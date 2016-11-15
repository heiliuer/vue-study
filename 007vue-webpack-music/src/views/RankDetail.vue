<template>
    <div>
        <h6 v-if="!songs||songs.length==0" class="text-center text-muted"><!--空--></h6>

        <div class="content infinite-scroll infinite-scroll-bottom" data-distance="200">
            <div>
                <div v-for="song in songs" class="card demo-card-header-pic">
                    <router-link :to="{name: 'player',query:{songId:song.song_id}}" replace>
                        <div class="card-content">
                            <div class="list-block media-list media-list-song">
                                <ul>
                                    <li class="item-content">
                                        <div class="item-media item-action-play">
                                            <i class="iconfont icon-player"></i>
                                        </div>
                                        <div class="item-inner">
                                            <div class="item-title-row">
                                                <div class="item-title" v-text="song.author"></div>
                                            </div>
                                            <div class="item-subtitle" v-text="song.title"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- 加载提示符 -->
            <div class="infinite-scroll-preloader">
                <div class="preloader"></div>
            </div>
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
            return{
                typeName:"",
                songs:[],
                loading:false,

                page:1
            }
        },
        methods:{
            fetch(){
                var tp=this.$route.query.type
                this.typeName=tp.name
                var type=tp.type
                var vm = this
                console.log("mouted")
                console.log(type,tp.typeName)
                if(typeof type!='undefined'){

                    api.getOnline(type,vm.page).then(function(data){
                        console.log("load page ",vm.page)

                        vm.songs=data.song_list||[]
                        vm.page++
                        vm.loading=false
                        $.refreshScroller()

                         // 加载完毕，则注销无限加载事件，以防不必要的加载
                         // $.detachInfiniteScroll($('.infinite-scroll'));
                          // 删除加载提示符
                         // $('.infinite-scroll-preloader').remove();
                    })
                }
            },
            initInfint(){
                    var vm=this;
                    $(document).on('infinite', '.infinite-scroll-bottom',function() {
                        console.log("infinite");
                      // 如果正在加载，则退出
                      if (vm.loading) return;

                      // 设置flag
                      vm.loading = true;


                      vm.fetch()

                  });
            }
        },
        watch:{
            "$route":fetch
        },
        mounted(){
            this.fetch()
            this.initInfint()
        },
         components: {SongList}
    }




</script>
