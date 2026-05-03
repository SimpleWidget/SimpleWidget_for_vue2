<script lang="ts">
import Vue from 'vue';

interface AlertProps {
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  close?: boolean;
  simple?: boolean;
  center?: boolean;
  round?: boolean;
  fixed?: boolean;
}

export default Vue.extend({
  name: 'SAlert',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (val: string) => ['default', 'primary', 'success', 'danger', 'warning', 'info'].includes(val)
    },
    title: {
      type: String,
      default: undefined
    },
    close: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    fixed: {
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
        'sw-alert': true,
        [`sw-alert__${this.type}`]: true,
        'sw-alert--simple': this.simple,
        'sw-alert--center': this.center,
        'sw-alert--round': this.round,
        'sw-alert--fixed': this.fixed,
      };
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
  <transition name="sw-alert">
    <div v-if="isShow" :class="classes">
      <div class="sw-alert__content">
        <div v-if="title" class="sw-alert__title">{{ title }}</div>
        <div v-if="$slots.default" class="sw-alert__sub-title">
          <slot />
        </div>
      </div>
      <span v-if="close" class="sw-alert__close" @click="handleClose">✕</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '../../../theme/alert.scss';
</style>