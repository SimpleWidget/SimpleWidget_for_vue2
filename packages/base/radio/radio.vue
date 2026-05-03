<script lang="ts">
import Vue from 'vue';

interface RadioProps {
  modelValue?: string | number;
  label?: string | number;
  disabled?: boolean;
  border?: boolean;
}

export default Vue.extend({
  name: 'SRadio',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  inject: ['radioGroup'],
  computed: {
    parentInject(): any {
      return (this as any).radioGroup || null;
    },
    keyword(): string | number {
      return this.parentInject?.modelValue ?? this.modelValue;
    },
    isActive(): boolean {
      return this.keyword === this.label;
    },
    isDisabled(): boolean {
      return this.disabled || !!(this.parentInject?.disabled);
    }
  },
  methods: {
    handleChange(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target.checked) {
        if (this.parentInject) {
          this.parentInject.setChange(this.label);
        }
        this.$emit('update:modelValue', this.label);
        this.$emit('change', this.label);
      }
    },
    getClasses(): object {
      return {
        'sw-radio--checked': this.isActive,
        'sw-radio--disabled': this.isDisabled,
        'sw-radio--border': this.border,
      };
    }
  }
});
</script>

<template>
  <label class="sw-radio" :class="getClasses">
    <input
      type="radio"
      class="sw-radio__input"
      :value="label"
      :checked="isActive"
      :disabled="isDisabled"
      @change="handleChange"
    />
    <span class="sw-radio__box" />
    <span class="sw-radio__text">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import '../../../theme/radio.scss';
</style>