<template>
    <div>
        <header class="bar bar-nav" v-title="title">
            <a @click="ret" href="javascript:void(0)" class="icon icon-left pull-left"></a>

            <h1 class="title">{{title}}</h1>
        </header>
        <div class="content content-padded">
            <h2 class="text-center text-muted">
                悦动
            </h2>

            <h5 class="text-center text-muted"><a
                    href="https://github.com/heiliuer/vue-study/tree/master/007vue-webpack-music">view sources on
                github</a>
            </h5>

            <h5 class="text-center text-muted">© heiliuer 2016</h5>
        </div>
    </div>
</template>
<style>
    .text-muted {
        color: #777;
    }
</style>
<script>
    export default{
        data(){
            return {
                title: '关于'
            }
        },
        methods: {
            ret(){
                ROUTER.go(-1)
            }
        }
    }

</script>
