<script lang="ts">
import Vue from 'vue';

interface TreeNodeProps {
  label: string;
  children?: any[];
  disabled?: boolean;
}

export default Vue.extend({
  name: 'STreeNode',
  props: {
    label: {
      type: String,
      required: true
    },
    children: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['tree'],
  methods: {
    handleClick() {
      const tree = (this as any).tree;
      if (tree) {
        tree.handleSelect({ label: this.label, children: this.children });
      }
    },
    toggleExpand(key: string) {
      const tree = (this as any).tree;
      if (tree) {
        tree.toggleExpand(key);
      }
    }
  }
});
</script>

<template>
  <div class="sw-tree__node">
    <div class="sw-tree__node-content" @click="handleClick">
      <span
        v-if="children && children.length"
        class="sw-tree__arrow"
        @click.stop="toggleExpand(label)"
      >▶</span>
      <span class="sw-tree__label">{{ label }}</span>
    </div>
    <div v-if="children && children.length" class="sw-tree__children">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/tree.scss';
</style>