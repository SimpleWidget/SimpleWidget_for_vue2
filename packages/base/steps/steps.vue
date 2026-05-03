<script lang="ts">
import Vue from 'vue';

interface StepsProps {
  current?: number;
}

export default Vue.extend({
  name: 'SSteps',
  props: {
    current: {
      type: Number,
      default: 1
    }
  },
  provide(): object {
    return {
      current: () => this.current
    };
  }
});
</script>

<template>
  <div class="sw-steps">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/steps.scss';
</style>