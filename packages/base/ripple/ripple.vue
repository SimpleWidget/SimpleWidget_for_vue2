<script lang="ts">
import Vue from 'vue';

type FightingType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

interface RippleProps {
  ripplesColor?: string;
  duration?: number;
  type?: FightingType;
  disabled?: boolean;
}

export default Vue.extend({
  name: 'SRipple',
  props: {
    ripplesColor: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 400
    },
    type: {
      type: String,
      default: 'default',
      validator: (val: string) => ['default', 'primary', 'success', 'danger', 'warning', 'info'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rippleRef: null as HTMLElement | null
    };
  },
  methods: {
    handleClick(evt: MouseEvent) {
      if (this.disabled) return;

      const COLOR_LIST: Record<string, string> = {
        default: '#f0f0f0',
        primary: '#2d5af1',
        success: '#52b35e',
        danger: '#ff0200',
        warning: '#fcc202',
        info: '#1d1d1f',
      };

      const ripplesColor = this.ripplesColor || COLOR_LIST[this.type || 'default'];
      const rippleEl = document.createElement('span');
      rippleEl.className = 'sw-ripple__animation';

      const rect = (evt.currentTarget as HTMLElement).getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      rippleEl.style.left = `${x}px`;
      rippleEl.style.top = `${y}px`;
      rippleEl.style.background = ripplesColor;

      if (this.rippleRef) {
        this.rippleRef.appendChild(rippleEl);

        setTimeout(() => {
          rippleEl.remove();
        }, this.duration);
      }
    }
  }
});
</script>

<template>
  <div ref="rippleRef" class="sw-ripple" @click="handleClick">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/ripple.scss';
</style>