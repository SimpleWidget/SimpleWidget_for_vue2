<script lang="ts">
import Vue from 'vue';

interface CardProps {
  title?: string;
  round?: boolean;
  padding?: string | number;
  shadow?: 'hover' | 'always';
  close?: boolean;
  titleBold?: boolean;
}

export default Vue.extend({
  name: 'SCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    round: {
      type: Boolean,
      default: false
    },
    padding: {
      type: [String, Number],
      default: 16
    },
    shadow: {
      type: String,
      default: '',
      validator: (val: string) => ['', 'hover', 'always'].includes(val)
    },
    close: {
      type: Boolean,
      default: false
    },
    titleBold: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: true
    };
  },
  computed: {
    classes(): object {
      return {
        'sw-card': true,
        'sw-card--round': this.round,
        'sw-card--shadow': this.shadow === 'hover',
        'sw-card--shadow-always': this.shadow === 'always',
      };
    },
    paddingStyle(): string {
      return typeof this.padding === 'number' ? `${this.padding}px` : this.padding;
    }
  },
  methods: {
    handleClose() {
      this.isShow = false;
      this.$emit('close');
    }
  }
});
</script>

<template>
  <transition name="sw-card">
    <div v-if="isShow" :class="classes">
      <header v-if="$slots.header || title" class="sw-card__header">
        <span :class="['sw-card__title', { 'sw-card__title-bold': titleBold }]">
          <slot name="header">{{ title }}</slot>
        </span>
        <span v-if="close" class="sw-card__close" @click="handleClose">✕</span>
      </header>
      <main class="sw-card__body" :style="{ padding: paddingStyle }">
        <slot />
      </main>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '../../../theme/card.scss';
</style>