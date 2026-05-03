<script lang="ts">
import Vue from 'vue';

interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showInput?: boolean;
}

export default Vue.extend({
  name: 'SSlider',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    percentage(): number {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },
    classes(): object {
      return {
        'sw-slider--disabled': this.disabled
      };
    }
  },
  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement;
      const val = Number(target.value);
      this.$emit('change', val);
    }
  }
});
</script>

<template>
  <div class="sw-slider" :class="classes">
    <div class="sw-slider__track">
      <div class="sw-slider__fill" :style="{ width: percentage + '%' }" />
      <div class="sw-slider__thumb" :style="{ left: percentage + '%' }" />
    </div>
    <input
      v-if="showInput"
      type="number"
      class="sw-slider__input"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      @input="handleInput"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/slider.scss';
</style>