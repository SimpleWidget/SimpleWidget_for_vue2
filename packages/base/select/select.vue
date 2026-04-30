<script lang="ts">
import Vue from 'vue';

interface SelectProps {
  modelValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  size?: 'large' | 'middle' | 'small' | 'mini';
}

export default Vue.extend({
  name: 'SSelect',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'middle',
      validator: (val: string) => ['large', 'middle', 'small', 'mini'].includes(val)
    }
  },
  data() {
    return {
      visible: false as boolean,
      filterText: '' as string,
      selectedLabel: '' as string
    };
  },
  computed: {
    isDisabled(): boolean {
      return this.disabled;
    },
    displayValue(): string {
      if (this.filterText) return this.filterText;
      return this.selectedLabel || (this.modelValue as string) || '';
    },
    showClear(): boolean {
      return this.clearable && !!this.modelValue && !this.disabled;
    }
  },
  provide() {
    return {
      select: {
        props: this.$props,
        visible: this.visible,
        filterText: this.filterText,
        selectedLabel: this.selectedLabel,
        handleOptionClick: this.handleOptionClick
      }
    };
  },
  methods: {
    handleOptionClick(value: string | number, label: string) {
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
      this.selectedLabel = label;
      this.visible = false;
      this.filterText = '';
    },
    toggle() {
      if (this.disabled) return;
      this.visible = !this.visible;
      this.$emit('visibleChange', this.visible);
    },
    handleClear(e: Event) {
      e.stopPropagation();
      this.$emit('update:modelValue', '');
      this.$emit('clear');
      this.selectedLabel = '';
    },
    handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const selectEl = (this.$el as HTMLElement);
      if (this.visible && !selectEl.contains(target)) {
        this.visible = false;
        this.$emit('visibleChange', false);
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
});
</script>

<template>
  <div
    class="sw-select"
    :class="[`sw-select--${size}`, { 'sw-select--disabled': disabled, 'sw-select--open': visible }]"
  >
    <div class="sw-select__wrapper" @click="toggle">
      <span class="sw-select__value">
        <slot v-if="$slots.prefix" name="prefix" />
        <span
          v-else
          class="sw-select__placeholder"
          :class="{ 'sw-select__placeholder--hidden': selectedLabel || modelValue }"
        >
          {{ placeholder }}
        </span>
        <span v-if="selectedLabel" class="sw-select__label">{{ selectedLabel }}</span>
      </span>
      <span class="sw-select__suffix">
        <span v-if="showClear" class="sw-select__clear" @click="handleClear">
          <i class="sw-icon sw-icon-circle-close" />
        </span>
        <span v-else class="sw-select__arrow" :class="{ 'sw-select__arrow--open': visible }">
          <i class="sw-icon sw-icon-arrow-down" />
        </span>
      </span>
    </div>
    <transition name="sw-select">
      <div v-if="visible" class="sw-select__dropdown">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/select.scss';
</style>