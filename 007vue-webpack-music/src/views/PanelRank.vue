<template>
    <div>
        <div v-for="tp in types" class="card">
            <div class="card-content">
                <div class="list-block media-list">
                    <ul>
                        <router-link class="item-content" :to="{ path: 'rankDetail',query:{'type':tp}}" tag="li" append>
                            <div class="item-media">
                                <img  width="44">
                            </div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title" v-text="tp.name"></div>
                                </div>
                                <!--<div class="item-subtitle" v-text="tp.name"></div>-->
                            </div>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>

    var types=[
            {type:"1",name:"新歌榜"},
            {type:"2",name:"热歌榜"},
            {type:"11",name:"摇滚榜"},
            {type:"12",name:"爵士"},
            {type:"16",name:"流行"},
            {type:"21",name:"欧美金曲榜"},
            {type:"22",name:"经典老歌榜"},
            {type:"23",name:"情歌对唱榜"},
            {type:"24",name:"影视金曲榜"},
            {type:"25",name:"网络歌曲榜"}
        ];
    export default{
        data(){
            return{
                types
            }
        },
        methods:{
        },
        mounted(){
        }
    }













</script>
