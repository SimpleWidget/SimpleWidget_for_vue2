<script lang="ts">
import Vue from 'vue';

interface BreadcrumbProps {
  separator?: string;
}

export default Vue.extend({
  name: 'SBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    }
  }
});
</script>

<template>
  <div class="sw-breadcrumb" :separator="separator">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/breadcrumb.scss';
</style>