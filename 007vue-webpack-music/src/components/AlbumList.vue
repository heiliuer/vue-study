<template>
    <div>
        <!--<div class="content-block-title">专辑列表</div>-->

        <h6 v-if="!albums||albums.length==0" class="text-center text-muted"><!--空--></h6>
        <div v-for="album in albums" class="card">
            <div class="card-content">
                <div class="list-block media-list">
                    <ul>
                        <li class="item-content">
                            <div class="item-media">
                                <img :src="album.artistpic" width="44">
                            </div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title" v-text="album.albumname"></div>
                                </div>
                                <div class="item-subtitle" v-text="album.artistname"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
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
        props: ['albums'],
        created(){
        }
    }
</script>
