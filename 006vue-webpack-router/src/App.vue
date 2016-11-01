<template>
    <div>
        <router-link to="/about">Go to About</router-link>
        <header-component></header-component>
        <div>{{msg}}</div>
        <bottom-component></bottom-component>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    import BottomComponent from './Bottom.vue'
    import HeaderComponent from './Header.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        ready(){
            console.log("ready  11");
        },

        components:{
            BottomComponent,
            HeaderComponent,
        },
        template:"h1"

    }

</script>
