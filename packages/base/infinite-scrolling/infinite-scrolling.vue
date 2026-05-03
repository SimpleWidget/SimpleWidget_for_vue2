<script lang="ts">
import Vue from 'vue';

interface InfiniteScrollingProps {
  distance?: number;
}

export default Vue.extend({
  name: 'SInfiniteScrolling',
  props: {
    distance: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      containerRef: null as HTMLDivElement | null
    };
  },
  mounted() {
    this.containerRef?.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    this.containerRef?.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.containerRef) {
        const { scrollTop, scrollHeight, clientHeight } = this.containerRef;
        if (scrollHeight - scrollTop - clientHeight < this.distance) {
          this.$emit('loadMore');
        }
      }
    }
  }
});
</script>

<template>
  <div ref="containerRef" class="sw-infinite-scrolling">
    <slot />
    <div v-if="$slots.loading" class="sw-infinite-scrolling__loading">
      <slot name="loading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sw-infinite-scrolling {
  overflow-y: auto;
  height: 300px;

  &__loading {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>