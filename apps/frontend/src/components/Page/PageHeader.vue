<script setup lang="ts">
import { computed, useCssModule } from 'vue';

const { title, asContainer = true } = defineProps<{
  title: string;
  asContainer?: boolean;
}>();

const classes = useCssModule();

const classesValue = computed(() => ({
  container: asContainer,
  [classes.header]: true,
}));
</script>

<template>
  <header :class="classesValue">
    <h1 :class="classes.title">{{ title }}</h1>
    <slot></slot>
  </header>
</template>

<style module>
.header {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
}

.title {
  margin-right: auto;
}
</style>
