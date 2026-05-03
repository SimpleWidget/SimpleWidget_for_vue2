<script lang="ts">
import Vue from 'vue';

type TooltipPosition = 'top' | 'bottom' | 'right' | 'left';
type TooltipState = 'hover' | 'active' | 'always';

interface TooltipProps {
  content?: string | number;
  position?: TooltipPosition;
  disabled?: boolean;
  state?: TooltipState;
  noArrow?: boolean;
  bold?: boolean;
  bright?: boolean;
  background?: string;
  fontColor?: string;
}

export default Vue.extend({
  name: 'STooltip',
  props: {
    content: {
      type: [String, Number],
      default: ''
    },
    position: {
      type: String,
      default: 'bottom',
      validator: (val: string) => ['top', 'bottom', 'right', 'left'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: 'hover',
      validator: (val: string) => ['hover', 'active', 'always'].includes(val)
    },
    noArrow: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    bright: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    },
    fontColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false as boolean
    };
  },
  computed: {
    classes(): (string | object)[] {
      return [
        this.position ? `sw-tooltip--${this.position}` : '',
        {
          'sw-tooltip--disabled': this.disabled,
          'sw-tooltip--bold': this.bold,
          'sw-tooltip--no-arrow': this.noArrow,
          'sw-tooltip--bright': this.bright,
        },
      ];
    },
    styles(): Record<string, string> {
      const style: Record<string, string> = {};
      if (this.background) {
        style['--sw-tooltip-background'] = this.background;
      }
      if (this.fontColor) {
        style['--sw-tooltip-font-color'] = this.fontColor;
      }
      return style;
    }
  },
  watch: {
    state: {
      handler(newState: string) {
        if (newState === 'always') {
          this.visible = true;
        } else if (newState === 'active') {
          this.visible = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    handleMouseEnter() {
      if (this.state === 'hover' && !this.disabled) {
        this.visible = true;
      }
    },
    handleMouseLeave() {
      if (this.state === 'hover' && !this.disabled) {
        this.visible = false;
      }
    }
  }
});
</script>

<template>
  <div
    v-if="$slots.default"
    class="sw-tooltip"
    :class="classes"
    :style="styles"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
    <div v-if="visible && content" class="sw-tooltip__content" :class="'sw-tooltip--' + position">
      {{ content }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/tooltip.scss';
</style>