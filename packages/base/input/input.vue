<script lang="ts">
import Vue from 'vue';

interface InputProps {
  modelValue?: string | number;
  type?: 'text' | 'password' | 'number';
  size?: 'large' | 'middle' | 'small' | 'mini';
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  name?: string;
  placeholder?: string;
  clear?: boolean;
  showPassword?: boolean;
  search?: boolean;
  maxLength?: number;
  max?: number;
  min?: number;
  icon?: string;
  width?: string | number;
  height?: string | number;
}

export default Vue.extend({
  name: 'SInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'middle',
      validator: (val: string) => ['large', 'middle', 'small', 'mini'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'sw-input'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clear: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    min: {
      type: Number,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    height: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      showPass: false
    };
  },
  computed: {
    inputType(): string {
      if (this.type === 'password' && this.showPass) {
        return 'text';
      }
      return this.type;
    },
    classList(): (string | object)[] {
      return [
        `sw-input-${this.size}`,
        {
          'sw-input-disabled': this.disabled,
          'sw-input-search': this.search,
        },
      ];
    },
    style(): Record<string, string> {
      const s: Record<string, string> = {};
      if (this.width) s.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      if (this.height) s.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      return s;
    }
  },
  watch: {
    type(newVal: string) {
      if (newVal !== 'password') {
        this.showPass = false;
      }
    }
  },
  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit('update:modelValue', target.value);
      this.$emit('input', target.value);
    },
    handleChange(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit('change', target.value);
    },
    handleFocus(e: FocusEvent) {
      this.$emit('focus', e);
    },
    handleBlur(e: FocusEvent) {
      this.$emit('blur', e);
    },
    handleEnter(e: KeyboardEvent) {
      this.$emit('enter', e);
      if (this.search) {
        this.handleSearch();
      }
    },
    handleSearch() {
      this.$emit('search', this.modelValue);
    },
    handleClear() {
      this.$emit('update:modelValue', '');
      this.$emit('clear');
    },
    togglePassword() {
      this.showPass = !this.showPass;
    }
  }
});
</script>

<template>
  <div class="sw-input" :class="classList" :style="style">
    <div class="sw-input__wrapper">
      <slot name="before" />
      <span v-if="icon" class="sw-input__icon sw-icon" :class="icon" />
      <input
        class="sw-input__inner"
        :type="inputType"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :name="name"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :max="max"
        :min="min"
        autocomplete="off"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        @keyup.enter="handleEnter"
      />
      <span
        v-if="clear && modelValue"
        class="sw-input__clear-btn sw-icon sw-icon-close"
        @click="handleClear"
      />
      <span
        v-if="showPassword"
        class="sw-input__password-btn sw-icon"
        :class="showPass ? 'sw-icon-eye-outline' : 'sw-icon-eye-off-outline'"
        @click="togglePassword"
      />
      <slot name="after" />
    </div>
    <div v-if="search" class="sw-input__search" @click="handleSearch">
      <slot name="searchBtn">
        <button class="sw-input__search-btn sw-button sw-button-primary sw-button-middle">
          搜索
        </button>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/input.scss';
</style>