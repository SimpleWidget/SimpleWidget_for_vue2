<script lang="ts">
import Vue from 'vue';

interface OptionProps {
  value?: string | number;
  label?: string;
  disabled?: boolean;
}

export default Vue.extend({
  name: 'SOption',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['select'],
  computed: {
    displayLabel(): string {
      return this.label || (this.value as string)?.toString() || '';
    },
    isActive(): boolean {
      const select = this.select as any;
      return select.props.modelValue === this.value;
    },
    isDisabled(): boolean {
      const select = this.select as any;
      return this.disabled || !!(select.props.disabled);
    },
    isFiltered(): boolean {
      const select = this.select as any;
      if (!select.filterText) return true;
      return this.displayLabel.toLowerCase().includes(select.filterText.toLowerCase());
    }
  },
  methods: {
    handleClick() {
      if (this.isDisabled) return;
      const select = this.select as any;
      select.handleOptionClick(this.value, this.displayLabel);
    }
  }
});
</script>

<template>
  <div
    v-if="isFiltered"
    class="sw-option"
    :class="{
      'sw-option--active': isActive,
      'sw-option--disabled': isDisabled,
    }"
    @click="handleClick"
  >
    <slot>{{ displayLabel }}</slot>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/option.scss';
</style>