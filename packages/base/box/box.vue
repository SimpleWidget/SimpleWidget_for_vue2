<script lang="ts">
import Vue from 'vue';

interface BoxProps {
  padding?: string | number;
  margin?: string | number;
  border?: boolean;
  radius?: boolean;
}

export default Vue.extend({
  name: 'SBox',
  props: {
    padding: {
      type: [String, Number],
      default: 0
    },
    margin: {
      type: [String, Number],
      default: 0
    },
    border: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles(): Record<string, string> {
      const s: Record<string, string> = {};
      if (this.padding) {
        s.padding = typeof this.padding === 'number' ? `${this.padding}px` : this.padding as string;
      }
      if (this.margin) {
        s.margin = typeof this.margin === 'number' ? `${this.margin}px` : this.margin as string;
      }
      return s;
    },
    classes(): object {
      return {
        'sw-box--border': this.border,
        'sw-box--radius': this.radius
      };
    }
  }
});
</script>

<template>
  <div class="sw-box" :class="classes" :style="styles">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/box.scss';
</style>