<script lang="ts">
import Vue from 'vue';

interface TabsItemProps {
  label: string;
  name?: string | number;
}

export default Vue.extend({
  name: 'STabsItem',
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: [String, Number],
      default: 0
    }
  },
  inject: ['activeName', 'changeTab'],
  computed: {
    isActive(): boolean {
      const active = (this as any).activeName;
      return active?.value === this.name;
    }
  },
  methods: {
    handleClick() {
      const changeTab = (this as any).changeTab;
      if (changeTab) {
        changeTab(this.name);
      }
    }
  }
});
</script>

<template>
  <div
    :class="['sw-tabs__nav-item', { 'sw-tabs__nav-item--active': isActive }]"
    @click="handleClick"
  >
    {{ label }}
  </div>
  <div v-if="isActive" class="sw-tabs__panel sw-tabs__panel--active">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/tabs.scss';
</style>