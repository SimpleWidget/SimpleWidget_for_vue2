<script lang="ts">
import Vue from 'vue';

interface ProgressProps {
  percentage?: number;
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  height?: string | number;
  showText?: boolean;
  stripe?: boolean;
}

export default Vue.extend({
  name: 'SProgress',
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator: (val: number) => val >= 0 && val <= 100
    },
    type: {
      type: String,
      default: 'primary',
      validator: (val: string) => ['default', 'primary', 'success', 'danger', 'warning', 'info'].includes(val)
    },
    height: {
      type: [String, Number],
      default: undefined
    },
    showText: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    clampedPercentage(): number {
      if (this.percentage <= 0) return 0;
      if (this.percentage >= 100) return 100;
      return this.percentage;
    },
    classes(): object {
      return {
        'sw-progress': true,
        'sw-progress--line': true,
        [`sw-progress__${this.type}`]: true,
        'sw-progress--stripe': this.stripe,
      };
    },
    heightStyle(): string {
      if (!this.height) return '';
      return typeof this.height === 'number' ? `${this.height}px` : this.height;
    }
  }
});
</script>

<template>
  <div :class="classes">
    <div
      class="sw-progress__container"
      :style="{ height: heightStyle }"
    >
      <div
        class="sw-progress__bar"
        :style="{ width: `${clampedPercentage}%` }"
      />
    </div>
    <span v-if="showText" class="sw-progress__text">{{ clampedPercentage }}%</span>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/progress.scss';
</style>