<script lang="ts">
import Vue from 'vue';

interface MessageProps {
  message?: string | object;
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  close?: boolean;
  duration?: number;
  round?: boolean;
  placement?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
}

export default Vue.extend({
  name: 'SMessage',
  props: {
    message: {
      type: [String, Object],
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
      default: 'top',
      validator: (val: string) => ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'].includes(val)
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
        'sw-message': true,
        [`sw-message__${this.type}`]: true,
        [`sw-message__${this.placement}`]: true,
        'sw-message__round': this.round
      };
    }
  }
});
</script>

<template>
  <transition
    mode="out-in"
    appear
    :name="'sw-message-fade-' + (placement.includes('bottom') ? 'bottom' : 'top')"
  >
    <div
      v-show="visible"
      :class="getClasses()"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="sw-message__text">{{ message }}</div>
      <span v-if="close" class="sw-message__close" @click="handleClose">✕</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '../../../theme/message.scss';
</style>