<script lang="ts">
import Vue from 'vue';

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  round?: boolean;
  block?: boolean;
}

export default Vue.extend({
  name: 'SImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    height: {
      type: [String, Number],
      default: undefined
    },
    fit: {
      type: String,
      default: 'cover',
      validator: (val: string) => ['cover', 'contain', 'fill', 'none'].includes(val)
    },
    round: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoaded: false as boolean,
      hasError: false as boolean
    };
  },
  methods: {
    handleLoad() {
      this.isLoaded = true;
    },
    handleError() {
      this.hasError = true;
    },
    getWidth(): string | undefined {
      if (!this.width) return undefined;
      return typeof this.width === 'number' ? `${this.width}px` : this.width as string;
    },
    getHeight(): string | undefined {
      if (!this.height) return undefined;
      return typeof this.height === 'number' ? `${this.height}px` : this.height as string;
    },
    getClasses(): object {
      return {
        'sw-image': true,
        'sw-image--block': this.block,
        'sw-image--round': this.round,
        [`sw-image--fit-${this.fit}`]: true
      };
    }
  }
});
</script>

<template>
  <div
    :class="getClasses()"
    :style="{ width: getWidth(), height: getHeight() }"
  >
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-else class="sw-image__error">
      <slot name="error">{{ alt || '加载失败' }}</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/image.scss';
</style>