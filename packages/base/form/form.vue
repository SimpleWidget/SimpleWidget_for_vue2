<script lang="ts">
import Vue from 'vue';

interface FormProps {
  model?: Record<string, any>;
  labelWidth?: string | number;
  labelPosition?: 'left' | 'top';
}

export default Vue.extend({
  name: 'SForm',
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: [String, Number],
      default: '80px'
    },
    labelPosition: {
      type: String,
      default: 'left',
      validator: (val: string) => ['left', 'top'].includes(val)
    }
  },
  data() {
    return {
      formData: {} as Record<string, any>
    };
  },
  created() {
    this.formData = this.model || {};
  },
  provide(): object {
    return {
      form: {
        model: this.formData,
        labelWidth: this.labelWidth,
        labelPosition: this.labelPosition
      }
    };
  },
  methods: {
    handleSubmit(evt: Event) {
      evt.preventDefault();
      this.$emit('submit', this.formData);
    }
  }
});
</script>

<template>
  <form class="sw-form" :class="'sw-form--label-' + labelPosition" @submit="handleSubmit">
    <slot />
  </form>
</template>

<style lang="scss" scoped>
@import '../../../theme/form.scss';
</style>