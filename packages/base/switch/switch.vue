<script lang="ts">
import Vue from 'vue';

interface SwitchProps {
  modelValue?: boolean;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

export default Vue.extend({
  name: 'SSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: undefined
    },
    inactiveColor: {
      type: String,
      default: undefined
    }
  },
  computed: {
    classes(): object {
      return {
        'sw-switch--checked': this.modelValue,
        'sw-switch--disabled': this.disabled,
      };
    },
    styles(): Record<string, string> {
      const style: Record<string, string> = {};
      if (this.modelValue && this.activeColor) {
        style['--sw-switch-active-color'] = this.activeColor;
      }
      if (!this.modelValue && this.inactiveColor) {
        style['--sw-switch-inactive-color'] = this.inactiveColor;
      }
      return style;
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      const val = !this.modelValue;
      this.$emit('update:modelValue', val);
      this.$emit('change', val);
    }
  }
});
</script>

<template>
  <div
    class="sw-switch"
    :class="classes"
    :style="styles"
    @click="toggle"
  >
    <span class="sw-switch__core" />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/switch.scss';
</style>