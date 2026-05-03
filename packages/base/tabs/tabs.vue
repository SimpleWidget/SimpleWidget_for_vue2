<script lang="ts">
import Vue from 'vue';

interface TabsProps {
  modelValue?: string | number;
}

export default Vue.extend({
  name: 'STabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      activeName: this.modelValue
    };
  },
  computed: {
    currentValue(): string | number {
      return this.activeName;
    }
  },
  watch: {
    modelValue(val: string | number) {
      this.activeName = val;
    }
  },
  methods: {
    changeTab(name: string | number) {
      this.activeName = name;
      this.$emit('update:modelValue', name);
      this.$emit('change', name);
    }
  },
  provide(): any {
    return {
      activeName: { value: this.activeName },
      changeTab: this.changeTab
    };
  }
});
</script>

<template>
  <div class="sw-tabs">
    <div class="sw-tabs__head">
      <slot name="header" />
    </div>
    <div class="sw-tabs__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/tabs.scss';
</style>