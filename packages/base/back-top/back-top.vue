<script lang="ts">
import Vue from 'vue';

interface BackTopProps {
  target?: string;
  visibleHeight?: number;
  top?: number;
}

export default Vue.extend({
  name: 'SBackTop',
  props: {
    target: {
      type: String,
      default: ''
    },
    visibleHeight: {
      type: Number,
      default: 200
    },
    top: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false as boolean
    };
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.visible = scrollTop > this.visibleHeight;
    },
    handleClick() {
      window.scrollTo({ top: this.top, behavior: 'smooth' });
    }
  }
});
</script>

<template>
  <transition name="sw-back-top">
    <div v-show="visible" class="sw-back-top" @click="handleClick">
      <slot>↑</slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.sw-back-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d5af1;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  z-index: 999;

  &:hover {
    background: #1a4ad6;
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>