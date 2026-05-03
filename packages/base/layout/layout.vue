<script lang="ts">
import Vue from 'vue';

interface LayoutProps {
  direction?: 'horizontal' | 'vertical';
}

export default Vue.extend({
  name: 'SLayout',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val: string) => ['horizontal', 'vertical'].includes(val)
    }
  },
  computed: {
    classes(): object {
      return {
        'sw-layout--vertical': this.direction === 'vertical'
      };
    }
  }
});
</script>

<template>
  <div class="sw-layout" :class="classes">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/layout.scss';
</style>