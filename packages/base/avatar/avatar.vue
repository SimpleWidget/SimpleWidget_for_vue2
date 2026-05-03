<script lang="ts">
import Vue from 'vue';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'large' | 'middle' | 'small' | 'mini' | number;
  round?: boolean;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  text?: string;
}

export default Vue.extend({
  name: 'SAvatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 'middle'
    },
    round: {
      type: Boolean,
      default: false
    },
    fit: {
      type: String,
      default: 'cover',
      validator: (val: string) => ['cover', 'contain', 'fill', 'none'].includes(val)
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoaded: false,
      hasError: false
    };
  },
  computed: {
    sizeStyle(): Record<string, string> {
      if (typeof this.size === 'number') {
        return { width: `${this.size}px`, height: `${this.size}px` };
      }
      return {};
    },
    classes(): object {
      return {
        'sw-avatar': true,
        [`sw-avatar--${this.size}`]: typeof this.size === 'string',
        'sw-avatar--round': this.round,
        [`sw-avatar--fit-${this.fit}`]: true,
      };
    }
  },
  methods: {
    handleLoad() {
      this.isLoaded = true;
    },
    handleError() {
      this.hasError = true;
    }
  }
});
</script>

<template>
  <div :class="classes" :style="sizeStyle">
    <img
      v-if="!hasError && src"
      :src="src"
      :alt="alt"
      class="sw-avatar__img"
      :style="{ objectFit: fit }"
      @load="handleLoad"
      @error="handleError"
    />
    <span v-else-if="text" class="sw-avatar__text">{{ text }}</span>
    <span v-else class="sw-avatar__error">{{ alt || '加载失败' }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/avatar.scss';
</style>