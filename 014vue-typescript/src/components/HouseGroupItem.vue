<template>
  <ul class="house-group_item">
    <HouseItem
      v-for="(item, index) in items"
      :key="index"
      :disabled="disabled"
      :item="item"
      @touchActiveChange="touchActive(index, $event)"
    />
  </ul>
</template>

<style lang="scss">
.house-group_item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HouseItem, { TouchActiveEvent } from './HouseItem.vue';

interface ActiveMap {
  [index: number]: boolean;
}

@Component({
  name: 'HouseGroupItem',
  components: {
    HouseItem,
  },
})
export default class HouseGroupItem extends Vue {
  @Prop() private items!: number[];
  @Prop() private disabled!: boolean;
  private touchActiveMap: ActiveMap = {};
  private isComplete = false;

  // private touchActive_time(index: number, { item, timestamp, active }: TouchActiveEvent) {
  //     if (this.disabled) {
  //         return
  //     }
  //     console.log('touchActive', index, item, active)
  //     if (!this.isComplete) {
  //         this.touchActiveMap[index] = timestamp
  //         console.log('touchActiveMap', this.touchActiveMap)
  //         let min = Infinity
  //         let max = 0
  //         const activeList = Object.values(this.touchActiveMap)
  //         if (activeList.length >= this.items.length) {
  //             activeList.forEach((t) => {
  //                 if (t <= min) {
  //                     min = t
  //                 }
  //
  //                 if (t >= max) {
  //                     max = t
  //                 }
  //             })
  //             console.log('touchActive min max', min, max, max - min)
  //             if (max - min < 100) {
  //                 this.isComplete = true
  //                 this.$emit('complete')
  //                 console.log('complete')
  //             }
  //         }
  //     }
  // }

  private touchActive(
    index: number,
    { item, timestamp, active }: TouchActiveEvent
  ) {
    if (this.disabled) {
      return;
    }
    console.log('touchActive', index, item, active);
    if (!this.isComplete) {
      this.touchActiveMap[index] = active;
      const activeArr = Object.values(this.touchActiveMap);
      if (
        activeArr.length === this.items.length &&
        !activeArr.some(i => i === false)
      ) {
        this.isComplete = true;
        this.$emit('complete');
      }
    }
  }
}
</script>
