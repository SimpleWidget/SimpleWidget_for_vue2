<script lang="ts">
import Vue from 'vue';

interface FormItemProps {
  label?: string;
  prop?: string;
}

export default Vue.extend({
  name: 'SFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  inject: ['form'],
  computed: {
    labelWidth(): string {
      const form = (this as any).form;
      if (form.labelWidth) {
        return typeof form.labelWidth === 'number' ? `${form.labelWidth}px` : form.labelWidth;
      }
      return '80px';
    }
  }
});
</script>

<template>
  <div class="sw-form__item">
    <label v-if="label" class="sw-form__item-label" :style="{ width: labelWidth }">
      {{ label }}
    </label>
    <div class="sw-form__item-control">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/form.scss';
</style>