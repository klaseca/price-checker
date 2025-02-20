<script setup lang="ts">
import { computed } from 'vue';

const { asContainer = true } = defineProps<{ asContainer?: boolean }>();

const classesValue = computed(() => ({ container: asContainer }));
</script>

<template>
  <div class="content" :class="classesValue">
    <slot></slot>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
