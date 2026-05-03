<script lang="ts">
import Vue from 'vue';

type LinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type LinkUnderline = 'always' | 'hover' | 'never';

interface LinkProps {
  type?: LinkType;
  underline?: LinkUnderline;
  disabled?: boolean;
  href?: string;
}

export default Vue.extend({
  name: 'SLink',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (val: string) => ['primary', 'success', 'warning', 'danger', 'info'].includes(val)
    },
    underline: {
      type: String,
      default: 'hover',
      validator: (val: string) => ['always', 'hover', 'never'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes(): string[] {
      return [
        `sw-link--${this.type}`,
        `sw-link--underline-${this.underline}`,
        { 'sw-link--disabled': this.disabled }
      ];
    }
  }
});
</script>

<template>
  <a class="sw-link" :class="classes" :href="disabled ? undefined : href">
    <slot />
  </a>
</template>

<style lang="scss" scoped>
@import '../../../theme/link.scss';
</style>