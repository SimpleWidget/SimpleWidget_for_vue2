<script lang="ts">
import Vue from 'vue';

interface RadioGroupProps {
  modelValue?: string | number;
  disabled?: boolean;
}

export default Vue.extend({
  name: 'SRadioGroup',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: this.modelValue,
      localDisabled: this.disabled
    };
  },
  methods: {
    setChange(val: string | number) {
      this.localValue = val;
      this.$emit('update:modelValue', val);
      this.$emit('change', val);
    }
  },
  provide(): any {
    return {
      radioGroup: this
    };
  }
});
</script>

<template>
  <div class="sw-radio-group">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/radio.scss';
</style>