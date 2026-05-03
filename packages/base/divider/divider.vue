<script lang="ts">
import Vue from 'vue';

interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  color?: string;
}

export default Vue.extend({
  name: 'SDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val: string) => ['horizontal', 'vertical'].includes(val)
    },
    color: {
      type: String,
      default: '#e0e0e0'
    }
  },
  computed: {
    classes(): object {
      return {
        'sw-divider--vertical': this.direction === 'vertical'
      };
    }
  }
});
</script>

<template>
  <div class="sw-divider" :class="classes" :style="{ backgroundColor: color }" />
</template>

<style lang="scss" scoped>
@import '../../../theme/divider.scss';
</style>