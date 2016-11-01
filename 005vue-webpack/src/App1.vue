<template>
    <div>
        <header-component></header-component>
        <div>{{msg}}</div>
        <header-component></header-component>
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
        components:{
            BottomComponent,
            HeaderComponent,
        }
    }

</script>
