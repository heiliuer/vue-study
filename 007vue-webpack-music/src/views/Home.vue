<template>
    <div>
        <header class="bar bar-nav">
            <router-link class="icon iconfont icon-ttpodicon pull-right" :to="{path: '/about'}"></router-link>
            <!--<a @click="showPlayer" class="icon icon-down pull-left"></a>-->
            <h1 class="title">播放列表</h1>
        </header>

        <div class="content">

            <div class="search-content-wrapper">
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
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {
                title: '主页',
            }
        }
    }




</script>
