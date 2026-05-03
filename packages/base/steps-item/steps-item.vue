<script lang="ts">
import Vue from 'vue';

interface StepsItemProps {
  title: string;
  description?: string;
  status?: 'wait' | 'active' | 'finish' | 'error';
}

export default Vue.extend({
  name: 'SStepsItem',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'wait',
      validator: (val: string) => ['wait', 'active', 'finish', 'error'].includes(val)
    }
  },
  inject: ['current'],
  computed: {
    currentStep(): number {
      return (this as any).current?.() ?? 1;
    },
    getStatus(): string {
      if (this.status === 'active') return 'active';
      if (this.status === 'finish') return 'finish';
      if (this.status === 'error') return 'error';
      return 'wait';
    }
  }
});
</script>

<template>
  <div class="sw-steps__item">
    <div class="sw-steps__dot" :class="[`sw-steps__dot--${getStatus}`]">
      <span v-if="getStatus === 'wait'">1</span>
      <span v-else-if="getStatus === 'finish'">✓</span>
      <span v-else-if="getStatus === 'error'">✕</span>
      <span v-else>1</span>
    </div>
    <div class="sw-steps__content">
      <div class="sw-steps__title">{{ title }}</div>
      <div v-if="description" class="sw-steps__description">{{ description }}</div>
    </div>
    <slot />
  </div>
</template>