<template>
    <div>
        <!--<div class="content-block-title">歌曲列表</div>-->

        <h6 v-if="!songs||songs.length==0" class="text-center text-muted"><!--空--></h6>

        <div v-for="song in songs" class="card demo-card-header-pic">
            <router-link :to="{name: 'player',query:{songId:song.songid}}" replace>
                <div class="card-content">
                    <div class="list-block media-list media-list-song">
                        <ul>
                            <li class="item-content">
                                <div class="item-media item-action-play">
                                    <i class="iconfont icon-player"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title" v-text="song.artistname"></div>
                                    </div>
                                    <div class="item-subtitle" v-text="song.songname"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<style lang="less">
    .item-action-play {
        .iconfont {
            width: 1rem;
            font-size: 1.3rem;
        }
    }

    .media-list-song {
        color: #5f646e;
    }
</style>
<script>
    export default{
        data(){
            return {}
        },
        props: ['songs']
    }
</script>
