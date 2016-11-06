<template>
    <div class="page-group">
        <div class="page" :class="{'page-current':playerShow}">
            <player :player-show="playerShow" ref="player"></player>
        </div>

        <div class="page" :class="{'page-current':!playerShow}">
            <router-view></router-view>
            <!--<bottom-tab v-if="$route.name!='player'"></bottom-tab>-->
        </div>
    </div>
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
