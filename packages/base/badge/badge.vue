<script lang="ts">
import Vue from 'vue';

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
  value?: string | number;
  max?: number;
  dot?: boolean;
  show?: boolean;
  type?: BadgeType;
  background?: string;
  color?: string;
}

export default Vue.extend({
  name: 'SBadge',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    max: {
      type: Number,
      default: 99
    },
    dot: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'danger',
      validator: (val: string) => ['primary', 'success', 'warning', 'danger', 'info', 'default'].includes(val)
    },
    background: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    }
  },
  computed: {
    classList(): object {
      return {
        [`sw-badge-${this.type}`]: true,
        'sw-badge-dot': this.dot
      };
    },
    displayValue(): string {
      if (this.dot) return '';
      if (typeof this.value === 'number' && this.max !== undefined) {
        return (this.value as number) > this.max ? `${this.max}+` : this.value;
      }
      return this.value;
    },
    isShow(): boolean {
      if (!this.show) return false;
      if (typeof this.value === 'number') {
        return (this.value as number) > 0;
      }
      return this.value !== '' && this.value !== undefined;
    }
  }
});
</script>

<template>
  <div class="sw-badge" :class="classList">
    <slot />
    <transition name="sw-badge">
      <sup v-if="isShow" class="sw-badge__content" :class="{ 'sw-badge__dot': dot }">
        {{ displayValue }}
      </sup>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/badge.scss';
</style>