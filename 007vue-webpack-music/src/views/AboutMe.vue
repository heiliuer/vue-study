<template>
    <div>
        <header class="bar bar-nav" v-title="title">
            <h1 class="title">{{title}}</h1>
        </header>
        <div class="content content-padded">
            <h2 class="text-center">
                悦动
            </h2>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {
                title: '关于'
            }
        }
    }
</script>
