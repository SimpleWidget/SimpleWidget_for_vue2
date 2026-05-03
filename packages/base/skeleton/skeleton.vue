<script lang="ts">
import Vue from 'vue';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
  active?: boolean;
}

export default Vue.extend({
  name: 'SSkeleton',
  props: {
    variant: {
      type: String,
      default: 'text',
      validator: (val: string) => ['text', 'circular', 'rectangular'].includes(val)
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '16px'
    },
    lines: {
      type: Number,
      default: 1
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getStyles(): Record<string, string> {
      const style: Record<string, string> = {};
      if (typeof this.width === 'number') {
        style.width = `${this.width}px`;
      } else {
        style.width = this.width as string;
      }
      if (this.variant !== 'text') {
        if (typeof this.height === 'number') {
          style.height = `${this.height}px`;
        } else {
          style.height = this.height as string;
        }
      }
      return style;
    }
  }
});
</script>

<template>
  <div class="sw-skeleton">
    <div
      v-for="i in lines"
      :key="i"
      class="sw-skeleton__item"
      :class="['sw-skeleton--' + variant, { 'sw-skeleton--active': active }]"
      :style="getStyles()"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/skeleton.scss';
</style>