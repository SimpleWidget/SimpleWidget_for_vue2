<script lang="ts">
import Vue from 'vue';

interface DropdownProps {
  trigger?: 'hover' | 'click';
}

export default Vue.extend({
  name: 'SDropdown',
  props: {
    trigger: {
      type: String,
      default: 'hover',
      validator: (val: string) => ['hover', 'click'].includes(val)
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    handleMouseEnter() {
      if (this.trigger === 'hover') {
        this.isShow = true;
      }
    },
    handleMouseLeave() {
      if (this.trigger === 'hover') {
        this.isShow = false;
      }
    },
    handleClick() {
      if (this.trigger === 'click') {
        this.isShow = !this.isShow;
      }
    },
    close() {
      this.isShow = false;
    }
  }
});
</script>

<template>
  <div
    class="sw-dropdown"
    :class="{ 'sw-dropdown--show': isShow }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="sw-dropdown__trigger" @click="handleClick">
      <slot name="trigger" />
    </div>
    <div v-if="$slots.default" class="sw-dropdown__menu" :class="{ 'sw-dropdown__menu--show': isShow }">
      <slot :close="close" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/dropdown.scss';
</style>