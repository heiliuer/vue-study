<template>
    <player :player-show="playerShow" ref="player">
        <div class="page" :class="{'page-current':!playerShow}">
            <router-view></router-view>
        </div>
    </player>
</template>
<style>
    .text-muted {
        color: #777;
        font-weight: normal;
    }
    .card:active{
        opacity: 0.5;
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
        }
    }
</script>
