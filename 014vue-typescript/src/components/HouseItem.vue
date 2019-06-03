<template>
    <li
        :style="{backgroundImage: 'url('+item.image+')'}"
        class="house-group_item-item"
        :class="{'active': status,'disabled': disabled}"
    >
        <!--        {{ item.num }}-->
    </li>
</template>
<style lang="scss">
    $size: 80px;
    $margin: 10px;
    .house-group_item-item {
        $color: #485bff;

        border-radius: 20px;
        box-shadow: 4px 3px 4px 3px #cccccc;
        display: inline-block;
        width: $size;
        height: $size;
        margin: $margin;
        text-align: center;
        line-height: $size;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 40px;
        transition: .1s linear;
        touch-callout: none;
        user-select: none;
        transition-property: box-shadow, border, transform, opacity;
        background-repeat: no-repeat;
        background-size: contain;

        &.active {
            opacity: .6;
            transform: translate(1px, 1px);
            box-shadow: none;
        }

        &.disabled {
            box-shadow: none;
            /*border: 1px solid #cccccc;*/
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all .2s;
        height: $size + $margin * 2;
        overflow: hidden;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        height: 0;
        transform: translateY(10px);
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { supportsPassive } from '@/util'

    export type TouchStatus = 'start' | 'move' | ''

    export interface TouchActiveEvent {
        item: number
        active: boolean,
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
            const data: TouchActiveEvent = {
                item: this.item,
                active: false,
                timestamp: Date.now()
            }
            this.$emit('touchActiveChange', data)
            // @ts-ignore
            // console.log('touchend touches', event.touches)
        }, supportsPassive ? { passive: true } : false)

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
                active: true,
                timestamp: Date.now()
            }
            this.$emit('touchActiveChange', data)
            // @ts-ignore
            // console.log('touchstart touches', event.touches)
        }, supportsPassive ? { passive: true } : false)
    }
    }
</script>
