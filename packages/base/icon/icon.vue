<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
});
</script>

<template>
  <i :class="'sw-icon-' + name" />
</template>

<style lang="scss" scoped>
@import '../../../theme/icon.scss';
</style>