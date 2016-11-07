<template>
    <div class="bar bar-header-secondary">
        <div class="searchbar">
            <!--<a class="searchbar-cancel">取消</a>-->
            <div class="search-input">
                <label class="icon icon-search" for="search"></label>
                <input type="search" v-model.lazy="key" id="search" placeholder='输入关键字...'/>
                <label @click="clear" v-show="!!key" class="icon icon-remove"></label>
            </div>
        </div>
    </div>

</template>
<style>
    .search-input .icon-remove {
        right: 0.3rem;
        left: auto;
    }
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
            clear(){
                this.key = ""

            },
            refresh(key){
                ROUTER.replace({path: 'home', query: {key: key}})
            }
        }
    }

</script>
