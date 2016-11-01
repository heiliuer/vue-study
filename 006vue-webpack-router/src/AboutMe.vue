<template>
    <div class="bottom">
        <router-link to="/">Go to Home</router-link>
        <div>{{msg}}</div>
    </div>
</template>
<style>
    .bottom{
        background-color:#222;
    }

</style>
<script>
//编辑 js 代码 才会触发watch

    export default{
        data(){
            return{
                msg:'create by Heiliuer!'
            }
        }
    }

</script>
