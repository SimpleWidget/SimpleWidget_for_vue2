<script lang="ts">
import Vue from 'vue';

interface DialogProps {
  visible: boolean;
  title?: string;
  width?: string | number;
  fullscreen?: boolean;
  showMask?: boolean;
  maskClose?: boolean;
  appendToBody?: boolean;
  showHeader?: boolean;
  showCloseIcon?: boolean;
}

export default Vue.extend({
  name: 'SDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    showMask: {
      type: Boolean,
      default: true
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dialogClasses(): object {
      return {
        'sw-dialog': true,
        'sw-dialog__fullscreen': this.fullscreen,
      };
    }
  },
  methods: {
    maskClick() {
      if (this.maskClose) {
        this.$emit('update:visible', false);
        this.$emit('close');
      }
    },
    closeDialog() {
      this.$emit('update:visible', false);
      this.$emit('close');
    }
  }
});
</script>

<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="sw-dialog__trans">
      <div v-show="visible" :class="dialogClasses">
        <div v-if="showMask" class="sw-dialog__mask" @click="maskClick" />
        <div class="sw-dialog__wrapper">
          <transition name="sw-dialog__container-trans">
            <div v-show="visible" class="sw-dialog__container" :style="width ? { width: typeof width === 'number' ? `${width}px` : width } : {}">
              <header v-if="showHeader" class="sw-dialog__header">
                <div class="sw-dialog__header-before">
                  <slot name="headerBefore" />
                </div>
                <div class="sw-dialog__header-center">{{ title }}</div>
                <div class="sw-dialog__header-after">
                  <slot name="headerAfter">
                    <span v-if="showCloseIcon" class="sw-dialog__close" @click="closeDialog">✕</span>
                  </slot>
                </div>
              </header>
              <section v-if="$slots.default" class="sw-dialog__body">
                <slot />
              </section>
              <footer v-if="$slots.footer" class="sw-dialog__footer">
                <slot name="footer" />
              </footer>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
@import '../../../theme/dialog.scss';
</style>