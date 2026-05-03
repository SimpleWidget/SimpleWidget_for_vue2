<script lang="ts">
import Vue from 'vue';

interface DropdownItemProps {
  disabled?: boolean;
}

export default Vue.extend({
  name: 'SDropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    }
  }
});
</script>

<template>
  <div
    :class="['sw-dropdown__item', { 'sw-dropdown__item--disabled': disabled }]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>