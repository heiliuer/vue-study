<template>
    <div class="bar bar-header-secondary">
        <div class="searchbar">
            <!--<a class="searchbar-cancel">取消</a>-->
            <div class="search-input">
                <label class="icon icon-search" for="search"></label>
                <input type="search" v-model.lazy="key" id="search" placeholder='输入关键字...'/>
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
                key: ''
            }
        },
        mounted(){
            this.key = this.$route.query.key || ""
        },
        watch: {
            'key': 'refresh'
        },
        methods: {
            refresh(key){
                ROUTER.replace({path: 'home', query: {key: key}})
            }
        }
    }

</script>
