<script lang="ts">
import Vue from 'vue';

interface MenuProps {
  mode?: 'horizontal' | 'vertical';
  defaultActive?: string;
}

export default Vue.extend({
  name: 'SMenu',
  props: {
    mode: {
      type: String,
      default: 'vertical',
      validator: (val: string) => ['horizontal', 'vertical'].includes(val)
    },
    defaultActive: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeIndex: this.defaultActive
    };
  },
  provide(): object {
    return {
      menu: {
        activeIndex: { value: this.activeIndex },
        handleSelect: (index: string) => {
          this.activeIndex = index;
          this.$emit('select', index);
        }
      }
    };
  }
});
</script>

<template>
  <div class="sw-menu" :class="'sw-menu--' + mode">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/menu.scss';
</style>