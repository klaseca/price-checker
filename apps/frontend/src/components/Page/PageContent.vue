<script setup lang="ts">
import { computed, useCssModule } from 'vue';

const { asContainer = true } = defineProps<{ asContainer?: boolean }>();

const classes = useCssModule();

const classesValue = computed(() => [{ container: asContainer }, classes.content]);
</script>

<template>
  <div :class="classesValue">
    <slot></slot>
  </div>
</template>

<style module>
.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
