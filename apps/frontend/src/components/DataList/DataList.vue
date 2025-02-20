<script setup lang="ts">
import { useCssModule } from 'vue';

const classes = useCssModule();
</script>

<template>
  <dl :class="classes.dataList"><slot></slot></dl>
</template>

<style module>
.data-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 10px;
}
</style>
