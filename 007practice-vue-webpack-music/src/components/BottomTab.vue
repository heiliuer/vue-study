<template>

    <!-- 工具栏 -->
    <nav class="bar bar-tab">
        <tab path='/home' label='首页' icon='home'></tab>
        <tab path='/about' label='关于' icon='settings'></tab>
    </nav>

</template>
<style>
</style>
<script>
    import Tab from './Tab.vue'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
            Tab

        }
    }
</script>
