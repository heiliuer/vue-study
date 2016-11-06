<template>
    <div>
        <!--<div class="content-block-title">歌曲列表</div>-->

        <h6 v-if="!songs||songs.length==0" class="text-center text-muted">空</h6>

        <div v-for="song in songs" class="card demo-card-header-pic">
            <router-link :to="{name: 'player',query:{songId:song.songid}}" replace>
                <div class="card-content">
                    <div class="list-block media-list">
                        <ul>
                            <li class="item-content">
                                <!-- <div class="item-media">
                                     <img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"
                                          width="44">
                                 </div>-->
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
<style>
</style>
<script>
    export default{
        data(){
            return {}
        },
        props: ['songs'],
        created(){
        }
    }
</script>
