<script lang="ts">
import Vue from 'vue';

interface TableColumn {
  key?: string;
  title: string;
  width?: string | number;
  minWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (row: Record<string, any>, column: TableColumn, index: number) => any;
}

interface TableProps {
  data?: Record<string, any>[];
  columns?: TableColumn[];
  align?: 'left' | 'center' | 'right';
  border?: boolean;
  stripe?: boolean;
  hover?: boolean;
  select?: boolean;
  num?: boolean;
  height?: string | number;
  maxHeight?: string | number;
}

export default Vue.extend({
  name: 'STable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: 'left'
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: true
    },
    select: {
      type: Boolean,
      default: false
    },
    num: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: undefined
    },
    maxHeight: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      formatData: [] as Record<string, any>[]
    };
  },
  computed: {
    isSelectAll(): boolean {
      if (!this.formatData.length) return false;
      return this.formatData.every((item: any) => item._select);
    },
    hasScroll(): boolean {
      return !!(this.height || this.maxHeight);
    },
    tableClasses(): object {
      return {
        'sw-table': true,
        'sw-table--border': this.border,
        'sw-table--stripe': this.stripe,
        'sw-table--hover': this.hover,
      };
    }
  },
  watch: {
    data: {
      handler() {
        if (this.select) {
          this.formatData = (this.data as any[]).map((item: any) => ({ ...item, _select: false }));
        } else {
          this.formatData = [...(this.data as any[])];
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSelectAll(checked: boolean) {
      this.formatData.forEach((item: any) => {
        item._select = checked;
      });
      this.emitSelectedRows();
    },
    handleRowSelect(row: Record<string, any>) {
      (row as any)._select = !(row as any)._select;
      this.emitSelectedRows();
    },
    emitSelectedRows() {
      const selected = this.formatData.filter((item: any) => item._select);
      this.$emit('select', selected);
    },
    handleRowClick(row: Record<string, any>, index: number) {
      this.$emit('rowClick', row, index);
    },
    handleCheckboxChange(e: Event) {
      const target = e.target as HTMLInputElement;
      this.handleSelectAll(target.checked);
    },
    getCellStyle(column: TableColumn): Record<string, string> {
      const style: Record<string, string> = {};
      if (column.width) {
        style.width = typeof column.width === 'number' ? `${column.width}px` : column.width;
      }
      if (column.minWidth) {
        style.minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth;
      }
      if (column.align) {
        style.textAlign = column.align;
      }
      return style;
    }
  }
});
</script>

<template>
  <div class="sw-table" :class="tableClasses">
    <div class="sw-table__container" :class="{ 'sw-table__container--scroll': hasScroll }">
      <div
        class="sw-table__wrapper"
        :style="{
          height: height ? `${height}px` : undefined,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined
        }"
      >
        <table class="sw-table__table">
          <colgroup>
            <col v-if="select" width="50" />
            <col v-if="num" width="60" />
            <col
              v-for="(column, index) in columns"
              :key="index"
              :width="(column as any).width"
            />
          </colgroup>

          <thead class="sw-table__head">
            <tr>
              <th v-if="select" class="sw-table__th">
                <input type="checkbox" :checked="isSelectAll" @change="handleCheckboxChange" />
              </th>
              <th v-if="num" class="sw-table__th sw-table__th--num">#</th>
              <th
                v-for="(column, index) in columns"
                :key="index"
                class="sw-table__th"
                :class="{ 'sw-table__th--sortable': (column as any).sortable }"
                :style="getCellStyle(column as any)"
              >
                <span class="sw-table__th-content">
                  {{ (column as any).title }}
                  <span v-if="(column as any).sortable" class="sw-table__sort-icon">
                    <i class="sw-icon sw-icon-sort" />
                  </span>
                </span>
              </th>
            </tr>
          </thead>

          <tbody class="sw-table__body">
            <tr
              v-for="(item, m) in formatData"
              :key="m"
              class="sw-table__row"
              :class="{
                'sw-table__row--selected': (item as any)._select,
                'sw-table__row--stripe': stripe && m % 2 === 1
              }"
              @click="handleRowClick(item, m)"
            >
              <td v-if="select" class="sw-table__td" @click.stop>
                <input type="checkbox" :checked="(item as any)._select" @change="handleRowSelect(item)" />
              </td>
              <td v-if="num" class="sw-table__td sw-table__td--num">{{ m + 1 }}</td>
              <td
                v-for="(column, i) in columns"
                :key="i"
                class="sw-table__td"
                :style="getCellStyle(column as any)"
              >
                <template v-if="(column as any).render">
                  {{ (column as any).render(item, column, m) }}
                </template>
                <template v-else-if="(column as any).key">
                  {{ item[(column as any).key] }}
                </template>
              </td>
            </tr>
          </tbody>

          <tfoot v-if="$slots.tfoot">
            <slot name="tfoot" />
          </tfoot>
        </table>

        <div v-if="!formatData.length" class="sw-table__empty">
          <slot name="empty">
            <div class="sw-table__empty-content">
              <i class="sw-icon sw-icon-files" />
              <span>暂无数据</span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/table.scss';
</style>