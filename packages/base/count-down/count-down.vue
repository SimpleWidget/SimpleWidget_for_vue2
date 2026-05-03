<script lang="ts">
import Vue from 'vue';

interface CountDownProps {
  time?: number;
  format?: string;
  autoStart?: boolean;
}

export default Vue.extend({
  name: 'SCountDown',
  props: {
    time: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentTime: this.time as number,
      interval: null as ReturnType<typeof setInterval> | null
    };
  },
  mounted() {
    if (this.autoStart) {
      this.start();
    }
  },
  beforeDestroy() {
    this.stop();
  },
  methods: {
    formatTime(ms: number): string {
      const totalSeconds = Math.floor(ms / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      let result = this.format;
      result = result.replace('DD', String(days).padStart(2, '0'));
      result = result.replace('HH', String(hours).padStart(2, '0'));
      result = result.replace('mm', String(minutes).padStart(2, '0'));
      result = result.replace('ss', String(seconds).padStart(2, '0'));
      result = result.replace('S', String(Math.floor((ms % 1000) / 100)));

      return result;
    },
    start() {
      if (this.interval) return;
      this.interval = setInterval(() => {
        this.currentTime -= 1000;
        this.$emit('change', this.currentTime);
        if (this.currentTime <= 0) {
          this.currentTime = 0;
          this.stop();
          this.$emit('finish');
        }
      }, 1000);
    },
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    reset(newTime?: number) {
      this.stop();
      this.currentTime = newTime ?? this.time;
    }
  }
});
</script>

<template>
  <div class="sw-count-down">
    <slot>{{ formatTime(currentTime) }}</slot>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/count-down.scss';
</style>