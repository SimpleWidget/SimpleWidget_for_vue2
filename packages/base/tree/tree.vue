<script lang="ts">
import Vue from 'vue';

interface TreeNode {
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
}

interface TreeProps {
  data?: TreeNode[];
  showCheckbox?: boolean;
  defaultExpandAll?: boolean;
}

export default Vue.extend({
  name: 'STree',
  props: {
    data: {
      type: Array as () => TreeNode[],
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expandedKeys: [] as string[],
      checkedKeys: [] as string[]
    };
  },
  methods: {
    toggleExpand(key: string) {
      const index = this.expandedKeys.indexOf(key);
      if (index > -1) {
        this.expandedKeys.splice(index, 1);
      } else {
        this.expandedKeys.push(key);
      }
    },
    handleSelect(node: TreeNode) {
      this.$emit('select', node);
    }
  }
});
</script>

<template>
  <div class="sw-tree">
    <div v-for="(node, index) in data" :key="index" class="sw-tree__node">
      <div class="sw-tree__node-content" @click="handleSelect(node)">
        <span
          v-if="node.children?.length"
          class="sw-tree__arrow"
          :class="{ 'sw-tree__arrow--expanded': expandedKeys.includes(String(index)) }"
          @click.stop="toggleExpand(String(index))"
        >▶</span>
        <span v-if="showCheckbox" class="sw-tree__checkbox">☐</span>
        <span class="sw-tree__label">{{ node.label }}</span>
      </div>
      <div v-if="node.children?.length && expandedKeys.includes(String(index))" class="sw-tree__children">
        <div v-for="(child, childIndex) in node.children" :key="childIndex" class="sw-tree__node">
          <div class="sw-tree__node-content" @click="handleSelect(child)">
            <span v-if="showCheckbox" class="sw-tree__checkbox">☐</span>
            <span class="sw-tree__label">{{ child.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/tree.scss';
</style>