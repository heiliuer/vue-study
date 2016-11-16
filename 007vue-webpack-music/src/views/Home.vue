<template>
    <div>
        <header v-title="title" class="bar bar-nav">
            <router-link class="icon iconfont icon-ttpodicon pull-right" :to="{path: '/about'}"></router-link>
            <!--<a @click="showPlayer" class="icon icon-down pull-left"></a>-->
            <h1 class="title">歌曲库</h1>
        </header>

        <div class="content content-home infinite-scroll infinite-scroll-bottom" data-distance="200">
            <div class="buttons-tab">
                <a href="#tab1" class="tab-link active button">搜索</a>
                <a href="#tab2" class="tab-link button">榜单</a>
            </div>
            <div class="tabs">
                <div class="tab active" id="tab1">
                    <router-view name="tab1"></router-view>
                </div>
                <div class="tab" id="tab2">
                    <router-view name="tab2"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .content-home{
        .buttons-tab{
            position: fixed;
            width: 100%;
            z-index: 100;
        }
        .tabs:before{
            content: '';
            display: block;
            width: 100%;
            height: 2rem;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                title:"歌曲库"
            }
        }
    }
</script>
