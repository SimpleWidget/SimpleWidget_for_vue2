<template>
  <div id="dev">
    <h2>SimpleWidget_for_vue2_DEV</h2>
    <SButton type="primary">Primary</SButton>
    <SButton type="success">Success</SButton>
    <SButton type="danger">Danger</SButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
#dev {
  padding: 20px;
}
</style>