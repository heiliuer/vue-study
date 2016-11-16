<template>
    <div class="header">
        {{msg}}
    </div>
</template>
<style>
    .header{
        background-color:#00ff00;
    }

</style>
<script>
    export default{
        data(){
            return{
                msg:'i am header!'
            }
        }
    }

</script>
