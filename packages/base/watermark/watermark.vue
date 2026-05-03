<script lang="ts">
import Vue from 'vue';

interface WatermarkProps {
  text?: string;
  gap?: number;
}

export default Vue.extend({
  name: 'SWatermark',
  props: {
    text: {
      type: String,
      default: 'watermark'
    },
    gap: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      containerRef: null as HTMLDivElement | null
    };
  },
  mounted() {
    if (this.containerRef) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 200;
        canvas.height = 100;
        ctx.font = '14px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.rotate(-15 * Math.PI / 180);
        ctx.fillText(this.text, 20, 50);
        this.containerRef.style.backgroundImage = `url(${canvas.toDataURL()})`;
        this.containerRef.style.backgroundRepeat = 'repeat';
        this.containerRef.style.backgroundPosition = '0 0';
      }
    }
  }
});
</script>

<template>
  <div ref="containerRef" class="sw-watermark">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sw-watermark {
  width: 100%;
  min-height: 200px;
}
</style>