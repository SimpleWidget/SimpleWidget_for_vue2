<template>
  <button
    class="sw-button"
    :class="classes"
    :type="nativeType"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (val: string) => ['primary', 'success', 'warning', 'danger', 'info', 'text', 'default'].includes(val)
    },
    size: {
      type: String,
      default: 'middle',
      validator: (val: string) => ['medium', 'large', 'small', 'mini', 'middle'].includes(val)
    },
    nativeType: {
      type: String,
      default: 'button',
      validator: (val: string) => ['button', 'submit', 'reset'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(): (string | object)[] {
      return [
        this.type ? `sw-button-${this.type}` : '',
        this.size ? `sw-button-${this.size}` : '',
        {
          'sw-button-disabled': this.disabled,
        },
      ];
    }
  }
});
</script>

<style lang="scss" scoped>
@import '../../../theme/button.scss';
</style>