<script lang="ts">
import Vue from 'vue';

interface SpaceProps {
  size?: 'small' | 'middle' | 'large';
  direction?: 'horizontal' | 'vertical';
}

export default Vue.extend({
  name: 'SSpace',
  props: {
    size: {
      type: String,
      default: 'middle',
      validator: (val: string) => ['small', 'middle', 'large'].includes(val)
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val: string) => ['horizontal', 'vertical'].includes(val)
    }
  },
  computed: {
    classes(): object {
      return {
        'sw-space--vertical': this.direction === 'vertical',
        [`sw-space--${this.size}`]: true
      };
    }
  }
});
</script>

<template>
  <div class="sw-space" :class="classes">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/space.scss';
</style>