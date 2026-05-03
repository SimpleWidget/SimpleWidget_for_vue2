<script lang="ts">
import Vue from 'vue';

interface CheckboxGroupProps {
  modelValue?: string[];
  disabled?: boolean;
}

export default Vue.extend({
  name: 'SCheckboxGroup',
  props: {
    modelValue: {
      type: Array as () => string[],
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: [...this.modelValue] as string[],
      localDisabled: this.disabled
    };
  },
  methods: {
    setChange(val: string[]) {
      this.localValue = val;
      this.$emit('update:modelValue', val);
      this.$emit('change', val);
    }
  },
  provide(): any {
    return {
      checkboxGroup: this
    };
  }
});
</script>

<template>
  <div class="sw-checkbox-group">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/checkbox.scss';
</style>