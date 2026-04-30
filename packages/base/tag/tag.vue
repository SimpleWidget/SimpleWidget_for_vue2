<script lang="ts">
import Vue from 'vue';

type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
type TagSize = 'large' | 'middle' | 'small' | 'mini';

interface TagProps {
  type?: TagType;
  size?: TagSize;
  close?: boolean;
  round?: boolean;
  simple?: boolean;
  block?: boolean;
  line?: boolean;
  background?: string;
  color?: string;
}

export default Vue.extend({
  name: 'STag',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (val: string) => ['primary', 'success', 'warning', 'danger', 'info', 'default'].includes(val)
    },
    size: {
      type: String,
      default: 'middle',
      validator: (val: string) => ['large', 'middle', 'small', 'mini'].includes(val)
    },
    close: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    }
  },
  computed: {
    classList(): object {
      return [
        `sw-tag-${this.type}`,
        `sw-tag-${this.size}`,
        {
          'sw-tag-round': this.round,
          'sw-tag-simple': this.simple,
          'sw-tag-block': this.block,
          'sw-tag-line': this.line,
        }
      ];
    },
    style(): Record<string, string> {
      const s: Record<string, string> = {};
      if (this.background) s.backgroundColor = this.background;
      if (this.color) s.color = this.color;
      return s;
    }
  },
  methods: {
    handleClose(e: MouseEvent) {
      this.$emit('close', e);
    },
    handleClick(e: MouseEvent) {
      this.$emit('click', e);
    }
  }
});
</script>

<template>
  <transition name="sw-tag">
    <span
      class="sw-tag"
      :class="classList"
      :style="style"
      @click="handleClick"
    >
      <slot name="before" />
      <slot />
      <slot name="after" />
      <span v-if="close" class="sw-tag__close" @click.stop="handleClose">
        <i class="sw-icon sw-icon-close" />
      </span>
    </span>
  </transition>
</template>

<style lang="scss" scoped>
@import '../../../theme/tag.scss';
</style>