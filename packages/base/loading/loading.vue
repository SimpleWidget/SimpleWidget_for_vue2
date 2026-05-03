<script lang="ts">
import Vue from 'vue';

interface LoadingProps {
  visible?: boolean;
  text?: string;
  color?: string;
  fullscreen?: boolean;
  background?: string;
}

export default Vue.extend({
  name: 'SLoading',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes(): object {
      return {
        'sw-loading--fullscreen': this.fullscreen
      };
    },
    styles(): Record<string, string> {
      const style: Record<string, string> = {};
      if (this.color) {
        style['--sw-loading-color'] = this.color;
      }
      if (this.background) {
        style['--sw-loading-background'] = this.background;
      }
      return style;
    }
  }
});
</script>

<template>
  <div v-if="visible" class="sw-loading" :class="classes" :style="styles">
    <div class="sw-loading__animation">
      <svg viewBox="0 0 50 50" class="sw-loading__spinner">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="1,150;90,150;90,150" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" values="0;-35;-125" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
    <span v-if="text" class="sw-loading__text">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/loading.scss';
</style>