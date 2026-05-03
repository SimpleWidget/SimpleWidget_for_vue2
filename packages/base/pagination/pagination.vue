<script lang="ts">
import Vue from 'vue';

interface PaginationProps {
  total: number;
  current?: number;
  pageSize?: number;
  pageSelect?: number[];
  showJumpSearch?: boolean;
}

export default Vue.extend({
  name: 'SPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showJumpSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: this.current
    };
  },
  computed: {
    totalPages(): number {
      return Math.ceil(this.total / this.pageSize);
    },
    pages(): number[] {
      const result: number[] = [];
      for (let i = 1; i <= this.totalPages; i++) {
        result.push(i);
      }
      return result;
    }
  },
  watch: {
    current(val: number) {
      this.currentPage = val;
    }
  },
  methods: {
    handleClick(page: number) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.$emit('update:current', page);
      this.$emit('change', page);
    },
    handlePrev() {
      if (this.currentPage > 1) {
        this.handleClick(this.currentPage - 1);
      }
    },
    handleNext() {
      if (this.currentPage < this.totalPages) {
        this.handleClick(this.currentPage + 1);
      }
    },
    handleJumpEnter(e: KeyboardEvent) {
      const target = e.target as HTMLInputElement;
      const page = parseInt(target.value);
      this.handleClick(page);
    }
  }
});
</script>

<template>
  <div class="sw-pagination">
    <button
      class="sw-pagination__button"
      :disabled="currentPage <= 1"
      @click="handlePrev"
    >
      ‹
    </button>

    <div class="sw-pagination__pages">
      <div
        v-for="page in pages"
        :key="page"
        :class="['sw-pagination__item', { 'sw-pagination__item--active': currentPage === page }]"
        @click="handleClick(page)"
      >
        {{ page }}
      </div>
    </div>

    <button
      class="sw-pagination__button"
      :disabled="currentPage >= totalPages"
      @click="handleNext"
    >
      ›
    </button>

    <input
      v-if="showJumpSearch"
      type="number"
      class="sw-pagination__jump"
      placeholder="跳转"
      @keyup.enter="handleJumpEnter"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/pagination.scss';
</style>