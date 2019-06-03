<template>
    <div class="home">
        <div class="house-group_wrap">
            <transition-group
                name="list"
                class="house-group"
                tag="div"
            >
                <HouseGroupItem
                    v-for="(item, itemsIndex) in showList"
                    :key="item.index"
                    :disabled="itemsIndex!==showList.length-1"
                    :items="item.items"
                    @complete="onItemsComplete(itemsIndex)"
                />
            </transition-group>
        </div>
    </div>
</template>
<style lang="scss">
    $bottomGap: 100px;
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
            bottom: $bottomGap - 13px;
            left: 0;
            z-index: 0;
        }
    }

    .house-group {
        position: absolute;
        width: 100%;
        bottom: $bottomGap;
        left: 0;
        z-index: 1;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    import HouseGroupItem from '../components/HouseGroupItem.vue'

    const IMAGES = [
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190428/201904281412457316223.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20180127/201801271402412722186.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190226/201902261054483725746.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/201510/2015101411245757.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190313/201903130951457372109.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190402/201904021219498146575.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190528/201905281430297410849.jpg',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190521/201905211559442021496.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190520/201905201525389086361.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190307/201903071412306446937.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190130/201901301128292645531.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190102/201901021319523128012.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20190225/201902251053143607981.png',
        'https://imgwsdl.vivo.com.cn/appstore/developer/icon/20181025/201810251914039366723.png'
    ]

interface HouseItemItem {
    num: number;
}

interface HouseItem {
    items: HouseItemItem[];
    index: number
}

@Component({
    components: {
        HouseGroupItem
    }
})
    export default class Home extends Vue {
    private list: HouseItem[]

    constructor() {
        super(...arguments)

        this.list = this.initList()
    }

    private initList(): HouseItem[] {
        let refIndex = 1
        const list: HouseItem[] = Array.apply(0, new Array(200)).map((value, index) => {
            const length = Math.ceil(Math.random() * 3)
            refIndex += length
            const items: HouseItemItem[] = Array.apply(0, new Array(length)).map((value2, index2) => {
                const num = refIndex - (length - index2)
                return {
                    num,
                    image: IMAGES[num % (IMAGES.length)]
                }
            })
            const item: HouseItem = {
                items,
                index
            }
            return item
        })
        return list.reverse()
    }

    private get showList(): HouseItem[] {
        const listLength = this.list.length
        return this.list.slice(listLength - 10, listLength)
    }

    private onItemsComplete() {
        if (this.list.length === 0) {
            return
        }
        this.list.splice(this.list.length - 1, 1)
    }
    }
</script>
