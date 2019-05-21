<template>
    <li class="house-group_item-item"
        :class="{'active':status,'disabled':disabled}"
    >
        {{item}}
    </li>
</template>
<style lang="scss">
    .house-group_item-item {
        $color: #485bff;
        $size: 80px;
        border-radius: 20px;
        box-shadow: 4px 3px 4px 3px lighten($color, 12%);
        /*border: 1px solid $color;*/
        display: inline-block;
        width: $size;
        height: $size;
        margin: 10px;
        text-align: center;
        line-height: $size;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 40px;
        transition: .3s ease-in;
        touch-callout: none;
        user-select: none;
        transition-property: box-shadow, border;

        &.active {
            background-color: lighten($color, 20%);
        }

        &.disabled {
            box-shadow: none;
            border: 1px solid lighten($color, 12%);
        }
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {supportsPassive} from '@/util'

    export type TouchStatus = 'start' | 'move' | ''

    export interface TouchActiveEvent {
        item: number
        timestamp: number
    }

    @Component
    export default class HouseItem extends Vue {
        @Prop() private item!: number

        @Prop() private disabled!: boolean

        private status: TouchStatus = ''

        public mounted() {
            this.bindEvent()
        }

        private bindEvent() {
            const el = this.$el
            el.addEventListener('touchend', (event) => {
                if (this.disabled) {
                    return
                }
                this.status = ''
                // @ts-ignore
                // console.log('touchend touches', event.touches)
            }, supportsPassive ? {passive: true} : false)

            // el.addEventListener('touchmove', event => {
            //     if (this.disabled) {
            //         return
            //     }
            //     event.preventDefault();
            //     this.status = 'move'
            //     console.log('touchmove touches', event.touches)
            // });

            el.addEventListener('touchstart', (event) => {
                if (this.disabled) {
                    return
                }
                this.status = 'start'
                this.$forceUpdate()
                const data: TouchActiveEvent = {
                    item: this.item,
                    timestamp: Date.now()
                }
                this.$emit('touchActive', data)
                // @ts-ignore
                // console.log('touchstart touches', event.touches)
            }, supportsPassive ? {passive: true} : false)
        }

    }
</script>
