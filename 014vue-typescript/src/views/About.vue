<template>
    <div class="about">
        <ul>
            <li
                v-for="(item,index) in showList"
                :key="index"
                class="item"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    .item {
        position: relative;
        display: inline-block;
        width: 33.3%;
        background-color: #f00;
        border: 1px solid transparent;
        padding-bottom: 100%;
        height: 0;
        box-sizing: border-box;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    interface Item {

    }

    @Component({
        components: {}
    })
    export default class About extends Vue {
        private list: number[]

        constructor() {
            super(...arguments)

            this.list = this.initList()
        }

        private initList(): number[] {
            return Array.apply(0, new Array(300)).map((v, idx) => idx)
        }

        private get showList(): number[] {
            const listLength = this.list.length
            return this.list.slice(listLength - 4, listLength)
        }

        private onItemsComplete() {
            this.list.splice(this.list.length - 1, 1)
        }
    }
</script>
