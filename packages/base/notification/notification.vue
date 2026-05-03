<script lang="ts">
import Vue from 'vue';

interface NotificationProps {
  title?: string;
  message?: string;
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  close?: boolean;
  duration?: number;
  round?: boolean;
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default Vue.extend({
  name: 'SNotification',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default',
      validator: (val: string) => ['default', 'primary', 'success', 'danger', 'warning'].includes(val)
    },
    close: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2500
    },
    round: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'top-right',
      validator: (val: string) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(val)
    }
  },
  data() {
    return {
      visible: true as boolean,
      timer: null as ReturnType<typeof setTimeout> | null
    };
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.visible = false;
          this.$emit('close');
        }, this.duration);
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    handleClose() {
      this.visible = false;
      this.$emit('close');
    },
    getClasses(): object {
      return {
        'sw-notification': true,
        [`sw-notification__${this.type}`]: true,
        [`sw-notification__${this.placement}`]: true,
        'sw-notification__round': this.round
      };
    },
    isRight(): boolean {
      return (this.placement as string).includes('right');
    }
  }
});
</script>

<template>
  <transition
    mode="out-in"
    appear
    :name="'sw-notification-fade' + (isRight() ? '-right' : '-left')"
  >
    <div
      v-show="visible"
      :class="getClasses()"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="sw-notification__content">
        <h3 v-if="title" class="sw-notification__title">{{ title }}</h3>
        <div class="sw-notification__message">{{ message }}</div>
      </div>
      <span v-if="close" class="sw-notification__close" @click="handleClose">✕</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '../../../theme/notification.scss';
</style>