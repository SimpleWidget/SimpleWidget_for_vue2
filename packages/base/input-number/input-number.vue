<script lang="ts">
import Vue from 'vue';

interface InputNumberProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'large' | 'middle' | 'small' | 'mini';
}

export default Vue.extend({
  name: 'SInputNumber',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'middle',
      validator: (val: string) => ['large', 'middle', 'small', 'mini'].includes(val)
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    classes(): object {
      return {
        'sw-input-number--disabled': this.disabled,
        [`sw-input-number--${this.size}`]: true
      };
    }
  },
  methods: {
    decrease() {
      if (this.disabled) return;
      const newVal = this.value - this.step;
      if (newVal >= this.min) {
        this.$emit('change', newVal);
      }
    },
    increase() {
      if (this.disabled) return;
      const newVal = this.value + this.step;
      if (newVal <= this.max) {
        this.$emit('change', newVal);
      }
    },
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement;
      const val = Number(target.value);
      if (!isNaN(val) && val >= this.min && val <= this.max) {
        this.$emit('change', val);
      }
    }
  }
});
</script>

<template>
  <div class="sw-input-number" :class="classes">
    <button class="sw-input-number__decrease" @click="decrease" :disabled="disabled">-</button>
    <input
      class="sw-input-number__input"
      type="number"
      :value="value"
      :disabled="disabled"
      @input="handleInput"
    />
    <button class="sw-input-number__increase" @click="increase" :disabled="disabled">+</button>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/input-number.scss';
</style>