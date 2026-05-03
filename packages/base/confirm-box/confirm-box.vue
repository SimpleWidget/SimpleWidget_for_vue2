<script lang="ts">
import Vue from 'vue';
import SButton from '../button/button.vue';

interface ConfirmBoxProps {
  show?: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
}

export default Vue.extend({
  name: 'SConfirmBox',
  components: { SButton },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      isLoading: false as boolean
    };
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false);
    },
    async handleConfirm() {
      this.isLoading = true;
      try {
        this.$emit('confirm');
      } finally {
        this.isLoading = false;
        this.handleClose();
      }
    },
    async handleCancel() {
      this.isLoading = true;
      try {
        this.$emit('cancel');
      } finally {
        this.isLoading = false;
        this.handleClose();
      }
    }
  }
});
</script>

<template>
  <teleport to="body">
    <transition name="sw-confirm-box__trans" appear>
      <div v-if="show" class="sw-confirm-box">
        <div class="sw-confirm-box__mask" />
        <div class="sw-confirm-box__container">
          <div class="sw-confirm-box__header">
            <div class="sw-confirm-box__title">{{ title }}</div>
            <span
              class="sw-confirm-box__close"
              :style="{ opacity: isLoading ? 0.5 : 1 }"
              @click="handleClose"
            >✕</span>
          </div>
          <div class="sw-confirm-box__body">{{ content }}</div>
          <div class="sw-confirm-box__footer">
            <SButton :disabled="isLoading" @click="handleCancel">
              {{ cancelText }}
            </SButton>
            <SButton type="primary" :loading="isLoading" @click="handleConfirm">
              {{ confirmText }}
            </SButton>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
@import '../../../theme/confirm-box.scss';

.sw-confirm-box__close {
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
}
</style>