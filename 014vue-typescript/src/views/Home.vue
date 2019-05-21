<template>
    <div class="home">
        <div class="house-group_wrap">
            <ul class="house-group">
                <transition-group name="list" tag="li">
                    <HouseGroupItem v-for="(items, itemsIndex) in showList" :key="items._index"
                                    :disabled="itemsIndex!=showList.length-1"
                                    @complete="onItemsComplete(itemsIndex)" :items="items"></HouseGroupItem>
                </transition-group>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
    .home {
        width: 100%;
        height: 100%;
    }

    .house-group_wrap {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;

        &:after {
            content: "";
            display: inline-block;
            width: 100%;
            height: 120px;
            background-color: #eaeaea;
            position: absolute;
            bottom: 87px;
            left: 0;
            z-index: 0;
        }
    }

    .house-group {
        position: absolute;
        width: 100%;
        bottom: 100px;
        left: 0;
        z-index: 1;
    }

    .list-enter-active, .list-leave-active {
        transition: all .2s;
        height: 120px;
        overflow: hidden;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        height: 0;
        transform: translateX(30px);
    }
</style>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

import HouseGroupItem from '../components/HouseGroupItem.vue'

@Component({
    components: {
        HouseGroupItem,
    },
})
export default class Home extends Vue {
    private list: number[][]

    constructor() {
        super(...arguments)

        this.list = this.initList()
    }

    private initList(): number[][] {
        let refIndex = 1
        const list = Array.apply(0, new Array(200)).map((value, index) => {
            const length = Math.ceil(Math.random() * 3)
            refIndex += length
            const result: number[] = Array.apply(0, new Array(length)).map((value2, index2) => {
                return refIndex - (length - index2)
            })
            // @ts-ignore
            result._index = index
            return result
        })
        return list.reverse()
    }

    private get showList(): number[][] {
        const listLength = this.list.length
        return this.list.slice(listLength - 10, listLength)
    }

    private onItemsComplete() {
        this.list.splice(this.list.length - 1, 1)
    }
}
</script>
