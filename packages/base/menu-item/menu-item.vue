<script lang="ts">
import Vue from 'vue';

interface MenuItemProps {
  index?: string;
  disabled?: boolean;
}

export default Vue.extend({
  name: 'SMenuItem',
  props: {
    index: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['menu'],
  computed: {
    isActive(): boolean {
      const menu = (this as any).menu;
      return menu?.activeIndex?.value === this.index;
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled && this.index) {
        const menu = (this as any).menu;
        menu?.handleSelect(this.index);
      }
    }
  }
});
</script>

<template>
  <div
    class="sw-menu__item"
    :class="{ 'sw-menu__item--active': isActive, 'sw-menu__item--disabled': disabled }"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/menu.scss';
</style>