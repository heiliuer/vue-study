<template>
    <player :player-show="playerShow" ref="player">
        <div class="page" :class="{'page-current':!playerShow}">
            <router-view></router-view>
            <!--<bottom-tab v-if="$route.name!='player'"></bottom-tab>-->
        </div>
    </player>
</template>
<style>
    .text-muted {
        color: #777;
        font-weight: normal;
    }
</style>
<script>
    import BottomTab from './components/BottomTab.vue'
    import Player from './views/Player.vue'

    export default{
        data(){
            return {playerShow: false}
        },
        components: {
            BottomTab, Player
        },
        methods: {},
        mounted(){
        }
    }
</script>
