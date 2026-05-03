<script lang="ts">
import Vue from 'vue';

interface CheckboxProps {
  modelValue?: boolean | string[];
  label?: string | number | boolean;
  disabled?: boolean;
  border?: boolean;
  showLabel?: boolean;
}

export default Vue.extend({
  name: 'SCheckbox',
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: false
    },
    label: {
      type: [String, Number, Boolean],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  inject: ['checkboxGroup'],
  computed: {
    parentInject(): any {
      return (this as any).checkboxGroup || null;
    },
    keyword(): boolean | string[] {
      return this.parentInject?.modelValue ?? this.modelValue;
    },
    isActive(): boolean {
      const value = this.keyword;
      if (Array.isArray(value)) {
        return value.includes(this.label as never);
      }
      return Boolean(value);
    },
    isDisabled(): boolean {
      return this.disabled || !!(this.parentInject?.disabled);
    }
  },
  methods: {
    handleChange(e: Event) {
      const target = e.target as HTMLInputElement;
      if (this.parentInject) {
        const arr = [...(Array.isArray(this.keyword) ? this.keyword as string[] : [])];
        if (target.checked) {
          arr.push(this.label as string);
        } else {
          const idx = arr.indexOf(this.label as never);
          if (idx > -1) arr.splice(idx, 1);
        }
        this.parentInject.setChange(arr);
        this.$emit('update:modelValue', arr);
        this.$emit('change', arr);
      } else {
        this.$emit('update:modelValue', target.checked);
        this.$emit('change', target.checked);
      }
    },
    getClasses(): object {
      return {
        'sw-checkbox--checked': this.isActive,
        'sw-checkbox--disabled': this.isDisabled,
        'sw-checkbox--border': this.border,
      };
    }
  }
});
</script>

<template>
  <label class="sw-checkbox" :class="getClasses">
    <input
      type="checkbox"
      class="sw-checkbox__input"
      :value="label"
      :checked="isActive"
      :disabled="isDisabled"
      @change="handleChange"
    />
    <span class="sw-checkbox__box" />
    <span class="sw-checkbox__text">
      <slot />
      <template v-if="!$slots.default && showLabel">{{ label }}</template>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import '../../../theme/checkbox.scss';
</style>